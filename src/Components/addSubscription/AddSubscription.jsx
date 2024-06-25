import React, { useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AddSubscription = ({ showModal, handleClose, rowData, setRowData }) => {
  const clients = JSON.parse(localStorage.getItem('clientData')).value;
  const clientsOptions = clients.map((client) => ({
    value: client.id,
    label: client.name
  }));
  const subscriptionPlans = [
    { id: 1, name: 'Plan A' },
    { id: 2, name: 'Plan B' },
    { id: 3, name: 'Plan C' }
  ];
  const subscriptionPlansOptions = subscriptionPlans.map((plan) => ({
    value: plan.id,
    label: plan.name
  }));
  const validationSchema = Yup.object().shape({
    selectedClient: Yup.object().shape({
      value: Yup.string().required('Client Is Required'),
      label: Yup.string().required('Client Is Required')
    }),
    selectedPlan: Yup.object().shape({
      value: Yup.string().required('Plan Is Required'),
      label: Yup.string().required('Plan Is Required')
    }),
    startDate: Yup.date().required('Date Is Required')
  });

  const initialValues = {
    selectedClient: '',
    selectedPlan: '',
    startDate: new Date().toISOString().split('T')[0]
  };

  const handleSubmit = (values) => {
    setRowData((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        clientName: values.selectedClient.label,
        SubscriptionPlanName: values.selectedPlan.label,
        Status: 'Active',
        StartDate: values.startDate,
        NextBillingDate: '2022-05-02',
        active: true
      }
    ]);
    handleClose();
    toast.success('Subscription Added');
  };

  return (
    <div>
      <Modal open={showModal} onClose={handleClose}>
        <Box
          sx={{
            borderRadius: '12px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography marginBottom={2} variant="h2">
            Add Subscription
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                  }}
                >
                  <FormControl fullWidth error={formik.touched.selectedClient && Boolean(formik.errors.selectedClient)}>
                    <InputLabel>Select Client</InputLabel>
                    <Select
                      id="selectedClient"
                      value={formik.values.selectedClient}
                      label="Select Client"
                      onChange={(event) => formik.setFieldValue('selectedClient', event.target.value)}
                      helperText={formik.touched.selectedClient && formik.errors.selectedClient}
                    >
                      {clientsOptions?.map((option) => (
                        <MenuItem key={option.value} value={option}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth error={formik.touched.selectedPlan && Boolean(formik.errors.selectedPlan)}>
                    <InputLabel>Subscription Plan</InputLabel>
                    <Select
                      id="selectedPlan"
                      value={formik.values.selectedPlan}
                      label="Select Plan"
                      onChange={(event) => formik.setFieldValue('selectedPlan', event.target.value)}
                    >
                      {subscriptionPlansOptions?.map((option) => (
                        <MenuItem key={option.value} value={option}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="startDate"
                      name="startDate"
                      label="Start Date"
                      type="date"
                      value={formik.values.startDate}
                      onChange={(event) => formik.setFieldValue('startDate', event.target.value)}
                      error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                      helperText={formik.touched.startDate && formik.errors.startDate}
                    />
                  </FormControl>
                  <Button type="submit" variant="contained" fullWidth>
                    Save
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default AddSubscription;

AddSubscription.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

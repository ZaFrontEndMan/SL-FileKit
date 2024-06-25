import React, { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const AddPlan = ({ showModal, handleClose, edittedPlan, setRowData, rowData }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name Is Required'),
    price: Yup.number().positive().required('Price Is Required'),
    duration: Yup.number().positive().integer().required('Duration Is Required'),
    nameAr: Yup.string().required('Arabic Name Is Required'),
    description: Yup.string().required('Description Is Required'),
    descriptionAr: Yup.string().required('Arabic Description Is Required'),
    currency: Yup.string().required('Currency Is Required'),
    DurationType: Yup.string().required('Duration Type Is Required'),
    MaxUsers: Yup.number().positive(),
    MaxBranches: Yup.number().positive(),
    Features: Yup.string(),
    FeaturesAr: Yup.string(),
    CreatedDate: Yup.date(),
    ModifiedDate: Yup.date()
  });

  const initialValues = useMemo(() => {
    return {
      name: edittedPlan ? edittedPlan.name : '',
      price: edittedPlan ? edittedPlan.price : '',
      duration: edittedPlan ? edittedPlan.duration : '1',
      active: edittedPlan ? edittedPlan.active : true,
      id: edittedPlan ? edittedPlan.id : Math.random().toString(36).substr(2, 9),
      nameAr: edittedPlan ? edittedPlan.nameAr : '',
      description: edittedPlan ? edittedPlan.description : '',
      descriptionAr: edittedPlan ? edittedPlan.descriptionAr : '',
      currency: edittedPlan ? edittedPlan.currency.toLowerCase() : 'sar',
      DurationType: edittedPlan ? edittedPlan.DurationType.toLowerCase() : 'year',
      MaxUsers: edittedPlan ? edittedPlan.MaxUsers : '',
      MaxBranches: edittedPlan ? edittedPlan.MaxBranches : '',
      Features: edittedPlan ? edittedPlan.Features : '',
      FeaturesAr: edittedPlan ? edittedPlan.FeaturesAr : ''
    };
  }, [edittedPlan]);

  const handleSubmit = (values) => {
    if (edittedPlan) {
      const updatedPlan = {
        ...edittedPlan,
        name: values.name,
        price: values.price,
        duration: values.duration,
        nameAr: values.nameAr,
        description: values.description,
        descriptionAr: values.descriptionAr,
        currency: values.currency,
        DurationType: values.DurationType,
        MaxUsers: values.MaxUsers,
        MaxBranches: values.MaxBranches,
        Features: values.Features,
        FeaturesAr: values.FeaturesAr,
        CreatedDate: values.CreatedDate,
        ModifiedDate: values.ModifiedDate
      };
      setRowData(
        rowData.map((plan) => {
          if (updatedPlan.id === plan.id) {
            return updatedPlan;
          }
          return plan;
        })
      );
      handleClose();
      toast.success('Updated');
    } else {
      const updatedPlans = [...rowData, values];
      setRowData(updatedPlans);
      handleClose();
      toast.success('Added');
    }
  };

  const durationOptions = [
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
    { label: 'Day', value: 'day' }
  ];

  const currencyOptions = [
    { label: 'SAR', value: 'sar' },
    { label: 'USD', value: 'usd' },
    { label: 'EGP', value: 'egp' }
  ];

  return (
    <div>
      <Modal open={showModal} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: 'lg',
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
            {edittedPlan ? `Edit Plan ${edittedPlan.id}` : 'Add Plan'}
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent={'center'} spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="nameAr"
                      name="nameAr"
                      label="Arabic Name"
                      type="text"
                      value={formik.values.nameAr}
                      onChange={formik.handleChange}
                      error={formik.touched.nameAr && Boolean(formik.errors.nameAr)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="duration"
                      name="duration"
                      label="Duration "
                      type="number"
                      value={formik.values.duration}
                      onChange={formik.handleChange}
                      error={formik.touched.duration && Boolean(formik.errors.duration)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Duration Type</InputLabel>
                      <Select
                        defaultValue="year"
                        id="DurationType"
                        name="DurationType"
                        label="Duration Type"
                        value={formik.values.DurationType}
                        onChange={formik.handleChange}
                        error={formik.touched.DurationType && Boolean(formik.errors.duration)}
                      >
                        {durationOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      type="text"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="descriptionAr"
                      name="descriptionAr"
                      label="Arabic Description"
                      type="text"
                      value={formik.values.descriptionAr}
                      onChange={formik.handleChange}
                      error={formik.touched.descriptionAr && Boolean(formik.errors.descriptionAr)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      label="Price"
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={formik.touched.price && Boolean(formik.errors.price)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Currency</InputLabel>
                      <Select
                        defaultValue="year"
                        id="currency"
                        name="currency"
                        label="Currency"
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                        error={formik.touched.currency && Boolean(formik.errors.currency)}
                      >
                        {currencyOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="MaxUsers"
                      name="MaxUsers"
                      label="Max Users"
                      type="number"
                      value={formik.values.MaxUsers}
                      onChange={formik.handleChange}
                      error={formik.touched.MaxUsers && Boolean(formik.errors.MaxUsers)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="MaxBranches"
                      name="MaxBranches"
                      label="Max Branches"
                      type="number"
                      value={formik.values.MaxBranches}
                      onChange={formik.handleChange}
                      error={formik.touched.MaxBranches && Boolean(formik.errors.MaxBranches)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="Features"
                      name="Features"
                      label="Features"
                      type="text"
                      value={formik.values.Features}
                      onChange={formik.handleChange}
                      error={formik.touched.Features && Boolean(formik.errors.Features)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="FeaturesAr"
                      name="FeaturesAr"
                      label="Arabic Features"
                      type="text"
                      value={formik.values.FeaturesAr}
                      onChange={formik.handleChange}
                      error={formik.touched.FeaturesAr && Boolean(formik.errors.FeaturesAr)}
                    />
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default AddPlan;
AddPlan.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edittedPlan: PropTypes.object,
  setRowData: PropTypes.func.isRequired,
  rowData: PropTypes.array.isRequired
};

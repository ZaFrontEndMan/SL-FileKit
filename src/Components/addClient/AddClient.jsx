import React, { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AddClient = ({ showModal, handleClose, edittedUser, setRowData, rowData }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('User Name Is Required'),
    displayName: Yup.string().required('Display Name Is Required'),
    domain: Yup.string().required('Domain Is Required')
  });

  const initialValues = useMemo(() => {
    return {
      name: edittedUser ? edittedUser.name : '',
      displayName: edittedUser ? edittedUser.displayName : '',
      domain: edittedUser ? edittedUser.domain : ''
    };
  }, [edittedUser]);

  const handleSubmit = (values) => {
    const updatedUser = { ...edittedUser, name: values.name, displayName: values.displayName, domain: values.domain };
    setRowData(
      rowData.map((user) => {
        if (updatedUser.id === user.id) {
          return updatedUser;
        }
        return user;
      })
    );
    handleClose();
    toast.success('User Updated');
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
            {' '}
            {edittedUser ? 'Edit Client' : 'Add Client'}
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
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="User Name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    fullWidth
                    id="displayName"
                    name="displayName"
                    label="Display Name"
                    type="text"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                    helperText={formik.touched.displayName && formik.errors.displayName}
                  />
                  <TextField
                    fullWidth
                    id="domain"
                    name="domain"
                    label="Domain"
                    type="text"
                    value={formik.values.domain}
                    onChange={formik.handleChange}
                    error={formik.touched.domain && Boolean(formik.errors.domain)}
                    helperText={formik.touched.domain && formik.errors.domain}
                  />

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

export default AddClient;
AddClient.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edittedUser: PropTypes.object,
  setRowData: PropTypes.func.isRequired,
  rowData: PropTypes.array.isRequired
};

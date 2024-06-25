import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import InfinityFetch from 'utils/InfinityFetch';
import { useNavigate } from 'react-router';

const AuthLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: ''
  //   },
  //   validationSchema,
  //   onSubmit: async (values) => {
  //     setIsLoading(true);
  //     try {
  //       const body = { ...values, financialYear: 2024, branchIds: [12] };

  //       const response = await InfinityFetch('https://api.infinityjerp.com/api/auth/login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(body)
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok ' + response.statusText);
  //       }

  //       const data = await response.json();
  //       if (data?.token) {
  //         localStorage.setItem('infinity_identity', data?.token);
  //         navigate('/');
  //         setIsLoading(false);
  //         toast.success('Login Successful');
  //       } else {
  //         toast.warning(data?.error?.message);
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //       setIsLoading(false);
  //       console.error('Error:', error.message);
  //     }
  //   }
  // });
  const formik = useFormik({
    initialValues: {
      email: 'soft-lap@test.com',
      password: '123456'
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      navigate('/');
      setIsLoading(false);
      toast.success('Login Successful');
    }
  });

  return (
    <>
      {/* Formik Form for Email Login */}
      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Email Input */}
        <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email-login"
            type="email"
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Email Address / Username"
            inputProps={{}}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>
        {/* Password Input */}
        <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputProps={{}}
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>
        {/* Remember Me Checkbox and Forgot Password Link */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Remember me"
          />
          <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Stack>
        {/* Submit Button */}
        <Box sx={{ mt: 2 }}>
          <Button disableElevation disabled={isLoading} fullWidth size="large" type="submit" variant="contained" color="secondary">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;

'use client'
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import Image from 'next/image';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useScriptRef from '../hooks/useScriptRef';
import AnimateButton from '../ui-component/extended/AnimateButton';
import Link from 'next/link';


import { useCustomizationStore } from '@/providers/customization-store-provider'
import useAuthStore from '@/stores/userStorage';
import { useRouter } from 'next/navigation';

export const AddProduct = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const { isOpen, defaultId, fontFamily, borderRadius, opened } = useCustomizationStore(
    (state) => state,
  )
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const { signup } = useAuthStore();
  const router = useRouter()

  const submit = (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("categoryId", data.categoryId);

    for (let value of data.productImg) {
      formData.append("productImg", value);
    }

  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
        productImg: []
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().typeError('Price must be a number').required('Price is required'),
        quantity: Yup.number().typeError('Quantity must be a number').required('Quantity is required'),
        categoryId: Yup.string().required('Category is required'),
        productImg: Yup.array().min(1, 'At least one image is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Lógica para enviar los datos del producto
          submit(values)
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput
                  id="title"
                  type="text"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.title && errors.title && (
                  <FormHelperText error>{errors.title}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  id="description"
                  type="text"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.description && errors.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.price && errors.price)}>
                <InputLabel htmlFor="price">Price</InputLabel>
                <OutlinedInput
                  id="price"
                  type="number"
                  value={values.price}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.price && errors.price && (
                  <FormHelperText error>{errors.price}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.quantity && errors.quantity)}>
                <InputLabel htmlFor="quantity">Quantity</InputLabel>
                <OutlinedInput
                  id="quantity"
                  type="number"
                  value={values.quantity}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.quantity && errors.quantity && (
                  <FormHelperText error>{errors.quantity}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(touched.categoryId && errors.categoryId)}>
                <InputLabel htmlFor="categoryId">Category</InputLabel>
                <OutlinedInput
                  id="categoryId"
                  type="text"
                  value={values.categoryId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.categoryId && errors.categoryId && (
                  <FormHelperText error>{errors.categoryId}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(touched.productImg && errors.productImg)}>
                <InputLabel htmlFor="productImg">Product Image(s)</InputLabel>
                <OutlinedInput
                  id="productImg"
                  type="file"
                  multiple
                  onBlur={handleBlur}
                  onChange={(event) => {
                    const files = event.target.files;
                    handleChange({
                      target: {
                        id: 'productImg',
                        value: files
                      }
                    });
                  }}
                />
                {touched.productImg && errors.productImg && (
                  <FormHelperText error>{errors.productImg}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={2}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Add Product
              </Button>
            </AnimateButton>
          </Box>
          {errors.submit && (
            <Box mt={2}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
        </form>
      )}
    </Formik>
  );
};


import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: Email,
    title: 'Email',
    content: ['info@easterhealingclinic.com', 'support@easterhealingclinic.com'],
  },
  {
    icon: LocationOn,
    title: 'Address',
    content: ['123 Healing Street', 'Medical District', 'New York, NY 10001'],
  },
  {
    icon: AccessTime,
    title: 'Working Hours',
    content: ['Monday - Friday: 8:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 5:00 PM', 'Sunday: Closed'],
  },
];

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const Contact: React.FC = () => {
  const theme = useTheme();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Here you would typically make an API call to send the message
      console.log('Form submitted:', values);
      setSubmitSuccess(true);
      resetForm();
    },
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="h6" component="h2" align="center" color="text.secondary">
          We're here to help and answer any questions you might have
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Get in Touch
            </Typography>
            <Box sx={{ mt: 3 }}>
              {contactInfo.map((info) => {
                const IconComponent = info.icon;
                return (
                  <Box key={info.title} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <IconComponent
                        sx={{ color: theme.palette.primary.main, mr: 1 }}
                      />
                      <Typography variant="h6" component="h4">
                        {info.title}
                      </Typography>
                    </Box>
                    {info.content.map((line, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 4 }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Send Us a Message
            </Typography>
            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Your message has been sent successfully! We'll get back to you soon.
              </Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={formik.isSubmitting}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Paper sx={{ mt: 4, p: 2, height: 400, bgcolor: theme.palette.grey[200] }}>
        <Typography variant="body1" align="center">
          Map will be embedded here
        </Typography>
      </Paper>
    </Container>
  );
};

export default Contact;

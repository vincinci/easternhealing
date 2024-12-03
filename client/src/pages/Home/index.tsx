import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  LocalHospital,
  Healing,
  ChildCare,
  Psychology,
  MedicalServices,
  Medication,
} from '@mui/icons-material';

const services = [
  {
    title: 'General Medicine',
    description: 'Comprehensive medical care for patients of all ages',
    icon: LocalHospital,
    image: '/images/general-medicine.jpg',
  },
  {
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents',
    icon: ChildCare,
    image: '/images/pediatrics.jpg',
  },
  {
    title: 'Mental Health',
    description: 'Professional mental health services and counseling',
    icon: Psychology,
    image: '/images/mental-health.jpg',
  },
  {
    title: 'Physical Therapy',
    description: 'Rehabilitation and physical therapy services',
    icon: Healing,
    image: '/images/physical-therapy.jpg',
  },
  {
    title: 'Laboratory Services',
    description: 'Comprehensive diagnostic and laboratory testing',
    icon: MedicalServices,
    image: '/images/laboratory.jpg',
  },
  {
    title: 'Pharmacy',
    description: 'Full-service pharmacy with prescription medications',
    icon: Medication,
    image: '/images/pharmacy.jpg',
  },
];

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: '0 0 20px 20px',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Easter Healing Clinic
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
            Professional Healthcare Services for You and Your Family
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/appointments')}
            sx={{ mr: 2 }}
          >
            Book Appointment
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => navigate('/doctors')}
          >
            Our Doctors
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={service.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.primary.main,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 40, mr: 1 }} />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {service.title}
                    </Typography>
                    <Typography>{service.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Call to Action */}
        <Box
          sx={{
            mt: 8,
            mb: 4,
            p: 4,
            bgcolor: theme.palette.primary.light,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h3" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Schedule an appointment with one of our healthcare professionals today.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/appointments')}
          >
            Book Your Appointment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

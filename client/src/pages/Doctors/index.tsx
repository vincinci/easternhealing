import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialty: 'General Medicine',
    education: 'MD - Harvard Medical School',
    experience: '15+ years',
    languages: ['English', 'Spanish'],
    image: '/images/doctor-1.jpg',
    availability: 'Mon-Fri',
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    specialty: 'Pediatrics',
    education: 'MD - Johns Hopkins University',
    experience: '12+ years',
    languages: ['English', 'French'],
    image: '/images/doctor-2.jpg',
    availability: 'Mon-Thu',
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    specialty: 'Mental Health',
    education: 'MD - Stanford University',
    experience: '10+ years',
    languages: ['English'],
    image: '/images/doctor-3.jpg',
    availability: 'Tue-Sat',
  },
  {
    id: 4,
    name: 'Dr. Emily Davis',
    specialty: 'Physical Therapy',
    education: 'DPT - Mayo Clinic College',
    experience: '8+ years',
    languages: ['English', 'Mandarin'],
    image: '/images/doctor-4.jpg',
    availability: 'Wed-Sun',
  },
  {
    id: 5,
    name: 'Dr. David Wilson',
    specialty: 'General Medicine',
    education: 'MD - Yale School of Medicine',
    experience: '20+ years',
    languages: ['English', 'German'],
    image: '/images/doctor-5.jpg',
    availability: 'Mon-Fri',
  },
  {
    id: 6,
    name: 'Dr. Lisa Anderson',
    specialty: 'Pediatrics',
    education: 'MD - Columbia University',
    experience: '14+ years',
    languages: ['English', 'Portuguese'],
    image: '/images/doctor-6.jpg',
    availability: 'Mon-Sat',
  },
];

const Doctors: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Our Medical Team
        </Typography>
        <Typography variant="h6" component="h2" align="center" color="text.secondary">
          Meet our experienced and dedicated healthcare professionals
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
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
              <CardMedia
                component="div"
                sx={{
                  height: 280,
                  bgcolor: theme.palette.grey[200],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Doctor Photo
                </Typography>
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {doctor.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: 'medium' }}
                >
                  {doctor.specialty}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {doctor.education}
                </Typography>
                <Typography variant="body2" paragraph>
                  Experience: {doctor.experience}
                </Typography>
                <Typography variant="body2" paragraph>
                  Available: {doctor.availability}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {doctor.languages.map((lang) => (
                    <Chip
                      key={lang}
                      label={lang}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/appointments')}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 8,
          p: 4,
          bgcolor: theme.palette.primary.light,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="h3" gutterBottom>
          Looking for a Specific Specialist?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Contact us to learn more about our medical team and their availability.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/contact')}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default Doctors;

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  VerifiedUser,
  GroupAdd,
  Favorite,
  LocalHospital,
} from '@mui/icons-material';

const values = [
  {
    icon: VerifiedUser,
    title: 'Excellence',
    description:
      'We are committed to providing the highest quality healthcare services with professionalism and expertise.',
  },
  {
    icon: GroupAdd,
    title: 'Patient-Centered',
    description:
      'Our approach focuses on understanding and meeting the unique needs of each patient.',
  },
  {
    icon: Favorite,
    title: 'Compassion',
    description:
      'We treat every patient with empathy, respect, and understanding throughout their healthcare journey.',
  },
  {
    icon: LocalHospital,
    title: 'Innovation',
    description:
      'We stay at the forefront of medical advancements to provide the best possible care.',
  },
];

const statistics = [
  { number: '20+', label: 'Years of Experience' },
  { number: '50+', label: 'Medical Professionals' },
  { number: '10k+', label: 'Satisfied Patients' },
  { number: '24/7', label: 'Emergency Care' },
];

const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Easter Healing Clinic
        </Typography>
        <Typography variant="h6" component="h2" align="center" color="text.secondary">
          Providing Quality Healthcare Since 2003
        </Typography>
      </Box>

      {/* Mission & Vision */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom color="primary">
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              To provide exceptional healthcare services that improve the quality of
              life for our patients and community through compassionate care,
              medical excellence, and continuous innovation.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom color="primary">
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              To be the leading healthcare provider known for excellence in patient
              care, medical innovation, and community wellness, setting the
              standard for quality healthcare services.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Statistics */}
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {statistics.map((stat) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                }}
              >
                <Typography variant="h4" component="div" gutterBottom>
                  {stat.number}
                </Typography>
                <Typography variant="body1">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Our Values */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our Values
        </Typography>
        <Grid container spacing={4}>
          {values.map((value) => {
            const IconComponent = value.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={value.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <CardContent>
                    <IconComponent
                      sx={{
                        fontSize: 48,
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      color="primary"
                    >
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* History */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our History
        </Typography>
        <Typography variant="body1" paragraph>
          Easter Healing Clinic was founded in 2003 with a vision to provide
          comprehensive healthcare services to our community. What started as a
          small family practice has grown into a full-service medical facility,
          serving thousands of patients annually.
        </Typography>
        <Typography variant="body1" paragraph>
          Over the years, we have continuously expanded our services, invested in
          state-of-the-art medical equipment, and brought together a team of
          highly qualified healthcare professionals. Our commitment to excellence
          and patient care has earned us numerous accolades and the trust of our
          community.
        </Typography>
        <Typography variant="body1">
          Today, we continue to grow and adapt to meet the evolving healthcare
          needs of our patients, while maintaining the personal touch and
          compassionate care that has been our hallmark since day one.
        </Typography>
      </Paper>

      {/* Accreditations */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Accreditations
        </Typography>
        <Typography variant="body1" paragraph>
          We are proud to maintain the highest standards of medical care and
          safety. Our facility is accredited by leading healthcare organizations,
          and we continuously undergo rigorous evaluations to ensure we meet and
          exceed industry standards.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;

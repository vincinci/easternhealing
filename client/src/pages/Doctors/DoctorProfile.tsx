import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AccessTime,
  Language,
  School,
  Star,
  AttachMoney,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Doctor {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  specialization: string;
  qualifications: string[];
  experience: number;
  availableDays: string[];
  availableTimeSlots: string[];
  consultationFee: number;
  rating: number;
  totalRatings: number;
  languages: string[];
  about: string;
}

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (err) {
        setError('Failed to fetch doctor details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !doctor) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Doctor not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Doctor Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Box
                component="img"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  doctor.userId.name
                )}&size=200&background=random`}
                alt={doctor.userId.name}
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  mb: 2,
                }}
              />
              <Typography variant="h5" gutterBottom>
                Dr. {doctor.userId.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {doctor.specialization}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={doctor.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({doctor.totalRatings} reviews)
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Languages
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {doctor.languages.map((language) => (
                  <Chip
                    key={language}
                    icon={<Language />}
                    label={language}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Qualifications
              </Typography>
              {doctor.qualifications.map((qualification) => (
                <Box
                  key={qualification}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <School sx={{ mr: 1 }} />
                  <Typography variant="body2">{qualification}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Experience
              </Typography>
              <Typography variant="body1">
                {doctor.experience} years of practice
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Consultation Fee
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoney />
                <Typography variant="h5" color="primary">
                  ${doctor.consultationFee}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Schedule and Booking */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  About
                </Typography>
                <Typography variant="body1" paragraph>
                  {doctor.about}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Available Schedule
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell>Time Slots</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctor.availableDays.map((day) => (
                        <TableRow key={day}>
                          <TableCell>{day}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {doctor.availableTimeSlots.map((slot) => (
                                <Chip
                                  key={slot}
                                  label={slot}
                                  size="small"
                                  icon={<AccessTime />}
                                />
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Book an Appointment
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Choose a convenient time slot to schedule your appointment with
                    Dr. {doctor.userId.name}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      navigate(`/appointments/book?doctor=${doctor._id}`)
                    }
                    disabled={!user}
                  >
                    {user
                      ? 'Book Appointment'
                      : 'Please login to book an appointment'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorProfile;

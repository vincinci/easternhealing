import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AccessTime,
  AttachMoney,
  Category,
  CheckCircle,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  image?: string;
  isAvailable: boolean;
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${id}`);
        setService(response.data);
      } catch (err) {
        setError('Failed to fetch service details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !service) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Service not found'}</Alert>
      </Container>
    );
  }

  const benefits = [
    'Professional medical care',
    'State-of-the-art equipment',
    'Experienced healthcare providers',
    'Comfortable environment',
    'Personalized treatment plans',
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Service Image and Basic Info */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box
              component="img"
              src={service.image || 'https://via.placeholder.com/600x400?text=Service'}
              alt={service.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1,
                mb: 3,
              }}
            />
            <Typography variant="h4" gutterBottom>
              {service.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Category color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="text.secondary">
                {service.category}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney color="primary" />
                  <Typography variant="h5" color="primary" sx={{ ml: 1 }}>
                    ${service.price}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime color="primary" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {service.duration} minutes
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Service Details and Booking */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Service Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {service.description}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Benefits
                </Typography>
                <List>
                  {benefits.map((benefit) => (
                    <ListItem key={benefit}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Book this Service
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Schedule an appointment for {service.name} with one of our
                    qualified healthcare providers.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      navigate(`/appointments/book?service=${service._id}`)
                    }
                    disabled={!user || !service.isAvailable}
                  >
                    {!user
                      ? 'Please login to book this service'
                      : !service.isAvailable
                      ? 'Service currently unavailable'
                      : 'Book Now'}
                  </Button>
                  {!service.isAvailable && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      This service is currently unavailable. Please check back
                      later.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceDetail;

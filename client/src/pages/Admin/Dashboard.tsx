import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  People,
  MedicalServices,
  EventNote,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ErrorCodes } from '../../components/ErrorCodes';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Doctors', count: 24, icon: <People />, color: '#1976d2' },
    { title: 'Active Services', count: 15, icon: <MedicalServices />, color: '#2e7d32' },
    { title: 'Appointments Today', count: 45, icon: <EventNote />, color: '#ed6c02' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: stat.color,
                color: 'white',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {stat.icon}
                <Typography component="h2" variant="h4">
                  {stat.count}
                </Typography>
              </Box>
              <Typography component="p" variant="h6" sx={{ mt: 2 }}>
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Doctors Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Doctors Management</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/admin/doctors/new')}
                >
                  Add Doctor
                </Button>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Manage Doctors"
                    secondary="Add, edit, or remove doctors"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/doctors')}
                    >
                      View All
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Doctor Schedules"
                    secondary="Manage doctor availability"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/schedules')}
                    >
                      Manage
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Services Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Services Management</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/admin/services/new')}
                >
                  Add Service
                </Button>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Manage Services"
                    secondary="Add, edit, or remove services"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/services')}
                    >
                      View All
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Service Categories"
                    secondary="Manage service categories"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/categories')}
                    >
                      Manage
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Error Codes Reference */}
        <Grid item xs={12}>
          <Card sx={{ overflow: 'visible' }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                mb: 3,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 }
              }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    Error Codes Reference
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500 }}>
                    Search, filter, and copy Vercel deployment error codes. Click on any error code to copy it to your clipboard.
                  </Typography>
                </Box>
              </Box>
              <ErrorCodes />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;

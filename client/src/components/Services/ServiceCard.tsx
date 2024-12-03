import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { AccessTime, AttachMoney } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  service: {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    image?: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={service.image || 'https://via.placeholder.com/300x200?text=Service'}
        alt={service.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {service.name}
        </Typography>
        <Chip
          label={service.category}
          color="primary"
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {service.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AttachMoney color="primary" />
          <Typography variant="body1" color="primary" sx={{ ml: 1 }}>
            ${service.price}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime color="action" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {service.duration} minutes
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/appointments/book?service=${service._id}`)}
        >
          Book Now
        </Button>
      </Box>
    </Card>
  );
};

export default ServiceCard;

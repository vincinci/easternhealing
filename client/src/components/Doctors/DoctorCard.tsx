import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DoctorCardProps {
  doctor: {
    _id: string;
    userId: {
      name: string;
      email: string;
    };
    specialization: string;
    experience: number;
    rating: number;
    totalRatings: number;
    consultationFee: number;
    languages: string[];
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          doctor.userId.name
        )}&background=random`}
        alt={doctor.userId.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          Dr. {doctor.userId.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {doctor.specialization}
        </Typography>
        <Box sx={{ my: 1 }}>
          <Rating value={doctor.rating} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({doctor.totalRatings} ratings)
          </Typography>
        </Box>
        <Typography variant="body2" gutterBottom>
          {doctor.experience} years of experience
        </Typography>
        <Typography variant="body2" color="primary" gutterBottom>
          Consultation Fee: ${doctor.consultationFee}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
          {doctor.languages.map((language) => (
            <Chip key={language} label={language} size="small" />
          ))}
        </Stack>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/doctors/${doctor._id}`)}
        >
          View Profile
        </Button>
      </Box>
    </Card>
  );
};

export default DoctorCard;

import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  FormControlLabel,
  Button,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { MyLocation, Search } from '@mui/icons-material';
import { CourtSession, SearchFilters } from '../types';
import CourtList from './CourtList';
import { mockSessions } from '../mockData';

const CourtFinder = () => {
  const [sessions, setSessions] = useState<CourtSession[]>(mockSessions);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    date: new Date(),
    duration: 60,
    showPromotedOnly: false,
  });

  const handleDurationChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDuration: number,
  ) => {
    if (newDuration !== null) {
      setFilters({ ...filters, duration: newDuration });
    }
  };

  const handleLocationSearch = async () => {
    // TODO: Implement location search and court fetching
    console.log('Searching for courts with filters:', filters);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // TODO: Implement reverse geocoding to get location name
          console.log('Current location:', position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const filteredSessions = sessions.filter((session) => {
    if (filters.showPromotedOnly && !session.isPromoted) return false;
    if (session.duration !== filters.duration) return false;
    // TODO: Add more sophisticated filtering based on location and date
    return true;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Tennis Court Finder
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
              <IconButton onClick={handleGetCurrentLocation} color="primary">
                <MyLocation />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Date"
              value={filters.date}
              onChange={(newDate) => newDate && setFilters({ ...filters, date: newDate })}
              sx={{ width: '100%' }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <ToggleButtonGroup
              value={filters.duration}
              exclusive
              onChange={handleDurationChange}
              aria-label="duration"
              fullWidth
            >
              {[30, 60, 90, 120].map((duration) => (
                <ToggleButton key={duration} value={duration}>
                  {duration} min
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleLocationSearch}
              startIcon={<Search />}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.showPromotedOnly}
                onChange={(e) => setFilters({ ...filters, showPromotedOnly: e.target.checked })}
              />
            }
            label="Show promoted courts only"
          />
        </Box>

        <CourtList sessions={filteredSessions} />
      </Box>
    </Container>
  );
};

export default CourtFinder;

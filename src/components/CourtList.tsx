import { Grid, Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { AccessTime, LocationOn, AttachMoney } from '@mui/icons-material';
import { CourtSession } from '../types';
import { format } from 'date-fns';

interface CourtListProps {
  sessions: CourtSession[];
}

const CourtList = ({ sessions }: CourtListProps) => {
  return (
    <Grid container spacing={3}>
      {sessions.map((session) => (
        <Grid item xs={12} sm={6} md={4} key={session.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            {session.isPromoted && (
              <Chip
                label="Promoted"
                color="secondary"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {session.courtName}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {session.location}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {format(new Date(session.dateTime), 'MMM d, h:mm a')} ({session.duration} min)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  ${session.price.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {session.isRareFind && (
                  <Chip
                    label="Rare Find!"
                    color="success"
                    size="small"
                  />
                )}
                {session.isLastMinute && (
                  <Chip
                    label="Last Minute"
                    color="error"
                    size="small"
                  />
                )}
              </Box>

              <Button
                variant="contained"
                fullWidth
                href={session.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourtList;

import { VercelRequest, VercelResponse } from '@vercel/node';
import { tampereProvider } from '../src/services/tampereProvider';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const { date, location } = request.query;
    
    if (!date || !location) {
      return response.status(400).json({ error: 'Date and location are required' });
    }

    if (location.toString().toLowerCase().includes('tampere')) {
      const courts = await tampereProvider.getAvailableCourts(new Date(date.toString()));
      return response.status(200).json(courts);
    }

    return response.status(404).json({ error: 'No providers available for this location' });
  } catch (error) {
    console.error('Error fetching courts:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

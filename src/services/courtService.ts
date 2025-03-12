import { CourtSession, BookingProvider } from '../types';
import { mockSessions, mockProviders } from '../mockData';
import { tampereProvider } from './tampereProvider';
import axios from 'axios';

class CourtService {
  private providers: BookingProvider[];
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.providers = [
      {
        id: 'tampere-tennis',
        name: 'Tampereen Tenniskeskus',
        baseUrl: 'https://tampereentenniskeskus.cintoia.com/',
        scrapingEnabled: true,
        apiEnabled: false
      },
      ...mockProviders
    ];
  }

  async searchCourts(
    location: string,
    date: Date,
    duration: number
  ): Promise<CourtSession[]> {
    const allSessions: CourtSession[] = [];

    // Search Tampere provider if location matches
    if (location.toLowerCase().includes('tampere')) {
      try {
        let tampereSessions: CourtSession[];
        
        if (this.isDevelopment) {
          // Use direct scraping in development
          tampereSessions = await tampereProvider.getAvailableCourts(date);
        } else {
          // Use serverless API in production
          const response = await axios.get('/api/courts', {
            params: {
              date: date.toISOString(),
              location: location
            }
          });
          tampereSessions = response.data;
        }
        
        allSessions.push(...tampereSessions.filter(session => session.duration === duration));
      } catch (error) {
        console.error('Error fetching Tampere courts:', error);
      }
    }

    // Include mock sessions for development/testing
    if (this.isDevelopment) {
      const mockResults = mockSessions.filter(session => session.duration === duration);
      allSessions.push(...mockResults);
    }

    return allSessions;
  }

  async findAvailableSlots(provider: BookingProvider): Promise<CourtSession[]> {
    if (provider.id === 'tampere-tennis') {
      if (this.isDevelopment) {
        return tampereProvider.getAvailableCourts(new Date());
      } else {
        const response = await axios.get('/api/courts', {
          params: {
            date: new Date().toISOString(),
            location: 'tampere'
          }
        });
        return response.data;
      }
    }

    if (provider.apiEnabled) {
      return this.searchViaApi(provider);
    } else if (provider.scrapingEnabled) {
      return this.searchViaScraping(provider);
    }
    return [];
  }

  private async searchViaApi(provider: BookingProvider): Promise<CourtSession[]> {
    console.log(`Searching via API for provider: ${provider.name}`);
    return [];
  }

  private async searchViaScraping(provider: BookingProvider): Promise<CourtSession[]> {
    console.log(`Scraping data for provider: ${provider.name}`);
    return [];
  }
}

export const courtService = new CourtService();

import { CourtSession } from '../types';
import { format } from 'date-fns';
import axios from 'axios';
import * as cheerio from 'cheerio';

class TampereProvider {
  private readonly baseUrl = 'https://tampereentenniskeskus.cintoia.com/';
  private readonly searchEndpoint = 'booking/search';

  async getAvailableCourts(date: Date): Promise<CourtSession[]> {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await axios.get(`${this.baseUrl}${this.searchEndpoint}`, {
        params: {
          date: formattedDate,
          sport: 'tennis'
        }
      });

      const $ = cheerio.load(response.data);
      const sessions: CourtSession[] = [];

      $('.booking-slot').each((_, element) => {
        const startTime = $(element).attr('data-start-time');
        const duration = parseInt($(element).attr('data-duration') || '60');
        const court = $(element).attr('data-court-name') || '';
        const price = parseFloat($(element).attr('data-price') || '0');
        const bookingUrl = $(element).attr('href') || '';

        if (startTime) {
          const session: CourtSession = {
            id: `tampere-${court}-${startTime}`,
            providerId: 'tampere-tennis',
            providerName: 'Tampereen Tenniskeskus',
            courtName: court,
            startTime: new Date(startTime),
            duration,
            price,
            currency: 'EUR',
            bookingUrl: `${this.baseUrl}${bookingUrl}`,
            isRareFind: this.isRareFind(new Date(startTime), duration),
            isLastMinute: this.isLastMinuteDeal(new Date(startTime))
          };
          sessions.push(session);
        }
      });

      return sessions;
    } catch (error) {
      console.error('Error fetching Tampere courts:', error);
      return [];
    }
  }

  private isRareFind(startTime: Date, duration: number): boolean {
    const hour = startTime.getHours();
    const isWeekend = startTime.getDay() === 0 || startTime.getDay() === 6;
    return (hour >= 17 && hour <= 21) || isWeekend;
  }

  private isLastMinuteDeal(startTime: Date): boolean {
    const now = new Date();
    const hoursUntilStart = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilStart <= 24;
  }
}

export const tampereProvider = new TampereProvider();

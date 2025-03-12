export interface CourtSession {
  id: string;
  courtName: string;
  location: string;
  provider: string;
  bookingUrl: string;
  dateTime: string;
  duration: number; // in minutes
  price: number;
  isRareFind: boolean;
  isLastMinute: boolean;
  isPromoted: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SearchFilters {
  location: string;
  date: Date;
  duration: number;
  showPromotedOnly: boolean;
}

export interface BookingProvider {
  id: string;
  name: string;
  baseUrl: string;
  scrapingEnabled: boolean;
  apiEnabled: boolean;
  apiKey?: string;
}

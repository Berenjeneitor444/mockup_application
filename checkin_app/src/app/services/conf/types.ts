interface FillContraints {
  AD: 'required' | 'optional' | 'none'; // whether adults are required to fill the form
  JR: 'required' | 'optional' | 'none'; // whether juniors are required to fill the form
  NI: 'required' | 'optional' | 'none'; // whether children are required to fill the form
  CU: 'required' | 'optional' | 'none'; // whether babies are required to fill the form
}

export interface HotelConf {
  id: string; // Hotel identifier in API
  enabled: boolean; // Whether the hotel is enabled
  name: string; // Hotel name to display on the header
  country: 'mx' | 'do'; // Country code for the hotel
  vat?: string; // VAT number for the hotel
  address?: string; // Address for the hotel
  postalCode?: string; // Postal code for the hotel
  city?: string; // City for the hotel
  state?: string; // State for the hotel
  password: string; // Password to enter the app as this hotel
  wifi: {
    ssid: string; // SSID for the hotel wifi
    password?: string; // Password for the hotel wifi
    captivePortal?: boolean; // Whether the hotel has a captive portal
  };
  defaultLanguage?: string; // Language for the hotel
  guestForm?: {
    fillConstraints?: FillContraints; // Override fill constraints for this hotel
  };
  url?: string; // URL for the hotel
}
interface EmailProvider {
  url: string; // Base URL
}
type EmailProviders = Record<string, EmailProvider>;

export interface Environment {
  debug: boolean; // Whether the app should simulate an internal date
  name?: string; // Environment name (e.g. production, test, development)
  languages: string[]; // Languages available in the app
  api: {
    url: string; // API base URL
    user: string; // API user
    password: string; // API password
  };
  email?: {
    providers: EmailProviders; // Email providers configuration
  };
  monitor?: {
    providers: {
      sentry?: {
        dsn: string; // Sentry DSN
      };
      cloudWatch?: {
        region: string; // Cloudwatch region
        accessKeyId: string; // Cloudwatch API access key
        secretAccessKey: string; // Cloudwatch API secret key
        logGroupName?: string; // Cloudwatch log group name
      };
    };
  };
  defaults: {
    fillContraints: FillContraints; // Fill constraints for the guest form
    language: string; // Default language for the app
  };
  hotels: HotelConf[];
}

import { Environment } from '@services/conf/types';

export const baseEnvironment: Environment = {
  debug: false,
  languages: ['es', 'en'],
  api: {
    //url: 'https://api-tms.majesticresorts.com/api-gateway', // production
    url: 'https://localhost/api/', // test
    user: 'api_user',
    password: 'admin123',
  },
  email: {
    providers: {
      aws: {
        //url: 'https://dja434qmae.execute-api.eu-south-2.amazonaws.com/test/send-mail', // kritical lab (test)
        url: 'https://2mo24pnpl5.execute-api.us-east-1.amazonaws.com/test/send-mail', // production
      },
    },
  },
  defaults: {
    fillContraints: {
      AD: 'required',
      JR: 'optional',
      NI: 'optional',
      CU: 'none',
    },
    language: 'en',
  },
  hotels: [
    {
      id: 'M1',
      enabled: true,
      name: 'Majestic Colonial Punta Cana',
      country: 'do',
      vat: '110173752',
      address: 'Playa Arena Gorda, Carr. El Macao - Arena Gorda',
      postalCode: '23000',
      city: 'Punta Cana',
      state: 'La Altagracia',
      password: 'M1',
      wifi: {
        ssid: 'Majestic_WIFI',
        password: 'Happystay!',
        captivePortal: false,
      },
      url: 'https://appmcpc.majestic-resorts.com',
    },
    {
      id: 'M2',
      enabled: true,
      name: 'Majestic Elegance Punta Cana',
      country: 'do',
      vat: '110173752',
      address: 'Playa Arena Gorda, Carr. El Macao - Arena Gorda',
      postalCode: '23000',
      city: 'Punta Cana',
      state: 'La Altagracia',
      password: 'M2',
      wifi: {
        ssid: 'Majestic_WIFI',
        password: 'Happystay!',
        captivePortal: false,
      },
      url: 'https://appmepc.majestic-resorts.com',
    },
    {
      id: 'M3',
      enabled: true,
      name: 'Majestic Mirage Punta Cana',
      country: 'do',
      vat: '110173752',
      address: 'Playa Arena Gorda, Carr. El Macao - Arena Gorda',
      postalCode: '23000',
      city: 'Punta Cana',
      state: 'La Altagracia',
      password: 'M3',
      wifi: {
        ssid: 'Majestic_WIFI',
        password: 'Happystay!',
        captivePortal: false,
      },
      url: 'https://appmmpc.majestic-resorts.com',
    },
    {
      id: 'M4',
      enabled: true,
      name: 'Majestic Elegance Costa Mujeres',
      country: 'mx',
      vat: '110173752',
      address:
        'Playa Mujeres, Carretera libre 85 Punta Sam, Isla Blanca 85, Supermanzana 6 Manzana 2',
      postalCode: '77400',
      city: 'Costa Mujeres',
      state: 'Quintana Roo',
      password: 'M4',
      wifi: {
        ssid: 'Majestic_WIFI',
        captivePortal: true,
      },
      url: 'https://majesticresorts.stay-app.com/desktop/?utm_campaign=anonymous,anonymous&utm_medium=qr,qr&utm_source=Lobby,desktop&id=d6c6615c-f87d-4712-88e8-e18e4d9d871c',
    },
  ],
};

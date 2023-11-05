import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.contactos.app',
  appName: 'contactos',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

export const APP_CONFIG = {
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'MOCK',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
};

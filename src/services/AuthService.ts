import axios from 'axios';
import { APP_CONFIG } from '../constants/config';
import { MOCK_USERS, MOCK_AUTH_DATA } from '../mocks/users.mock';
import { User, AuthResponse } from '../types';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    if (APP_CONFIG.dataSource === 'MOCK') {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = MOCK_USERS.find(u => u.email === email);
      if (user && password === MOCK_AUTH_DATA.password) {
        return {
          user,
          token: 'mock-jwt-token-' + user.role
        };
      }
      throw new Error('Credenciales inválidas');
    }

    const { data } = await axios.post<AuthResponse>(`${APP_CONFIG.apiUrl}/auth/login`, { email, password });
    return data;
  }
}

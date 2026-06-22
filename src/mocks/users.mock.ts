import { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@test.com',
    name: 'Admin User',
    role: 'ADMIN'
  },
  {
    id: '2',
    email: 'usuario@test.com',
    name: 'Juan Perez',
    role: 'USER'
  }
];

export const MOCK_AUTH_DATA = {
  password: '123'
};

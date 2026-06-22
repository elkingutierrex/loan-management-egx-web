import { Loan } from '../types';

export const MOCK_LOANS: Loan[] = [
  {
    id: 'l1',
    amount: 5000,
    term: 12,
    status: 'Pendiente',
    requestDate: '2026-06-20T10:00:00Z',
    userId: '2',
    userName: 'Juan Perez'
  },
  {
    id: 'l2',
    amount: 12000,
    term: 24,
    status: 'Aprobado',
    requestDate: '2026-06-15T14:30:00Z',
    userId: '2',
    userName: 'Juan Perez'
  },
  {
    id: 'l3',
    amount: 1500,
    term: 6,
    status: 'Rechazado',
    requestDate: '2026-06-10T09:15:00Z',
    userId: '2',
    userName: 'Juan Perez',
    rejectionReason: 'Monto insuficiente para el historial crediticio actual.'
  }
];

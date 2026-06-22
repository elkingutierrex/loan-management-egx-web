export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type LoanStatus = 'Pendiente' | 'Aprobado' | 'Rechazado';

export interface Loan {
  id: string;
  amount: number;
  term: number;
  status: LoanStatus;
  requestDate: string;
  userId: string;
  userName: string;
  rejectionReason?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

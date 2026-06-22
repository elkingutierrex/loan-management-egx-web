import { APP_CONFIG } from '../constants/config';
import { MOCK_LOANS } from '../mocks/loans.mock';
import { Loan } from '../types';
import axios from 'axios';

export class LoanService {
  private static loans: Loan[] = [...MOCK_LOANS];

  static async getMyLoans(userId: string): Promise<Loan[]> {
    if (APP_CONFIG.dataSource === 'MOCK') {
      await new Promise(resolve => setTimeout(resolve, 600));
      return this.loans.filter(l => l.userId === userId);
    }
    const { data } = await axios.get<Loan[]>(`${APP_CONFIG.apiUrl}/loans/my-loans`);
    return data;
  }

  static async createLoan(loanData: { amount: number, term: number, userId: string, userName: string }): Promise<Loan> {
    if (APP_CONFIG.dataSource === 'MOCK') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newLoan: Loan = {
        id: `l${Math.random().toString(36).substr(2, 9)}`,
        amount: loanData.amount,
        term: loanData.term,
        status: 'Pendiente',
        requestDate: new Date().toISOString(),
        userId: loanData.userId,
        userName: loanData.userName
      };
      this.loans.unshift(newLoan);
      return newLoan;
    }
    const { data } = await axios.post<Loan>(`${APP_CONFIG.apiUrl}/loans`, loanData);
    return data;
  }

  static async getAllLoans(): Promise<Loan[]> {
    if (APP_CONFIG.dataSource === 'MOCK') {
      await new Promise(resolve => setTimeout(resolve, 800));
      return this.loans;
    }
    const { data } = await axios.get<Loan[]>(`${APP_CONFIG.apiUrl}/loans`);
    return data;
  }
}

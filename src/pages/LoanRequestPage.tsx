import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { LoanService } from '../services/LoanService';
import DashboardLayout from '../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Calendar, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

const loanSchema = z.object({
  amount: z.coerce.number().positive('El monto debe ser mayor a 0').min(1, 'El monto es requerido'),
  term: z.coerce.number().positive('El plazo debe ser mayor a 0').min(1, 'El plazo es requerido'),
});

type LoanForm = z.infer<typeof loanSchema>;

export default function LoanRequestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoanForm>({
    resolver: zodResolver(loanSchema),
    defaultValues: { amount: 1000, term: 12 }
  });

  const onSubmit = async (data: LoanForm) => {
    setLoading(true);
    try {
      await LoanService.createLoan({
        amount: data.amount,
        term: data.term,
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/user/dashboard'), 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <DashboardLayout title="Nueva Solicitud">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold">¡Solicitud Enviada!</h2>
          <p className="mt-2 text-slate-400">Tu préstamo está siendo procesado por nuestro equipo.</p>
          <p className="mt-1 text-sm text-slate-500 italic">Redirigiendo al dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Nueva Solicitud">
      <div className="max-w-2xl">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6">Detalles del Préstamo</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Amount Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Monto del Préstamo ($)</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <DollarSign className="h-5 w-5 text-primary-500" />
                  </div>
                  <input 
                    {...register('amount')}
                    type="number"
                    className={clsx(
                      "block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 pl-12 pr-4 text-xl font-bold text-white outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10",
                      errors.amount && "border-red-500/50"
                    )}
                    placeholder="5000"
                  />
                </div>
                {errors.amount && <p className="text-xs text-red-400">{errors.amount.message}</p>}
                <p className="text-xs text-slate-500 italic">Sugerido: Montos entre $100 y $100,000</p>
              </div>

              {/* Term Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Plazo (meses)</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Calendar className="h-5 w-5 text-primary-500" />
                  </div>
                  <input 
                    {...register('term')}
                    type="number"
                    className={clsx(
                      "block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 pl-12 pr-4 text-xl font-bold text-white outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10",
                      errors.term && "border-red-500/50"
                    )}
                    placeholder="12"
                  />
                </div>
                {errors.term && <p className="text-xs text-red-400">{errors.term.message}</p>}
                <p className="text-xs text-slate-500 italic">Plazos comunes: 6, 12, 24, 36</p>
              </div>
            </div>

            <div className="rounded-2xl bg-primary-500/5 border border-primary-500/10 p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Cuota mensual estimada:</span>
                <span className="text-xl font-bold text-primary-400 underline decoration-primary-500/30 underline-offset-4">
                  Calculando...
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tighter">
                * Este es un simulador. El valor final depende de la tasa de interés que asigne el banco tras la aprobación.
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-600 py-5 text-lg font-bold text-white shadow-xl shadow-primary-600/20 transition hover:bg-primary-500 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? (
                <div className="h-7 w-7 animate-spin rounded-full border-4 border-white/30 border-t-white" />
              ) : (
                <>
                  <Send className="h-6 w-6 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  Enviar Solicitud
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

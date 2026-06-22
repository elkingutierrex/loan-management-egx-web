import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { LoanService } from '../services/LoanService';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, CreditCard, Clock, CheckCircle2, XCircle, AlertCircle, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Pendiente': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Aprobado': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Rechazado': 'bg-red-500/10 text-red-500 border-red-500/20',
  }[status] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';

  const Icon = {
    'Pendiente': Clock,
    'Aprobado': CheckCircle2,
    'Rechazado': XCircle,
  }[status] || AlertCircle;

  return (
    <span className={clsx("flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", styles)}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
};

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: loans, isLoading } = useQuery({
    queryKey: ['my-loans', user?.id],
    queryFn: () => LoanService.getMyLoans(user!.id),
    enabled: !!user,
  });

  return (
    <DashboardLayout title="Mi Actividad">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        {/* Welcome Card & Action */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-10 shadow-2xl shadow-primary-900/20">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white">Hola, {user?.name.split(' ')[0]} 👋</h3>
            <p className="text-primary-100 text-lg opacity-90">Gestiona tus solicitudes de crédito hoy mismo.</p>
          </div>
          <button 
            onClick={() => navigate('/user/request')}
            className="flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 font-bold text-primary-700 shadow-xl transition-all hover:bg-slate-100 hover:scale-105 active:scale-95"
          >
            <Plus className="h-6 w-6" />
            Solicitar Préstamo
          </button>
        </div>

        {/* Stats Summary Area */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-orange-500/30 hover:bg-orange-500/5">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 shadow-inner">
                <Clock className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Pendientes</p>
                <p className="text-3xl font-black text-white">{loans?.filter(l => l.status === 'Pendiente').length || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 shadow-inner">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Aprobados</p>
                <p className="text-3xl font-black text-white">{loans?.filter(l => l.status === 'Aprobado').length || 0}</p>
              </div>
            </div>
          </div>

          <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-primary-500/30 hover:bg-primary-500/5">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500 shadow-inner">
                <CreditCard className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Total Solicitado</p>
                <p className="text-3xl font-black text-white">
                  ${loans?.reduce((acc, l) => acc + l.amount, 0).toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loans Table/List */}
        <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="border-b border-slate-800 px-10 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-slate-800/10">
            <div>
              <h4 className="text-xl font-black">Historial de Solicitudes</h4>
              <p className="text-sm text-slate-500 mt-1">Monitorea el estado de tus créditos en tiempo real</p>
            </div>
            <span className="w-fit rounded-full bg-slate-800 px-4 py-1.5 text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold border border-slate-700">
              {loans?.length || 0} SOLICITUDES
            </span>
          </div>

          <div className="divide-y divide-slate-800/50">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
                <p className="text-slate-500 font-medium animate-pulse">Sincronizando datos...</p>
              </div>
            ) : loans?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-2">
                <AlertCircle className="h-10 w-10 opacity-20" />
                <p className="text-lg font-medium">No tienes solicitudes registradas.</p>
                <button 
                  onClick={() => navigate('/user/request')}
                  className="mt-4 text-primary-400 hover:text-primary-300 font-bold transition underline underline-offset-4"
                >
                  ¡Inicia una ahora!
                </button>
              </div>
            ) : (
              loans?.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between px-10 py-6 hover:bg-slate-800/40 transition-all group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-slate-800 sm:flex">
                      <CreditCard className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">${loan.amount.toLocaleString()}</p>
                      <p className="text-sm text-slate-500">Plazo: {loan.term} meses • {new Date(loan.requestDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <StatusBadge status={loan.status} />
                    <ChevronRight className="h-5 w-5 text-slate-600 transition group-hover:translate-x-1 group-hover:text-primary-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

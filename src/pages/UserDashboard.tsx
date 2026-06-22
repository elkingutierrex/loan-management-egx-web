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
      <div className="space-y-8">
        {/* Welcome Card & Action */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 shadow-xl shadow-primary-900/20">
          <div>
            <h3 className="text-2xl font-bold text-white">Hola, {user?.name.split(' ')[0]} 👋</h3>
            <p className="mt-1 text-primary-100">Gestiona tus solicitudes de crédito hoy mismo.</p>
          </div>
          <button 
            onClick={() => navigate('/user/request')}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-primary-700 shadow-lg transition hover:bg-slate-100 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Solicitar Préstamo
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Pendientes</p>
                <p className="text-xl font-bold">{loans?.filter(l => l.status === 'Pendiente').length || 0}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Aprobados</p>
                <p className="text-xl font-bold">{loans?.filter(l => l.status === 'Aprobado').length || 0}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Solicitado</p>
                <p className="text-xl font-bold">
                  ${loans?.reduce((acc, l) => acc + l.amount, 0).toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loans Table/List */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
          <div className="border-b border-slate-800 px-8 py-5 flex items-center justify-between">
            <h4 className="font-bold">Historial de Solicitudes</h4>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Mostrando {loans?.length || 0} registros</span>
          </div>

          <div className="divide-y divide-slate-800">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
              </div>
            ) : loans?.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No tienes solicitudes registradas. ¡Inicia una ahora!
              </div>
            ) : (
              loans?.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between px-8 py-5 hover:bg-slate-800/30 transition group cursor-pointer">
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

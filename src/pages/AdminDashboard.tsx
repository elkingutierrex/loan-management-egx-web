import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LoanService } from '../services/LoanService';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  MoreHorizontal, 
  Filter, 
  Search,
  Check,
  X
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Loan } from '../types';

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Pendiente': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Aprobado': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Rechazado': 'bg-red-500/10 text-red-500 border-red-500/20',
  }[status] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';

  return (
    <span className={clsx("rounded-full border px-2 py-0.5 text-xs font-medium", styles)}>
      {status}
    </span>
  );
};

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'Todos' | 'Pendiente' | 'Aprobado' | 'Rechazado'>('Todos');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const { data: loans, isLoading } = useQuery({
    queryKey: ['admin-loans'],
    queryFn: () => LoanService.getAllLoans(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status, reason }: { id: string, status: 'Aprobado' | 'Rechazado', reason?: string }) => 
      LoanService.updateLoanStatus(id, status, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-loans'] });
      setShowRejectionModal(false);
      setRejectionReason('');
    }
  });

  const filteredLoans = loans?.filter(l => filter === 'Todos' || l.status === filter);

  const handleApprove = (id: string) => {
    if (confirm('¿Estás seguro de aprobar este préstamo?')) {
      updateMutation.mutate({ id, status: 'Aprobado' });
    }
  };

  const handleRejectClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowRejectionModal(true);
  };

  const submitRejection = () => {
    if (!rejectionReason.trim()) return alert('Debe indicar un motivo de rechazo');
    updateMutation.mutate({ id: selectedLoan!.id, status: 'Rechazado', reason: rejectionReason });
  };

  return (
    <DashboardLayout title="Gestión de Solicitudes">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-sm text-slate-500">Solicitudes Totales</p>
            <p className="text-2xl font-bold">{loans?.length || 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-sm text-amber-500">Pendientes</p>
            <p className="text-2xl font-bold">{loans?.filter(l => l.status === 'Pendiente').length || 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-sm text-emerald-500">Aprobadas</p>
            <p className="text-2xl font-bold">{loans?.filter(l => l.status === 'Aprobado').length || 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-sm text-red-500">Rechazadas</p>
            <p className="text-2xl font-bold">{loans?.filter(l => l.status === 'Rechazado').length || 0}</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['Todos', 'Pendiente', 'Aprobado', 'Rechazado'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={clsx(
                  "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition",
                  filter === f ? "bg-primary-600 text-white" : "border border-slate-800 text-slate-400 hover:bg-slate-800"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400" />
            <input 
              placeholder="Buscar por usuario o ID..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/40 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/20 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Monto</th>
                <th className="px-6 py-4">Plazo</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-500" />
                  </td>
                </tr>
              ) : filteredLoans?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-slate-500">
                    No hay solicitudes que coincidan con el filtro.
                  </td>
                </tr>
              ) : (
                filteredLoans?.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-800/30 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                          {loan.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{loan.userName}</p>
                          <p className="text-[10px] text-slate-500">ID: {loan.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-primary-400">
                      ${loan.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {loan.term} meses
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(loan.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={loan.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {loan.status === 'Pendiente' ? (
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleApprove(loan.id)}
                            className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500 hover:bg-emerald-500 hover:text-white transition"
                            title="Aprobar"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleRejectClick(loan)}
                            className="rounded-lg bg-red-500/10 p-2 text-red-500 hover:bg-red-500 hover:text-white transition"
                            title="Rechazar"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button className="text-slate-600 hover:text-slate-400 p-2">
                           <MoreHorizontal className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <h4 className="text-xl font-bold text-white mb-2">Rechazar Solicitud</h4>
            <p className="text-sm text-slate-400 mb-6">
              Indique el motivo por el cual se rechaza el préstamo para <span className="text-white font-medium">{selectedLoan?.userName}</span>.
            </p>
            
            <textarea 
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full h-32 rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-red-500 transition resize-none"
              placeholder="Ej: Historial crediticio insuficiente..."
            />

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setShowRejectionModal(false)}
                className="flex-1 rounded-xl py-3 font-semibold text-slate-400 hover:bg-slate-800 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={submitRejection}
                disabled={updateMutation.isPending}
                className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-500 transition disabled:opacity-50"
              >
                {updateMutation.isPending ? 'Procesando...' : 'Confirmar Rechazo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

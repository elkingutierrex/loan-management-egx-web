import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LoanService } from '../services/LoanService';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  MoreHorizontal, 
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
      <div className="w-full max-w-7xl mx-auto space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg transition-transform hover:scale-[1.02]">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Solicitudes Totales</p>
            <p className="text-4xl font-black text-white">{loans?.length || 0}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg transition-transform hover:scale-[1.02] border-l-4 border-l-amber-500">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500/70 mb-1">Pendientes</p>
            <p className="text-4xl font-black text-amber-500">{loans?.filter(l => l.status === 'Pendiente').length || 0}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg transition-transform hover:scale-[1.02] border-l-4 border-l-emerald-500">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/70 mb-1">Aprobadas</p>
            <p className="text-4xl font-black text-emerald-500">{loans?.filter(l => l.status === 'Aprobado').length || 0}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg transition-transform hover:scale-[1.02] border-l-4 border-l-red-500">
            <p className="text-xs font-bold uppercase tracking-widest text-red-500/70 mb-1">Rechazadas</p>
            <p className="text-4xl font-black text-red-500">{loans?.filter(l => l.status === 'Rechazado').length || 0}</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {['Todos', 'Pendiente', 'Aprobado', 'Rechazado'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={clsx(
                  "whitespace-nowrap rounded-xl px-6 py-2.5 text-sm font-bold transition-all",
                  filter === f 
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400" />
            <input 
              placeholder="Buscar por usuario o ID..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/30 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/40 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-10 py-6">Usuario</th>
                  <th className="px-10 py-6">Monto Solicitado</th>
                  <th className="px-10 py-6">Plazo</th>
                  <th className="px-10 py-6">Fecha</th>
                  <th className="px-10 py-6">Estado Actual</th>
                  <th className="px-10 py-6 text-right">Gestión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
                        <p className="text-slate-500 font-medium">Cargando solicitudes...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredLoans?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-24 text-center text-slate-500 font-medium">
                      No hay solicitudes que coincidan con el filtro.
                    </td>
                  </tr>
                ) : (
                  filteredLoans?.map((loan) => (
                    <tr key={loan.id} className="hover:bg-slate-800/40 transition-all group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-black shadow-lg">
                            {loan.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-100">{loan.userName}</p>
                            <p className="text-[10px] text-slate-500 font-mono">ID: {loan.id.substring(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <p className="text-lg font-black text-primary-400 font-mono">
                          ${loan.amount.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-10 py-6 text-sm font-medium text-slate-300">
                        {loan.term} meses
                      </td>
                      <td className="px-10 py-6 text-sm text-slate-500">
                        {new Date(loan.requestDate).toLocaleDateString()}
                      </td>
                      <td className="px-10 py-6">
                        <StatusBadge status={loan.status} />
                      </td>
                      <td className="px-10 py-6 text-right">
                        {loan.status === 'Pendiente' ? (
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
                            <button 
                              onClick={() => handleApprove(loan.id)}
                              className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
                              title="Aprobar"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleRejectClick(loan)}
                              className="rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                              title="Rechazar"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          <button className="text-slate-700 hover:text-slate-400 p-2 transition-colors">
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
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900 p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <XCircle className="h-10 w-10" />
            </div>
            <h4 className="text-2xl font-black text-white mb-2">Rechazar Solicitud</h4>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              Indique el motivo por el cual se rechaza el préstamo para <span className="text-white font-bold">{selectedLoan?.userName}</span>.
            </p>
            
            <textarea 
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full h-40 rounded-2xl border border-slate-700 bg-slate-950 p-5 text-white outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition resize-none"
              placeholder="Ej: Historial crediticio insuficiente..."
            />

            <div className="mt-10 flex gap-4">
              <button 
                onClick={() => setShowRejectionModal(false)}
                className="flex-1 rounded-2xl py-4 font-bold text-slate-400 hover:bg-slate-800 transition-all hover:text-slate-200"
              >
                Cancelar
              </button>
              <button 
                onClick={submitRejection}
                disabled={updateMutation.isPending}
                className="flex-1 rounded-2xl bg-red-600 py-4 font-bold text-white hover:bg-red-500 transition-all shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-50"
              >
                {updateMutation.isPending ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

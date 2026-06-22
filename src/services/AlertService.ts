import Swal from 'sweetalert2';

export const AlertService = {
  success: (title: string, text?: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      background: '#0f172a',
      color: '#f1f5f9',
      confirmButtonColor: '#0ea5e9',
      customClass: {
        popup: 'rounded-[2rem] border border-slate-800 shadow-2xl',
        confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-wider',
      }
    });
  },

  error: (title: string, text?: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      background: '#0f172a',
      color: '#f1f5f9',
      confirmButtonColor: '#ef4444',
      customClass: {
        popup: 'rounded-[2rem] border border-slate-800 shadow-2xl',
        confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-wider',
      }
    });
  },

  warning: (title: string, text?: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      background: '#0f172a',
      color: '#f1f5f9',
      confirmButtonColor: '#f59e0b',
      customClass: {
        popup: 'rounded-[2rem] border border-slate-800 shadow-2xl',
        confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-wider',
      }
    });
  },

  confirm: (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      background: '#0f172a',
      color: '#f1f5f9',
      confirmButtonColor: '#0ea5e9',
      cancelButtonColor: '#334155',
      customClass: {
        popup: 'rounded-[1.5rem] border border-slate-800 shadow-2xl',
        confirmButton: 'rounded-xl px-6 py-2.5 font-bold',
        cancelButton: 'rounded-xl px-6 py-2.5 font-bold'
      }
    });
  },

  underConstruction: () => {
    return Swal.fire({
      title: 'Funcionalidad en Construcción',
      text: 'Esta característica estará disponible próximamente 🚀',
      icon: 'info',
      background: '#0f172a',
      color: '#f1f5f9',
      confirmButtonColor: '#334155',
      customClass: {
        popup: 'rounded-[2rem] border border-slate-800 shadow-2xl',
        confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-wider',
      }
    });
  }
};

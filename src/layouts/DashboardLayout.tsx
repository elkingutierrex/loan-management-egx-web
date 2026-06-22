import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard, User as UserIcon, Bell, X, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { AlertService } from '../services/AlertService';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Bell, label: 'Notificaciones', active: false },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Mobile Header (Mobile Only) */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 shadow-md">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">BankLoan</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800/50"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar (Mobile & Desktop) */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-none lg:bg-slate-900/50 lg:backdrop-blur-xl",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/20">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">BankLoan</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2">
                <X className="h-6 w-6 text-slate-500" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4 mt-6">
            <button 
              onClick={() => navigate(user?.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard')}
              className="flex w-full items-center gap-3 rounded-xl bg-primary-500/10 px-4 py-3 text-primary-400 transition"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button 
              onClick={() => AlertService.underConstruction()}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800/50 hover:text-slate-100"
            >
              <Bell className="h-5 w-5" />
              <span className="font-medium">Notificaciones</span>
            </button>
          </nav>

          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-800/30 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                <UserIcon className="h-5 w-5 text-slate-300" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold">{user?.name}</p>
                <p className="truncate text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{user?.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay to close mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-w-0">
        <header className="hidden lg:flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/50 px-8 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-slate-500">Última conexión: Hoy</p>
            </div>
          </div>
        </header>

        <div className="px-4 py-6 sm:p-8">
          {/* Mobile visible title */}
          <h2 className="text-xl font-bold mb-6 lg:hidden">{title}</h2>
          {children}
        </div>
      </main>
    </div>
  );
}

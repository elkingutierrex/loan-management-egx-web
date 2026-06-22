import { useAuth } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard, User as UserIcon, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center border-b border-slate-800 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/20">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">BankLoan</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4 mt-6">
            <button className="flex w-full items-center gap-3 rounded-xl bg-primary-500/10 px-4 py-3 text-primary-400 transition">
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800/50 hover:text-slate-100">
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
                <p className="truncate text-xs text-slate-500 capitalize">{user?.role.toLowerCase()}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/50 px-8 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-slate-500">Última conexión: Hoy</p>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

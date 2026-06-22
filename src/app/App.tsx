import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-white">
          <Routes>
            <Route path="/" element={<div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-5xl font-bold text-primary-500 mb-4">BankLoan System</h1>
              <p className="text-slate-400 text-xl">React 19 + Tailwind + .NET 10</p>
              <div className="mt-8 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
                <p>Status: <span className="text-green-400 font-medium">Ready for Development</span></p>
              </div>
            </div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import { useAuth } from '../components/AuthContext';
import AdminOverview from '../components/dashboard/AdminOverview';
const TaskManagement = React.lazy(() => import('../components/dashboard/TaskManagement'));
// We'll create these later or reuse components
const PropertyForm = React.lazy(() => import('../components/dashboard/PropertyForm'));
const DashboardContent = () => <div className="p-10"><h1 className="text-3xl font-display font-bold">Painel de Controle</h1><p className="text-neutral-500">Bem-vindo à Fazenda360.</p></div>;

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="tarefas" element={<TaskManagement />} />
            <Route path="imoveis" element={<DashboardContent />} />
            <Route path="cadastrar-imovel" element={<PropertyForm />} />
            <Route path="leads" element={<DashboardContent />} />
            <Route path="propostas" element={<DashboardContent />} />
            <Route path="visitas" element={<DashboardContent />} />
            <Route path="relatorios" element={<DashboardContent />} />
            <Route path="documentos" element={<DashboardContent />} />
            <Route path="configuracoes" element={<DashboardContent />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}


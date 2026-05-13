import React from 'react';
import { 
  TrendingUp, Users, Map, FileText, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { useAuth } from '../AuthContext';

const data = [
  { name: 'Jan', leads: 40, sales: 24 },
  { name: 'Fev', leads: 30, sales: 13 },
  { name: 'Mar', leads: 20, sales: 38 },
  { name: 'Abr', leads: 27, sales: 39 },
  { name: 'Mai', leads: 18, sales: 48 },
  { name: 'Jun', leads: 23, sales: 38 },
];

const StatCard = ({ title, value, icon: Icon, trend, color, progress }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <span className="text-neutral-500 text-sm font-medium">{title}</span>
      {trend && (
        <span className={`px-2 py-1 text-[10px] font-bold rounded ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-neutral-900 mt-2">{value}</p>
    {progress && (
      <div className="w-full bg-neutral-100 h-1.5 mt-4 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
    )}
  </div>
);

export default function AdminOverview() {
  const { profile } = useAuth();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-neutral-50/50 min-h-screen">
      <header className="flex items-end justify-between">
        <div>
          <p className="text-sm text-neutral-500 font-medium">Bem-vindo de volta, {profile?.displayName || 'Admin'}</p>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Visão Geral do Sistema</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-neutral-200 bg-white rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">Gerar Relatório</button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium shadow-sm shadow-primary-200 hover:bg-primary-700 transition-colors">Novo Registro</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Faturamento Total" 
          value="R$ 142.384,00" 
          trend={12.5} 
          progress={70}
          color="bg-green-500" 
        />
        <StatCard 
          title="Projetos Ativos" 
          value="84% Capacidade" 
          trend={8.4}
          progress={84}
          color="bg-primary-600" 
        />
        <StatCard 
          title="Uptime do Sistema" 
          value="99.98%" 
          trend={0.01}
          progress={99.98}
          color="bg-amber-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-bold text-neutral-800">Performance de Vendas</h2>
            <div className="flex gap-2">
               <button className="text-primary-600 text-xs font-semibold hover:underline">Ver Detalhes</button>
            </div>
          </div>
          
          <div className="p-8 h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-10} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
                />
                <Area type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions/Recent Section */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-bold text-neutral-800">Transações Recentes</h2>
            <button className="text-primary-600 text-xs font-semibold hover:underline">Ver Tudo</button>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-600">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-neutral-50 last:border-0">
                    <td className="px-6 py-4 font-medium text-neutral-900">Global Tech {i}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${i % 2 === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        {i % 2 === 0 ? 'Concluído' : 'Processando'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

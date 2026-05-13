import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Users, FileText, 
  Settings, LogOut, TrendingUp, Briefcase,
  PlusCircle, ClipboardList, CheckSquare
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';
import { getFirebase } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Sidebar() {
  const { profile, isAdmin, isBroker, isSeller } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const firebase = await getFirebase();
    if (firebase) {
      await signOut(firebase.auth);
      navigate('/');
    }
  };

  const links = [
    { name: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard, roles: 'all' },
    { name: 'Tarefas', href: '/dashboard/tarefas', icon: CheckSquare, roles: 'all' },
    { name: 'Anunciar Fazenda', href: '/dashboard/cadastrar-imovel', icon: PlusCircle, roles: [UserRole.SELLER, UserRole.BROKER] },
    { name: 'Minhas Fazendas', href: '/dashboard/imoveis', icon: Map, roles: [UserRole.SELLER, UserRole.BROKER, UserRole.SUPER_ADMIN] },

    { name: 'Leads', href: '/dashboard/leads', icon: Users, roles: [UserRole.BROKER, UserRole.COMMERCIAL_CONSULTANT, UserRole.SUPER_ADMIN] },
    { name: 'Propostas', href: '/dashboard/propostas', icon: FileText, roles: 'all' },
    { name: 'Visitas', href: '/dashboard/visitas', icon: ClipboardList, roles: 'all' },
    { name: 'Relatórios', href: '/dashboard/relatorios', icon: TrendingUp, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN_OPERATIONAL] },
    { name: 'Documentos', href: '/dashboard/documentos', icon: CheckSquare, roles: [UserRole.DOC_ANALYST, UserRole.SUPER_ADMIN] },
  ];

  const filteredLinks = links.filter(link => 
    link.roles === 'all' || 
    (Array.isArray(link.roles) && profile?.role && link.roles.includes(profile.role))
  );

  return (
    <div className="w-72 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-xl font-display font-bold text-neutral-900">Fazenda<span className="text-primary-600">360</span></span>
        </Link>
      </div>

      <div className="px-6 py-2">
        <div className="bg-primary-50 p-4 rounded-2xl border border-primary-100 mb-8">
          <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-1">Seu Perfil</p>
          <p className="text-sm font-bold text-primary-900">{profile?.displayName || 'Carregando...'}</p>
          <div className="mt-2 text-[8px] inline-block px-2 py-0.5 bg-primary-600 text-white rounded font-bold uppercase tracking-tighter">
            {profile?.role?.replace('_', ' ')}
          </div>
        </div>

        <nav className="space-y-1">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              end={link.href === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group',
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                )
              }
            >
              <div className={cn(
                "w-1.5 h-1.5 rounded-full transition-all mr-1",
                "bg-neutral-300 group-hover:bg-neutral-400",
                "group-[.active]:bg-primary-600"
              )} />
              <link.icon className="w-5 h-5 opacity-70" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-6 py-8 space-y-2">
        <NavLink
          to="/dashboard/configuracoes"
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all',
              isActive ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            )
          }
        >
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </NavLink>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>Encerrar Sessão</span>
        </button>
      </div>
    </div>
  );
}

// Add missing Link import
import { Link } from 'react-router-dom';

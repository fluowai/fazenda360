import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCheck, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { getFirebase } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserRole } from '../types';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const firebase = await getFirebase();
      if (!firebase) throw new Error('Erro ao carregar serviços.');
      
      const { user } = await createUserWithEmailAndPassword(firebase.auth, email, password);
      
      await setDoc(doc(firebase.db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name,
        role: role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError('Erro ao criar conta. Verifique os dados ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: UserRole.BUYER, label: 'Quero Comprar', description: 'Procuro fazendas e áreas rurais.', icon: User },
    { id: UserRole.SELLER, label: 'Quero Vender', description: 'Tenho propriedade para anunciar.', icon: UserCheck },
    { id: UserRole.BROKER, label: 'Sou Corretor', description: 'Quero ser um parceiro comercial.', icon: Shield },
  ];

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-neutral-50 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="bg-white p-10 rounded-[32px] border border-neutral-200 shadow-xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Crie sua conta</h1>
            <p className="text-neutral-500 font-medium text-sm">Faça parte do maior ecossistema inteligente de imóveis rurais do Brasil.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    role === r.id ? 'border-primary-500 bg-primary-50 active:scale-[0.98]' : 'border-neutral-100 hover:border-neutral-200 bg-white'
                  }`}
                >
                  <r.icon className={`w-5 h-5 mb-3 ${role === r.id ? 'text-primary-600' : 'text-neutral-400'}`} />
                  <div className="text-sm font-bold text-neutral-900 mb-1">{r.label}</div>
                  <div className="text-[10px] text-neutral-400 font-medium leading-tight">{r.description}</div>
                </button>
              ))}
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                    placeholder="João da Silva"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">E-mail Profissional</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Crie uma Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-600/20 active:scale-95 transition-all"
            >
              {loading ? 'Criando sua conta...' : 'Cadastrar agora'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-neutral-500">
            Já possui uma conta? <Link to="/login" className="text-primary-600 font-bold hover:underline">Fazer login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

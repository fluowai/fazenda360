import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'motion/react';
import { getFirebase } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const firebase = await getFirebase();
      if (!firebase) throw new Error('Erro ao carregar serviços.');
      await signInWithEmailAndPassword(firebase.auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const firebase = await getFirebase();
      if (!firebase) return;
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebase.auth, provider);
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao entrar com Google.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-neutral-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-10 rounded-[32px] border border-neutral-200 shadow-xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Bem-vindo de volta</h1>
            <p className="text-neutral-500 font-medium">Acesse sua conta para gerenciar seus imóveis e propostas.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">E-mail</label>
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
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-bold text-neutral-700">Senha</label>
                <Link to="/recovery" className="text-xs font-bold text-primary-600 hover:underline">Esqueceu a senha?</Link>
              </div>
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

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-600/20 active:scale-95 transition-all flex items-center justify-center"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Entrar na conta'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-neutral-400">Ou entre com</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors font-bold text-neutral-700 mb-8"
          >
            <Chrome className="w-5 h-5" />
            <span>Google</span>
          </button>

          <p className="text-center text-sm font-medium text-neutral-500">
            Não tem uma conta? <Link to="/cadastrar" className="text-primary-600 font-bold hover:underline">Crie agora</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

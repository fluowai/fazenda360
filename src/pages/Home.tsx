import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, TrendingUp, ShieldCheck, Zap, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const stats = [
  { label: 'Anunciados', value: 'R$ 12Bi+', icon: TrendingUp },
  { label: 'Propriedades', value: '1.500+', icon: MapPin },
  { label: 'Usuários Ativos', value: '50k+', icon: Users },
  { label: 'Verificados', value: '100%', icon: ShieldCheck },
];

const categories = [
  { title: 'Soja & Grãos', icon: '🌱', count: 420 },
  { title: 'Pecuária', icon: '🐂', count: 350 },
  { title: 'Café', icon: '☕', count: 120 },
  { title: 'Haras', icon: '🐎', count: 85 },
  { title: 'Fruticultura', icon: '🍎', count: 65 },
  { title: 'Eucalipto', icon: '🌲', count: 45 },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Fazenda Landscape" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 rounded-full text-primary-200 text-xs font-bold uppercase tracking-[0.2em]">
              Inteligência Rural & Comercial
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tighter">
              A maior vitrine de <br />
              <span className="text-primary-400">fazendas inteligentes</span> do Brasil.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Conectamos compradores, proprietários e corretores em uma plataforma completa de gestão, transparência e tecnologia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="relative col-span-1 md:col-span-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Cidade, Estado ou Código..." 
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                />
              </div>
              <select className="bg-white px-4 py-4 rounded-xl text-slate-900 border-none focus:ring-2 focus:ring-primary-500 font-medium cursor-pointer appearance-none">
                <option>Tipo de Imóvel</option>
                <option>Fazenda</option>
                <option>Sítio</option>
                <option>Área Industrial</option>
              </select>
              <button className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary-600/20 active:scale-95">
                Pesquisar
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3 block">Seleção Especial</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Oportunidades em Destaque</h2>
              <p className="text-slate-500 max-w-xl font-medium leading-relaxed">
                Propriedades com documentação verificada pela nossa equipe jurídica e alto potencial produtivo.
              </p>
            </div>
            <Link to="/buscar" className="flex items-center text-primary-600 font-bold text-sm hover:text-primary-700 transition-colors">
              Ver todas as ofertas <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Mock Property Cards */}
            {[1, 2, 3].map((id) => (
              <motion.div 
                key={id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/5 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=800&sig=${id}`} alt="Property" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-900 uppercase border border-slate-100">Documentação OK</span>
                    <span className="px-3 py-1 bg-primary-600 rounded-full text-[10px] font-bold text-white uppercase shadow-lg shadow-primary-600/20">Destaque</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-primary-500" /> Lucas do Rio Verde, MT
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Fazenda Vale do Ouro - 1.200ha</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                    Propriedade de altíssima produtividade com teor de argila acima de 35%. Completa infraestrutura.
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Preço Total</div>
                      <div className="text-lg font-bold text-slate-900 tracking-tight">R$ 48.000.000</div>
                    </div>
                    <Link to={`/imovel/${id}`} className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/10 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Aptidões e Culturas</h2>
            <p className="text-slate-400 max-w-xl mx-auto font-medium">Navegue pelas principais vertentes do agronegócio e encontre o imóvel certo para o seu projeto.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 hover:border-primary-500/50 transition-all cursor-pointer group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h4 className="font-bold text-sm mb-1">{cat.title}</h4>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{cat.count} Ofertas</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-3xl p-12 relative overflow-hidden group border border-slate-200 shadow-sm">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">É proprietário?</h3>
                <p className="text-slate-600 mb-8 max-w-sm font-medium leading-relaxed">Anuncie sua fazenda no portal que mais qualifica leads no Brasil e venda com segurança jurídica.</p>
                <Link to="/cadastrar" className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-sm tracking-tight">
                  Quero Vender <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-200 group-hover:text-primary-100 transition-colors" />
            </div>

            <div className="bg-primary-50 rounded-3xl p-12 relative overflow-hidden group border border-primary-100 shadow-sm">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-primary-900 mb-4 tracking-tight">É Corretor?</h3>
                <p className="text-primary-700/70 mb-8 max-w-sm font-medium leading-relaxed">Torne-se um parceiro oficial, acesse o inventário exclusivo e use nosso CRM inteligente para vender mais.</p>
                <Link to="/cadastrar" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all text-sm tracking-tight shadow-lg shadow-primary-600/20">
                  Seja Parceiro <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <Star className="absolute -bottom-10 -right-10 w-48 h-48 text-primary-200/40 group-hover:text-primary-300 transition-colors" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

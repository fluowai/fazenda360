import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-display font-bold">Fazenda<span className="text-primary-500">360</span></span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              A plataforma inteligente para compra e venda de fazendas no Brasil. Conectamos proprietários, corretores e compradores com segurança e dados precisos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-600 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-600 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link to="/buscar" className="hover:text-primary-400 transition-colors">Buscar Fazendas</Link></li>
              <li><Link to="/vender" className="hover:text-primary-400 transition-colors">Quero Vender</Link></li>
              <li><Link to="/parceria" className="hover:text-primary-400 transition-colors">Seja um Parceiro</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog Rural</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-6">Suporte</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">Perguntas Frequentes</Link></li>
              <li><Link to="/contato" className="hover:text-primary-400 transition-colors">Fale Conosco</Link></li>
              <li><Link to="/privacidade" className="hover:text-primary-400 transition-colors">Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-primary-400 transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <span>+55 (11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <span>contato@fazenda360.com.br</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span>Ribeirão Preto, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-neutral-500 text-xs text-center font-medium uppercase tracking-widest">
            © 2026 Fazenda360 — Tecnologia para o Agronegócio.
          </p>
          <div className="flex space-x-6">
            <span className="text-neutral-600 text-[10px] items-center flex gap-1 uppercase tracking-tighter">
              Desenvolvido com IA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

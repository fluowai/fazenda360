import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, DollarSign, Ruler, Info, Share2, Heart, 
  CheckCircle2, Droplets, Zap, Shield, Warehouse, Home as HomeIcon,
  ChevronRight, MessageCircle, FileText, Sparkles, TrendingUp, Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { Property, PropertyStatus } from '../types';
import { formatCurrency, formatArea, cn } from '../lib/utils';
import { analyzeProperty } from '../services/geminiService';

export default function PropertyDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Mock Property
  const property: Partial<Property> = {
    id: '1',
    title: 'Fazenda Rio Negro - Alta Produtividade',
    city: 'Sorriso',
    state: 'MT',
    totalArea: 1500,
    areaUnit: 'hectares',
    totalPrice: 65000000,
    status: PropertyStatus.PUBLISHED,
    description: 'Excelente fazenda para soja e milho, com teor de argila acima de 30%. Localização estratégica próxima a armazéns e rodovias principais. Solo fértil, topografia plana e ótima logística.',
    technicalDescription: 'Solo de Latossolo Vermelho Amarelo. Índice pluviométrico de 1.800mm a 2.100mm. Altitude de 380m. Fazenda totalmente mecanizável.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=1200'
    ],
    aptitudes: ['Soja', 'Milho', 'Algodão'],
    infrastructure: {
      hasMainHouse: true,
      hasStaffHouse: true,
      hasCorral: true,
      hasSilo: false,
      energy: true,
      internet: true,
      waterSources: ['Rio', 'Poço Artesiano'],
    },
    productivity: {
      soilType: 'Latossolo Vermelho',
      clayContent: '35% a 40%',
      topography: 'Plana',
    }
  };

  useEffect(() => {
    const getAnalysis = async () => {
      setLoadingAnalysis(true);
      const res = await analyzeProperty(property);
      setAnalysis(res);
      setLoadingAnalysis(false);
    };
    getAnalysis();
  }, [id]);

  return (
    <div className="bg-neutral-50 pb-20">
      {/* Gallery Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <nav className="flex items-center space-x-2 text-xs font-bold text-neutral-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-primary-600">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/buscar" className="hover:text-primary-600">Busca</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900">{property.title}</span>
            </nav>
            <div className="flex items-center space-x-3">
              <button className="p-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors">
                <Share2 className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="p-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors">
                <Heart className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px] md:h-[500px] rounded-[32px] overflow-hidden">
            <div className="h-full">
              <img src={property.images?.[0]} className="w-full h-full object-cover" alt="Principal" />
            </div>
            <div className="hidden md:grid grid-cols-1 gap-4">
              <img src={property.images?.[1]} className="w-full h-full object-cover" alt="Secundária" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-[10px] font-bold uppercase">Verificado</span>
                <span className="px-3 py-1 bg-neutral-900 text-white rounded-full text-[10px] font-bold uppercase">Código: {property.id}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">{property.title}</h1>
              <div className="flex items-center text-neutral-500 font-bold text-sm">
                <MapPin className="w-4 h-4 mr-2 text-primary-500" /> {property.city}, {property.state}
              </div>
            </section>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm text-center">
                <Ruler className="w-6 h-6 mx-auto mb-3 text-primary-600" />
                <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Área Total</div>
                <div className="text-lg font-bold text-neutral-900">{formatArea(property.totalArea || 0, property.areaUnit || 'ha')}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-3 text-primary-600" />
                <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Tipo de Solo</div>
                <div className="text-lg font-bold text-neutral-900">{property.productivity?.soilType}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm text-center">
                <Shield className="w-6 h-6 mx-auto mb-3 text-primary-600" />
                <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Aptidão</div>
                <div className="text-lg font-bold text-neutral-900">{property.aptitudes?.[0]}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-3 text-primary-600" />
                <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Preço / ha</div>
                <div className="text-lg font-bold text-neutral-900">{formatCurrency((property.totalPrice || 0) / (property.totalArea || 1))}</div>
              </div>
            </div>

            {/* AI Analysis Card */}
            {analysis && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-neutral-900 rounded-[32px] p-8 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px]"></div>
                <div className="relative z-10 flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary-600 rounded-2xl">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold">Análise Estratégica IA</h3>
                    <p className="text-neutral-400 text-sm">Resumo inteligente para investidores</p>
                  </div>
                </div>
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                  <div>
                    <h4 className="text-primary-400 font-bold text-xs uppercase mb-3 flex items-center">
                      <TrendingUp className="w-3.5 h-3.5 mr-2" /> Pontos Fortes
                    </h4>
                    <ul className="space-y-3">
                      {analysis.pontos_fortes?.map((pt: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-primary-500 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-primary-400 font-bold text-xs uppercase mb-3 flex items-center">
                      <Users className="w-3.5 h-3.5 mr-2" /> Perfil Ideal
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {analysis.perfil_ideal}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tabs */}
            <div className="space-y-6">
              <div className="flex border-b border-neutral-200">
                {['info', 'infrastructure', 'tech'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 -mb-[2px]",
                      activeTab === tab ? "border-primary-600 text-primary-600" : "border-transparent text-neutral-400 hover:text-neutral-600"
                    )}
                  >
                    {tab === 'info' ? 'Informações' : tab === 'infrastructure' ? 'Infraestrutura' : 'Ficha Técnica'}
                  </button>
                ))}
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-neutral-200 shadow-sm min-h-[300px]">
                {activeTab === 'info' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <h3 className="text-xl font-display font-bold text-neutral-900">Sobre a Propriedade</h3>
                    <p className="text-neutral-600 leading-relaxed whitespace-pre-line">{property.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                      <div className="flex items-center p-4 bg-neutral-50 rounded-2xl">
                        <Droplets className="w-5 h-5 mr-3 text-primary-600" />
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase">Fontes de Água</p>
                          <p className="text-sm font-bold text-neutral-700">{property.infrastructure?.waterSources.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-neutral-50 rounded-2xl">
                        <TrendingUp className="w-5 h-5 mr-3 text-primary-600" />
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase">Topografia</p>
                          <p className="text-sm font-bold text-neutral-700">{property.productivity?.topography}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'infrastructure' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-3 gap-8 p-4">
                    <div className="flex flex-col items-center text-center">
                      <HomeIcon className={cn("w-8 h-8 mb-3", property.infrastructure?.hasMainHouse ? "text-primary-600" : "text-neutral-200")} />
                      <span className="text-xs font-bold text-neutral-700">Casa Sede</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Users className={cn("w-8 h-8 mb-3", property.infrastructure?.hasStaffHouse ? "text-primary-600" : "text-neutral-200")} />
                      <span className="text-xs font-bold text-neutral-700">Alojamento</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Zap className={cn("w-8 h-8 mb-3", property.infrastructure?.energy ? "text-primary-600" : "text-neutral-200")} />
                      <span className="text-xs font-bold text-neutral-700">Energia Elétrica</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Warehouse className={cn("w-8 h-8 mb-3", property.infrastructure?.hasCorral ? "text-primary-600" : "text-neutral-200")} />
                      <span className="text-xs font-bold text-neutral-700">Curral</span>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'tech' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <h3 className="text-xl font-display font-bold text-neutral-900">Detalhes de Solo e Produção</h3>
                     <p className="text-neutral-600 leading-relaxed">{property.technicalDescription}</p>
                     <div className="py-2 space-y-4">
                        <div className="flex justify-between border-b border-neutral-100 py-3">
                           <span className="text-neutral-500 font-medium">Teor de Argila</span>
                           <span className="font-bold text-neutral-900">{property.productivity?.clayContent}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-100 py-3">
                           <span className="text-neutral-500 font-medium">Aptidão Principal</span>
                           <span className="font-bold text-primary-600">{property.aptitudes?.[0]}</span>
                        </div>
                     </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-8 rounded-[40px] border border-neutral-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-full -mr-12 -mt-12"></div>
                
                <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest mb-2">Valor de Investimento</p>
                <div className="text-4xl font-display font-bold text-neutral-900 mb-8">{formatCurrency(property.totalPrice || 0)}</div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-sm font-semibold text-neutral-600 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" /> 100% Documentada
                  </div>
                  <div className="flex items-center text-sm font-semibold text-neutral-600 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" /> Georreferenciada
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]">
                    <MessageCircle className="w-5 h-5 mr-2" /> Falar com Especialista
                  </button>
                  <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-[0.98]">
                    <Calendar className="w-5 h-5 mr-2" /> Agendar Visita
                  </button>
                  <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900 font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-[0.98]">
                    <FileText className="w-5 h-5 mr-2" /> Enviar Proposta
                  </button>
                </div>
              </div>

              <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary-600" />
                  <h4 className="font-bold text-primary-900">Compra Segura</h4>
                </div>
                <p className="text-xs text-primary-700 font-medium leading-relaxed">
                  Toda negociação através da Fazenda360 passa por uma rigorosa análise documental e compliance jurídico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

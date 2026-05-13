import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, CheckCircle2, ChevronRight, ChevronLeft, 
  Upload, Info, Home, Droplets, TrendingUp 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Property, PropertyStatus } from '../../types';

const steps = [
  { id: 1, name: 'Básico', description: 'Dados iniciais do imóvel' },
  { id: 2, name: 'Localização', description: 'Onde fica a propriedade' },
  { id: 3, name: 'Produção', description: 'Aptidão e solo' },
  { id: 4, name: 'Fotos & Mídia', description: 'Imagens e vídeos' },
];

export default function PropertyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    type: 'Fazenda',
    totalArea: 0,
    areaUnit: 'hectares',
    totalPrice: 0,
    aptitudes: [],
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-10">
      <header className="mb-12">
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">Cadastrar Nova Propriedade</h1>
        <p className="text-neutral-500 font-medium">Siga as etapas abaixo para publicar sua fazenda no portal.</p>
      </header>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-16 relative">
        <div className="absolute top-5 left-0 w-full h-[2px] bg-neutral-100 -z-10"></div>
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center group relative z-10">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-4",
              currentStep === step.id ? "bg-primary-600 border-primary-100 text-white" : 
              currentStep > step.id ? "bg-primary-100 border-primary-50 text-primary-600" : "bg-neutral-50 border-white text-neutral-400"
            )}>
              {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
            </div>
            <div className="absolute top-12 whitespace-nowrap text-center">
              <p className={cn("text-xs font-bold uppercase tracking-widest", currentStep === step.id ? "text-neutral-900" : "text-neutral-400")}>
                {step.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-neutral-200 shadow-xl overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Título do Anúncio</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Fazenda Santa Maria"
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Tipo de Propriedade</label>
                  <select className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none">
                    <option>Fazenda</option>
                    <option>Sítio</option>
                    <option>Haras</option>
                    <option>Área Industrial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Área Total</label>
                  <div className="flex gap-2">
                    <input type="number" className="flex-grow px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    <select className="w-32 px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none">
                      <option>ha</option>
                      <option>alq SP</option>
                      <option>alq MG</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Preço Total (R$)</label>
                  <input type="number" className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="0,00" />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Estado</label>
                  <select className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none">
                    <option>Selecione um estado</option>
                    <option>Mato Grosso</option>
                    <option>Goiás</option>
                    <option>São Paulo</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Cidade</label>
                  <input type="text" className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Descrição do Acesso</label>
                  <textarea className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]" placeholder="Como chegar na propriedade..."></textarea>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="border-2 border-dashed border-neutral-200 rounded-3xl p-16 text-center hover:border-primary-500 transition-colors cursor-pointer group">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-primary-600" />
                </div>
                <h4 className="text-xl font-display font-bold text-neutral-900 mb-2">Arraste as fotos aqui</h4>
                <p className="text-neutral-500 font-medium max-w-sm mx-auto">Upload de até 20 fotos em alta resolução. Recomendamos fotos de drone e da infraestrutura.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-between pt-8 border-t border-neutral-100">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-neutral-400 hover:text-neutral-900 disabled:opacity-0 transition-all font-display"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <button 
            onClick={nextStep}
            className="flex items-center space-x-2 px-10 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 active:scale-95 transition-all font-display"
          >
            <span>{currentStep === steps.length ? 'Finalizar e Enviar' : 'Continuar'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

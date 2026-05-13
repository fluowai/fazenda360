import React, { useState } from 'react';
import { Search as SearchIcon, SlidersHorizontal, MapPin, Grid, List as ListIcon, ChevronDown, Filter } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { Property, PropertyStatus } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// Mock Data
const MOCK_PROPERTIES: Partial<Property>[] = [
  {
    id: '1',
    title: 'Fazenda Rio Negro - Alta Produtividade',
    city: 'Sorriso',
    state: 'MT',
    totalArea: 1500,
    areaUnit: 'hectares',
    totalPrice: 65000000,
    status: PropertyStatus.PUBLISHED,
    description: 'Excelente fazenda para soja e milho, com teor de argila acima de 30%.',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'],
    aptitudes: ['Soja', 'Milho'],
  },
  {
    id: '2',
    title: 'Haras Premium Estrela da Manhã',
    city: 'Boituva',
    state: 'SP',
    totalArea: 45,
    areaUnit: 'alqueires',
    totalPrice: 12500000,
    status: PropertyStatus.FEATURED,
    description: 'Estrutura completa para criação de cavalos de elite e lazer.',
    images: ['https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=800'],
    aptitudes: ['Haras', 'Lazer'],
  },
  {
    id: '3',
    title: 'Área Pecuária Recanto do Gado',
    city: 'Rio Verde',
    state: 'GO',
    totalArea: 2200,
    areaUnit: 'hectares',
    totalPrice: 42000000,
    status: PropertyStatus.PUBLISHED,
    description: 'Pastagem formada, diversos açudes e divisões de pasto.',
    images: ['https://images.unsplash.com/photo-1533939335919-f53835f8e658?auto=format&fit=crop&q=80&w=800'],
    aptitudes: ['Pecuária'],
  },
  {
    id: '4',
    title: 'Fazenda Horizonte Azul',
    city: 'Barreiras',
    state: 'BA',
    totalArea: 3500,
    areaUnit: 'hectares',
    totalPrice: 98000000,
    status: PropertyStatus.FEATURED,
    description: 'Topografia totalmente plana, ideal para pivô central.',
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'],
    aptitudes: ['Irrigação', 'Grãos'],
  },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    aptitude: 'Todas',
    propertyType: 'Todos',
    state: 'Todos',
    minArea: '',
    maxArea: '',
    bedrooms: 'Todos',
    bathrooms: 'Todos',
    maxPrice: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Header / Search Controls */}
      <div className="bg-white border-b border-neutral-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Busque por título, cidade, estado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center space-x-2 px-6 py-3 rounded-xl border font-bold text-sm transition-all whitespace-nowrap w-full md:w-auto justify-center",
                showFilters ? "bg-primary-600 border-primary-600 text-white" : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros Avançados</span>
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 pb-6 border-t border-neutral-100 mt-6">
                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Tipo de Imóvel</label>
                    <select 
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer appearance-none"
                    >
                      <option value="Todos">Todos os Tipos</option>
                      <option value="Fazenda">Fazenda</option>
                      <option value="Sitio">Sítio</option>
                      <option value="Chácara">Chácara</option>
                      <option value="Haras">Haras</option>
                    </select>
                  </div>

                  {/* Aptitude */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Aptidão Principal</label>
                    <select 
                      value={filters.aptitude}
                      onChange={(e) => handleFilterChange('aptitude', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer appearance-none"
                    >
                      <option value="Todas">Todas as Aptidões</option>
                      <option value="Soja">Soja / Grãos</option>
                      <option value="Pecuaria">Pecuária</option>
                      <option value="Haras">Haras</option>
                      <option value="Lazer">Lazer / Turismo</option>
                      <option value="Irrigacao">Irrigação</option>
                    </select>
                  </div>

                  {/* Area Range */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Área (ha)</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Mín" 
                        value={filters.minArea}
                        onChange={(e) => handleFilterChange('minArea', e.target.value)}
                        className="w-1/2 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" 
                      />
                      <input 
                        type="number" 
                        placeholder="Máx" 
                        value={filters.maxArea}
                        onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                        className="w-1/2 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" 
                      />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Quartos</label>
                    <div className="flex gap-1">
                      {['Todos', '1+', '2+', '3+', '4+'].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleFilterChange('bedrooms', val)}
                          className={cn(
                            "flex-1 py-2 text-xs font-bold rounded-lg border transition-all",
                            filters.bedrooms === val 
                              ? "bg-primary-600 border-primary-600 text-white shadow-sm" 
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-primary-400"
                          )}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Banheiros</label>
                    <div className="flex gap-1">
                      {['Todos', '1+', '2+', '3+', '4+'].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleFilterChange('bathrooms', val)}
                          className={cn(
                            "flex-1 py-2 text-xs font-bold rounded-lg border transition-all",
                            filters.bathrooms === val 
                              ? "bg-primary-600 border-primary-600 text-white shadow-sm" 
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-primary-400"
                          )}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Estado</label>
                    <select 
                      value={filters.state}
                      onChange={(e) => handleFilterChange('state', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer appearance-none"
                    >
                      <option value="Todos">Todos os Estados</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="SP">São Paulo</option>
                      <option value="GO">Goiás</option>
                      <option value="BA">Bahia</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="MS">Mato Grosso do Sul</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Preço Máximo</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-bold">R$</span>
                      <input 
                        type="text" 
                        placeholder="0,00" 
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none" 
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-end pb-1">
                    <button 
                      onClick={() => setFilters({
                        aptitude: 'Todas',
                        propertyType: 'Todos',
                        state: 'Todos',
                        minArea: '',
                        maxArea: '',
                        bedrooms: 'Todos',
                        bathrooms: 'Todos',
                        maxPrice: ''
                      })}
                      className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-widest underline underline-offset-4"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-display font-bold text-neutral-900">
            {MOCK_PROPERTIES.length} Propriedades encontradas
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-neutral-400 uppercase mr-2">Ordenar por:</span>
            <select className="bg-transparent border-none text-sm font-bold text-primary-600 focus:ring-0 cursor-pointer">
              <option>Mais recentes</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Maior área</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
        
        {/* Pagination Placeholder */}
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 border border-neutral-200 rounded-xl font-bold text-neutral-600 hover:bg-neutral-100 transition-colors">
            Carregar mais propriedades
          </button>
        </div>
      </div>
    </div>
  );
}

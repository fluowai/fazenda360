import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, formatArea } from '../lib/utils';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Partial<Property>;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/5 transition-all h-full flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=800'} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.status === 'FEATURED' && (
            <span className="px-3 py-1 bg-primary-600 rounded-full text-[10px] font-bold text-white uppercase shadow-lg shadow-primary-600/20">Destaque</span>
          )}
          <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-neutral-900 uppercase flex items-center shadow-sm border border-neutral-100">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> Verificado
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-2">
          <MapPin className="w-3.5 h-3.5 mr-1 text-primary-500" /> {property.city}, {property.state}
        </div>
        
        <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-1 tracking-tight">
          {property.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.aptitudes?.slice(0, 2).map((apt) => (
            <span key={apt} className="px-2 py-0.5 bg-neutral-50 text-neutral-500 rounded-md text-[10px] font-bold uppercase border border-neutral-100">
              {apt}
            </span>
          ))}
          <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-md text-[10px] font-bold uppercase border border-primary-100">
            {formatArea(property.totalArea || 0, property.areaUnit || 'ha')}
          </span>
        </div>

        <p className="text-neutral-500 text-xs font-medium line-clamp-2 mb-6 leading-relaxed">
          {property.description}
        </p>

        <div className="mt-auto pt-4 border-t border-neutral-50 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase mb-0.5">Preço Total</div>
            <div className="text-lg font-bold text-neutral-900 leading-none tracking-tight">
              {formatCurrency(property.totalPrice || 0)}
            </div>
          </div>
          <Link 
            to={`/imovel/${property.id}`} 
            className="p-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 transition-all active:scale-95"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default PropertyCard;

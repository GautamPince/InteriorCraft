import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/services/${service.slug}`)}
      className="group bg-[#FCFAF7] border border-[#E5E1DA] overflow-hidden hover:border-[#C5A059] transition-all duration-300 flex flex-col cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E5E1DA]">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
          <span className="text-xs text-[#FAF8F5]/90 font-light">Starts at</span>
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A1A]/90 backdrop-blur-sm px-2.5 py-1">
            {service.starting_price}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-[#1A1A1A] font-normal group-hover:text-[#C5A059] transition-colors mb-2">
          {service.name}
        </h3>

        <p className="text-xs sm:text-sm text-[#6B635B] font-light leading-relaxed mb-4 flex-1">
          {service.short_description}
        </p>

        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-6 pt-3 border-t border-[#E5E1DA]">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#524B44]">
                <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors pt-2">
          <span>Explore Service</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

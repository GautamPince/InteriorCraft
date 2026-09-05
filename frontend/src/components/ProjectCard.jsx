import React from 'react';
import { MapPin, Maximize2, BedDouble, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="group cursor-pointer bg-[#FCFAF7] border border-[#E5E1DA] overflow-hidden hover:border-[#C5A059] transition-all duration-300 flex flex-col shadow-sm hover:shadow-md"
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E5E1DA]">
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {project.featured && (
          <div className="absolute top-3 left-3 bg-[#1A1A1A]/90 backdrop-blur-sm text-[#C5A059] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#C5A059]">
            Featured
          </div>
        )}

        <div className="absolute top-3 right-3 bg-[#FCFAF7]/95 backdrop-blur-sm text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#E5E1DA]">
          {project.design_style}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-[#1A1A1A] text-white p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <ArrowUpRight className="w-5 h-5 text-[#C5A059]" />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-[#8C7A6B] mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          <span className="truncate">{project.location}, {project.city}</span>
          <span className="text-[#C0B7AB]">·</span>
          <span className="text-[#7A7268]">{project.property_type}</span>
        </div>

        <h3 className="font-serif text-lg text-[#1A1A1A] font-normal leading-snug group-hover:text-[#C5A059] transition-colors mb-2 line-clamp-1">
          {project.title}
        </h3>

        <p className="text-xs text-[#6B635B] font-light leading-relaxed line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        {/* Specs & Budget */}
        <div className="pt-3 border-t border-[#E5E1DA] flex items-center justify-between text-xs text-[#524B44]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-[#8C7A6B]" />
              <span>{project.bedrooms} BHK</span>
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#8C7A6B]" />
              <span>{project.area_sqft?.toLocaleString()} sq.ft</span>
            </span>
          </div>

          <div className="font-bold text-[#1A1A1A]">
            ₹{project.budget_min}–{project.budget_max}L
          </div>
        </div>
      </div>
    </div>
  );
}

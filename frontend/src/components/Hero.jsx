import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#FCFAF7] text-[#1A1A1A] border-b border-[#E5E1DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left Editorial Copy Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 z-10">
          <div className="space-y-4">
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold block">
              Architecture & Interiors
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.1] italic text-[#1A1A1A] tracking-tight">
              Spaces Designed Around Your Life.
            </h1>
            <p className="text-base sm:text-lg text-[#6B635B] font-light max-w-lg leading-relaxed pt-2">
              Thoughtful interiors, timeless design, and beautiful spaces crafted around the way you live. Discover the harmony of architectural precision and human comfort.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => navigate('/projects')}
              className="bg-[#1A1A1A] text-white px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors duration-200 cursor-pointer shadow-sm flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/consultation')}
              className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 text-xs uppercase tracking-widest font-bold hover:border-[#C5A059] hover:text-[#C5A059] transition-colors duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>Book Free Consultation</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>

          {/* Architectural City Index */}
          <div className="pt-6 border-t border-[#E5E1DA] flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-[#8C7A6B] font-medium">
            {['Ahmedabad', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad'].map((city, i, arr) => (
              <React.Fragment key={city}>
                <span>{city}</span>
                {i < arr.length - 1 && <span className="text-[#C0B7AB]">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Architectural Layered Composition */}
        <div className="w-full lg:w-1/2 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center">
          {/* Offset architectural background panel */}
          <div className="absolute inset-4 sm:inset-8 bg-[#F5F2ED] border border-[#E5E1DA]" />

          {/* Primary High-Contrast Interior Frame */}
          <div className="relative w-full max-w-lg h-[340px] sm:h-[420px] shadow-2xl overflow-hidden border border-[#E5E1DA] z-10">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=85&w=1200"
              alt="CasaCraft Minimalist Haven — luxury interior design"
              className="w-full h-full object-cover"
            />
            {/* Floating Project Label */}
            <div className="absolute bottom-0 right-0 bg-[#C5A059] p-5 sm:p-6 text-white max-w-xs">
              <p className="text-[10px] uppercase tracking-widest opacity-90 font-medium">Latest Signature Work</p>
              <p className="text-base sm:text-xl font-serif font-normal mt-0.5">The Minimalist Haven, Bangalore</p>
            </div>
          </div>

          {/* Award Badge */}
          <div className="absolute -bottom-4 -left-2 sm:bottom-4 sm:left-4 w-32 h-32 sm:w-36 sm:h-36 border border-[#C5A059] bg-[#FCFAF7] flex flex-col items-center justify-center p-3 text-center z-20 shadow-md">
            <span className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] leading-none">01</span>
            <span className="text-[9px] uppercase tracking-widest text-[#8C7A6B] mt-2 font-bold leading-tight">
              Award Winning Studio 2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

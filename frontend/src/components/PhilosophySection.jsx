import React from 'react';
import { Compass, Sparkles, Feather, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PhilosophySection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2ED] border-b border-[#E5E1DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-xl border border-[#E5E1DA]">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="CasaCraft Design Philosophy Interior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Inset Detail Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#1A1A1A] text-[#FAF8F5] p-5 sm:p-6 max-w-xs shadow-2xl border border-[#C5A059]">
              <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
                Material Authenticity
              </span>
              <p className="text-xs text-[#D8CCC0] font-light leading-relaxed">
                Zero synthetic foils. We work with genuine Burma teak, hand-worked brass, and quarried travertine that age with dignity.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 mt-8 lg:mt-0">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#C5A059]" />
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold">
                Our Design Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-[1.15]">
              Architecture that listens to how you actually live.
            </h2>

            <p className="text-sm sm:text-base text-[#6B635B] font-light leading-relaxed">
              We reject cookie-cutter catalogue trends. True interior architecture starts from the floor plan: studying the path of morning sunlight into your breakfast table, the ergonomics of Indian cooking, and how to create quiet sanctuary zones for multi-generational families.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: Compass, title: 'Spatial Precision', desc: 'Centimeter-accurate millimeter drawings eliminate site guesswork.' },
                { icon: Feather, title: 'Vastu Harmony', desc: 'Balancing fire, water and earth elements with subtle modern aesthetics.' },
                { icon: Sparkles, title: 'Layered Lighting', desc: 'Warm 3000K mood, task, and architectural cove illumination.' },
                { icon: Shield, title: 'Factory Built Joinery', desc: 'German CNC edge-banding with zero on-site carpenter dust and delays.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#FCFAF7] text-[#C5A059] shrink-0 border border-[#E5E1DA]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-normal text-[#1A1A1A]">{title}</h4>
                    <p className="text-xs text-[#7A7268] font-light mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/about')}
                className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#C5A059] inline-flex items-center gap-2 border-b-2 border-[#1A1A1A] hover:border-[#C5A059] pb-1 transition-all cursor-pointer"
              >
                <span>Read More About Our Craft & Team</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

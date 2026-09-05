import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import BeforeAfterSlider from './BeforeAfterSlider';
import { useNavigate } from 'react-router-dom';

const cases = [
  {
    title: '3 BHK Living & Dining Transformation, Ahmedabad',
    desc: 'Converted a dark, compartmentalized hallway into a sunlit open-concept living space with Italian botticino marble floors and custom acoustic wall paneling.',
    before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    location: 'Bodakdev, Ahmedabad',
    duration: '42 Days',
  },
  {
    title: 'Luxury Minimalist Penthouse Kitchen, Bangalore',
    desc: 'Transformed an outdated builder-grade kitchen into an ultra-sleek culinary studio featuring anti-scratch acrylic shutters and quartz waterfall counters.',
    before: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
    location: 'Indiranagar, Bangalore',
    duration: '38 Days',
  },
  {
    title: 'Warm Scandinavian Master Suite, Mumbai',
    desc: 'Redesigned a standard builder bedroom with fluted oak wood headboard, concealed walk-in wardrobe and ambient magnetic track lights.',
    before: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    location: 'Worli, Mumbai',
    duration: '35 Days',
  },
];

export default function TransformationSection() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(0);
  const current = cases[selectedCase];

  return (
    <section className="py-20 lg:py-28 bg-[#F5F2ED] border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          category="Real Transformations"
          title="See The CasaCraft Difference"
          subtitle="Drag the interactive slider horizontally to witness how bare civil shells transform into sanctuaries of living art."
        />

        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {cases.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCase(idx)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest font-bold border transition-colors cursor-pointer ${
                selectedCase === idx
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#FCFAF7] text-[#1A1A1A] border-[#E5E1DA] hover:border-[#C5A059]'
              }`}
            >
              {c.location}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8">
            <BeforeAfterSlider
              beforeImage={current.before}
              afterImage={current.after}
              beforeLabel="Before Renovation"
              afterLabel="CasaCraft Finished Residence"
            />
          </div>

          <div className="lg:col-span-4 space-y-5 bg-[#FCFAF7] p-6 sm:p-8 border border-[#E5E1DA]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#8C7A6B]">
              <span>Case Study #{selectedCase + 1}</span>
              <span>·</span>
              <span className="text-[#C5A059]">{current.duration} Handover</span>
            </div>

            <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal leading-snug">
              {current.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#6B635B] font-light leading-relaxed">
              {current.desc}
            </p>

            <div className="pt-3 border-t border-[#E5E1DA]">
              <button
                onClick={() => navigate('/projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors"
              >
                View Full Case Study
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

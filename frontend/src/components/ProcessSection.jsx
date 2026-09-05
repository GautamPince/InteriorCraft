import React from 'react';
import { Compass, Palette, Wrench, KeyRound } from 'lucide-react';
import SectionHeading from './SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Discovery & VR Walkthrough',
    desc: 'We map your lifestyle habits, family routines, and storage count. You explore your future home in immersive 3D virtual reality before civil work starts.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Material Studio Curation',
    desc: 'Touch and feel full-size samples of Italian marble slabs, fluted glass, custom hardware, and stain-resistant fabric weaves at our Experience Centre.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Precision Factory Fabrication',
    desc: 'Cabinetry is precision-cut using German Homag CNC machinery with zero-joint edge banding. Eliminates on-site wood dust and human error.',
    icon: Wrench,
  },
  {
    number: '04',
    title: '45-Day Handover & Warranty',
    desc: 'Our site engineers manage deep cleaning, snag lists, and installation. We hand over the keys with an official 10-year warranty certificate.',
    icon: KeyRound,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FCFAF7] border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          category="Execution Blueprint"
          title="How We Deliver Architectural Excellence"
          subtitle="A transparent, milestone-driven process engineered to eliminate anxiety and deliver on time."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#F5F2ED] p-6 sm:p-8 border border-[#E5E1DA] flex flex-col justify-between relative group hover:border-[#C5A059] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-normal text-[#C5A059]">
                      {step.number}
                    </span>
                    <div className="p-2.5 bg-[#FCFAF7] text-[#1A1A1A] border border-[#E5E1DA] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A] mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B635B] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

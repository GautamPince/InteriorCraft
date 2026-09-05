import React from 'react';
import { Award, Briefcase, Users, HeartHandshake } from 'lucide-react';

const stats = [
  {
    value: '500+',
    label: 'Completed Projects',
    sub: 'Across luxury apartments, penthouses & villas',
    icon: Briefcase,
  },
  {
    value: '10+',
    label: 'Years Experience',
    sub: 'Mastering Indian architectural sensibilities',
    icon: Award,
  },
  {
    value: '25+',
    label: 'Design Experts',
    sub: 'Senior architects, civil engineers & lighting stylists',
    icon: Users,
  },
  {
    value: '98%',
    label: 'Happy Clients',
    sub: 'Verified 4.9-star average across Google & Houzz',
    icon: HeartHandshake,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[#F5F2ED] border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#E5E1DA] items-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col justify-center ${idx > 0 ? 'lg:pl-8' : ''} py-2`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-serif text-3xl sm:text-4xl text-[#C5A059] tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A] opacity-80">
                  {stat.label}
                </span>
                <span className="text-xs text-[#6B635B] font-light mt-0.5 leading-relaxed hidden sm:block">
                  {stat.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

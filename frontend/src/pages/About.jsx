import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, ShieldCheck, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  return (
    <div className="pt-28 pb-20 space-y-20">
      
      {/* Header Banner */}
      <section className="bg-cream-dark border-b border-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">About CasaCraft</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">
            Crafting Timeless Indian Sanctuaries
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-charcoal/70 font-light leading-relaxed">
            Founded with a vision to revolutionize interior architecture across India through transparent pricing, marine-grade craftsmanship, and timeless aesthetics.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Our Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              A Balance of Heritage Warmth & Modern Precision
            </h2>
            <p className="text-sm text-charcoal/80 font-light leading-relaxed">
              CasaCraft was born out of a passion to bridge the gap between abstract architectural vision and real-world site execution in Indian homes. We understand that Indian homes require specialized considerations: heavy cooking demands moisture-resistant ply, intense sun requires heat-reflective drapes, and family gatherings require versatile living room layouts.
            </p>
            <p className="text-sm text-charcoal/80 font-light leading-relaxed">
              Over the last decade, our team of 25+ designers and site engineers has completed over 500 turnkey interior projects across Ahmedabad, Bangalore, Mumbai, Delhi, Patna, Pune, and Jaipur.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="CasaCraft Studio Work"
              className="w-full aspect-[4/5] object-cover border border-beige shadow-subtle"
            />
            <img
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
              alt="CasaCraft Interior Detail"
              className="w-full aspect-[4/5] object-cover border border-beige shadow-subtle mt-8"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-charcoal text-cream py-16 border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-serif text-4xl font-bold text-gold">500+</p>
            <p className="text-xs uppercase tracking-wider text-cream/70 mt-1">Projects Delivered</p>
          </div>
          <div>
            <p className="font-serif text-4xl font-bold text-gold">10+</p>
            <p className="text-xs uppercase tracking-wider text-cream/70 mt-1">Years of Excellence</p>
          </div>
          <div>
            <p className="font-serif text-4xl font-bold text-gold">25+</p>
            <p className="text-xs uppercase tracking-wider text-cream/70 mt-1">Design Architects</p>
          </div>
          <div>
            <p className="font-serif text-4xl font-bold text-gold">98%</p>
            <p className="text-xs uppercase tracking-wider text-cream/70 mt-1">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Core Principles"
          title="Why Homeowners Trust CasaCraft"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-cream-light border border-beige p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-charcoal text-gold mx-auto flex items-center justify-center rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">10-Year Warranty</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              Every modular cabinet, wardrobe hinge, and drawer slide is covered by our comprehensive 10-year official warranty certificate.
            </p>
          </div>

          <div className="bg-cream-light border border-beige p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-charcoal text-gold mx-auto flex items-center justify-center rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">45-Day Delivery</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              Off-site automated factory precision allows us to guarantee site installation and key handover within 45 days.
            </p>
          </div>

          <div className="bg-cream-light border border-beige p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-charcoal text-gold mx-auto flex items-center justify-center rounded-full">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">Transparent Pricing</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              Detailed BOQ (Bill of Quantities) with zero hidden charges. You know the exact cost of every hinge, slab, and panel before work begins.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

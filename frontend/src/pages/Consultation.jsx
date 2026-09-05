import React from 'react';
import ConsultationForm from '../components/ConsultationForm';
import { ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';

export default function Consultation() {
  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Banner */}
      <section className="bg-cream-dark border-b border-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">Complimentary Session</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">
            Book Free Interior Consultation
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-charcoal/70 font-light leading-relaxed">
            Collaborate with our senior interior architects to plan your home layout, material selection, and BOQ budget estimate.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">What to Expect</span>
              <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Your 45-Minute Session</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-cream-light border border-beige p-5 flex items-start space-x-3 text-xs text-charcoal">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold font-serif text-sm text-charcoal">1. Floor Plan Analysis</h4>
                  <p className="text-charcoal/70 font-light mt-1">Review of architectural layout, sunlight orientation, and furniture placement.</p>
                </div>
              </div>

              <div className="bg-cream-light border border-beige p-5 flex items-start space-x-3 text-xs text-charcoal">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold font-serif text-sm text-charcoal">2. Material & Hardware Selection</h4>
                  <p className="text-charcoal/70 font-light mt-1">Hands-on inspection of marine ply grades, Hettich hinges, acrylic finishes, and quartz tops.</p>
                </div>
              </div>

              <div className="bg-cream-light border border-beige p-5 flex items-start space-x-3 text-xs text-charcoal">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold font-serif text-sm text-charcoal">3. Transparent BOQ Estimate</h4>
                  <p className="text-charcoal/70 font-light mt-1">Receive an itemized cost estimate matching your specific budget tier.</p>
                </div>
              </div>
            </div>

            <div className="bg-charcoal text-cream p-6 border border-gold/40 space-y-2">
              <p className="font-serif italic text-sm text-gold">"Zero pressure, 100% architectural transparency."</p>
              <p className="text-[10px] uppercase text-cream/70 tracking-wider">— CasaCraft Design Team</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>

        </div>
      </section>

    </div>
  );
}

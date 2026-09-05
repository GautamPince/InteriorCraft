import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Award, Clock, Shield } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-[#8C8377]">
      {/* Trust Bar */}
      <div className="border-b border-[#282522]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#272422] text-[#C5A059] shrink-0 border border-[#3A3632]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[#FAF8F5] text-sm font-serif font-normal">10-Year Warranty</h4>
              <p className="text-xs text-[#8C8377] mt-1 leading-relaxed">
                Every project includes an official CasaCraft 10-year structural warranty on all joinery work.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#272422] text-[#C5A059] shrink-0 border border-[#3A3632]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[#FAF8F5] text-sm font-serif font-normal">45-Day Handover</h4>
              <p className="text-xs text-[#8C8377] mt-1 leading-relaxed">
                Guaranteed move-in timeline with penalty clause for complete home projects.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#272422] text-[#C5A059] shrink-0 border border-[#3A3632]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[#FAF8F5] text-sm font-serif font-normal">No Hidden Costs</h4>
              <p className="text-xs text-[#8C8377] mt-1 leading-relaxed">
                Fixed transparent quotation with itemized Indian GST and material specifications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#C5A059] rotate-45 shrink-0" />
              <span className="font-serif text-2xl text-[#FAF8F5] uppercase tracking-tighter font-bold">
                CasaCraft
              </span>
            </div>
            <p className="text-xs text-[#8C8377] leading-relaxed max-w-sm font-light">
              Thoughtful interiors, timeless design, and beautiful spaces crafted around the way you live. Tailored for modern Indian residences with architectural precision and human comfort.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-[#C7BEB3]">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#C7BEB3]">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>concierge@casacraft.in</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#C7BEB3]">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Level 4, Signature Pavilion, SG Highway, Ahmedabad, Gujarat 380054</span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FAF8F5] font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Featured Projects', path: '/projects' },
                { label: 'Design Services', path: '/services' },
                { label: 'Design Inspiration & Blog', path: '/design-ideas' },
                { label: 'Our Philosophy & Story', path: '/about' },
                { label: 'Contact & Experience Centres', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => navigate(path)}
                    className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FAF8F5] font-semibold mb-4">Specialized Rooms</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Complete Home Interiors', slug: 'complete-home-interiors' },
                { label: 'Modular Indian Kitchens', slug: 'modular-kitchen' },
                { label: 'Living Room Lounges', slug: 'living-room' },
                { label: 'Master Bedroom Suites', slug: 'master-bedroom' },
                { label: 'Lighting & False Ceiling', slug: 'lighting-false-ceiling' },
              ].map(({ label, slug }) => (
                <li key={slug}>
                  <button
                    onClick={() => navigate(`/services/${slug}`)}
                    className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Design Studios */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FAF8F5] font-semibold mb-4">Design Studios</h4>
            <ul className="space-y-3 text-xs">
              {[
                { city: 'Ahmedabad', areas: 'SG Highway & Sindhu Bhavan' },
                { city: 'Bangalore', areas: 'Indiranagar & Whitefield' },
                { city: 'Mumbai', areas: 'Worli & Bandra West' },
                { city: 'Delhi NCR', areas: 'GK II & Golf Course Road' },
              ].map(({ city, areas }) => (
                <li key={city}>
                  <span className="text-[#FAF8F5] font-medium">{city}</span>
                  <p className="text-[11px] text-[#7A7268]">{areas}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#282522] flex flex-col sm:flex-row justify-between items-center text-xs text-[#7A7268] gap-4 pb-8">
          <div>© {year} CasaCraft Interiors Private Limited. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/consultation')} className="hover:text-[#FAF8F5] transition-colors">
              Book Consultation
            </button>
            <span>·</span>
            <button onClick={() => navigate('/about')} className="hover:text-[#FAF8F5] transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => navigate('/login')} className="hover:text-[#FAF8F5] transition-colors">
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

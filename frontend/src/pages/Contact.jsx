import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { BRAND_CONFIG } from '../services/config';

export default function Contact() {
  const cleanNumber = BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Banner */}
      <section className="bg-cream-dark border-b border-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">Get in Touch</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">
            Visit Our Design Studio
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-charcoal/70 font-light leading-relaxed">
            Reach out to discuss your architectural space planning or drop by our studio in Ahmedabad.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">Direct Communication</span>
              <h2 className="font-serif text-2xl font-bold text-charcoal mt-1">Contact Information</h2>
            </div>

            <div className="space-y-6">
              
              <div className="bg-cream-light border border-beige p-5 flex items-start space-x-4">
                <div className="w-10 h-10 bg-charcoal text-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal">Studio Address</h4>
                  <p className="text-xs text-charcoal/70 font-light mt-1">{BRAND_CONFIG.officeAddress}</p>
                </div>
              </div>

              <div className="bg-cream-light border border-beige p-5 flex items-start space-x-4">
                <div className="w-10 h-10 bg-charcoal text-gold flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal">Phone Enquiry</h4>
                  <p className="text-xs text-charcoal/70 font-light mt-1">{BRAND_CONFIG.phone}</p>
                </div>
              </div>

              <div className="bg-cream-light border border-beige p-5 flex items-start space-x-4">
                <div className="w-10 h-10 bg-charcoal text-gold flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal">Email Studio</h4>
                  <p className="text-xs text-charcoal/70 font-light mt-1">{BRAND_CONFIG.email}</p>
                </div>
              </div>

              <div className="bg-cream-light border border-beige p-5 flex items-start space-x-4">
                <div className="w-10 h-10 bg-charcoal text-gold flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal">Studio Hours</h4>
                  <p className="text-xs text-charcoal/70 font-light mt-1">{BRAND_CONFIG.workingHours}</p>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#25D366] text-white p-4 text-center font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Chat Instantly on WhatsApp
              </a>

            </div>
          </div>

          {/* Contact Form & Google Map Embed */}
          <div className="lg:col-span-7 space-y-8">
            <ContactForm />

            {/* Google Map */}
            <div className="border border-beige overflow-hidden shadow-subtle aspect-[16/9] bg-beige/30">
              <iframe
                title="CasaCraft Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.697926291696!2d72.5073!3d23.0347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzA0LjkiTiA3MsKwMzAnMjYuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

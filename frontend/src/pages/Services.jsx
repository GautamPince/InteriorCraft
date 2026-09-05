import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import ConsultationForm from '../components/ConsultationForm';
import api from '../services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.success) setServices(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      <section className="bg-cream-dark border-b border-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">Turnkey Solutions</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">
            Our Interior Services
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-charcoal/70 font-light leading-relaxed">
            From complete home interior execution to specialized modular kitchen and living space design.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ConsultationForm />
      </section>

    </div>
  );
}

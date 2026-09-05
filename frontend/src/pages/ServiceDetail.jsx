import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ConsultationForm from '../components/ConsultationForm';
import api from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${slug}`);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          setError("Service not found");
        }
      } catch (err) {
        setError("Unable to load service details");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-charcoal">
        <p className="font-serif text-lg animate-pulse">Loading service specifications...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-charcoal">Service Not Found</h2>
        <p className="text-xs text-charcoal/70">{error || "The requested service offering could not be located."}</p>
        <Link to="/services" className="inline-flex items-center space-x-2 text-xs font-bold text-gold uppercase">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const featureItems = service.features?.items || service.features || [];

  return (
    <div className="bg-[#FCFAF7] pb-20 space-y-0">

      {/* Breadcrumb & Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-10 border-b border-[#E5E1DA]">
        <Breadcrumb items={[
          { label: 'Services', path: '/services' },
          { label: service.name },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059]">
              Starting from {service.starting_price}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1A1A1A]">
              {service.name}
            </h1>
            <p className="text-base text-[#6B635B] font-light leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] overflow-hidden border border-[#E5E1DA] shadow-lg">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features & Specifications */}
      <section className="bg-[#F5F2ED] py-16 border-y border-[#E5E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-6">Key Specifications & Inclusions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureItems.map((feat, idx) => (
              <div key={idx} className="bg-[#FCFAF7] border border-[#E5E1DA] p-4 flex items-center gap-3 text-xs text-[#524B44]">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Booking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <ConsultationForm />
      </section>

    </div>
  );
}

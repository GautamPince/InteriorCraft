import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid 10-digit mobile number required').max(15),
  email: z.string().email('Valid email address required'),
  city: z.string().min(2, 'City name required'),
  property_type: z.string().min(1, 'Please select property type'),
  property_size: z.string().min(1, 'Please select property size'),
  bedrooms: z.string().min(1, 'Please select bedrooms'),
  budget: z.string().min(1, 'Please select budget range'),
  design_style: z.string().min(1, 'Please select preferred design style'),
  preferred_contact_method: z.string().min(1, 'Select contact method'),
  message: z.string().optional(),
});

export default function ConsultationForm({ compact = false }) {
  const [serverMessage, setServerMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      property_type: 'Apartment',
      bedrooms: '3 BHK',
      budget: '₹10–20 Lakh',
      design_style: 'Modern',
      preferred_contact_method: 'WhatsApp',
    },
  });

  const onSubmit = async (data) => {
    setServerMessage(null);
    setErrorMessage(null);
    try {
      const res = await api.post('/consultations', data);
      if (res.success) {
        setServerMessage(res.message || 'Thank you! Our design expert will contact you shortly.');
        reset();
      } else {
        setErrorMessage(res.message || 'Unable to submit consultation form.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Your consultation request could not be submitted.');
    }
  };

  return (
    <div className="bg-cream-light border border-beige p-6 sm:p-8 shadow-elevated relative">
      <div className="mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
          Complimentary Consultation
        </span>
        <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">
          Book Your Design Session
        </h3>
        <p className="text-xs text-charcoal/70 mt-1 font-light">
          Share your project details with our senior interior architects for personalized guidance.
        </p>
      </div>

      {serverMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{serverMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Vikram Sharma"
              {...register('name')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors"
            />
            {errors.name && <p className="text-[10px] text-rose-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              {...register('phone')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors"
            />
            {errors.phone && <p className="text-[10px] text-rose-600 mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Email & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
            <input
              type="email"
              placeholder="e.g. vikram@example.com"
              {...register('email')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors"
            />
            {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">City *</label>
            <input
              type="text"
              placeholder="e.g. Ahmedabad, Bangalore"
              {...register('city')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors"
            />
            {errors.city && <p className="text-[10px] text-rose-600 mt-1">{errors.city.message}</p>}
          </div>
        </div>

        {/* Property Type & Bedrooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Property Type *</label>
            <select
              {...register('property_type')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Independent House">Independent House</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Bedrooms / Configuration *</label>
            <select
              {...register('bedrooms')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors cursor-pointer"
            >
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK+">4 BHK+</option>
            </select>
          </div>
        </div>

        {/* Size & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Approx. Size (Sq. Ft.) *</label>
            <input
              type="text"
              placeholder="e.g. 1500 sqft"
              {...register('property_size')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors"
            />
            {errors.property_size && <p className="text-[10px] text-rose-600 mt-1">{errors.property_size.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Budget Expectation *</label>
            <select
              {...register('budget')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Under ₹5 Lakh">Under ₹5 Lakh</option>
              <option value="₹5–10 Lakh">₹5–10 Lakh</option>
              <option value="₹10–20 Lakh">₹10–20 Lakh</option>
              <option value="₹20–40 Lakh">₹20–40 Lakh</option>
              <option value="₹40 Lakh+">₹40 Lakh+</option>
            </select>
          </div>
        </div>

        {/* Style & Preferred Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Preferred Design Style *</label>
            <select
              {...register('design_style')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Modern">Modern</option>
              <option value="Luxury">Luxury</option>
              <option value="Minimal">Minimal</option>
              <option value="Contemporary">Contemporary</option>
              <option value="Scandinavian">Scandinavian</option>
              <option value="Traditional">Traditional</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Preferred Contact Method *</label>
            <select
              {...register('preferred_contact_method')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors cursor-pointer"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone">Phone Call</option>
              <option value="Email">Email</option>
            </select>
          </div>
        </div>

        {/* Optional Message */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">Special Requirements / Message</label>
          <textarea
            rows={3}
            placeholder="Tell us about your home layout, floor plan status, or preferred timelines..."
            {...register('message')}
            className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-charcoal text-cream py-3.5 px-6 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-gold" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <span>Schedule Free Consultation</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

      </form>
    </div>
  );
}

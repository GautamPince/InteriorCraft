import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export default function ContactForm() {
  const [serverMessage, setServerMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setServerMessage(null);
    setErrorMessage(null);
    try {
      const res = await api.post('/contact', data);
      if (res.success) {
        setServerMessage(res.message || 'Your message has been sent successfully.');
        reset();
      } else {
        setErrorMessage(res.message || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit contact message.');
    }
  };

  return (
    <div className="bg-cream-light border border-beige p-6 sm:p-8 shadow-subtle">
      <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Send Us a Message</h3>
      <p className="text-xs text-charcoal/70 mb-6 font-light">
        Have questions about our project timeline or custom woodwork? Fill out the form below.
      </p>

      {serverMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{serverMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Your Name *</label>
            <input
              type="text"
              placeholder="e.g. Rahul Verma"
              {...register('name')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none"
            />
            {errors.name && <p className="text-[10px] text-rose-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
            <input
              type="email"
              placeholder="e.g. rahul@example.com"
              {...register('email')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none"
            />
            {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              {...register('phone')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none"
            />
            {errors.phone && <p className="text-[10px] text-rose-600 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Subject *</label>
            <input
              type="text"
              placeholder="e.g. 3BHK Turnkey Interior Query"
              {...register('subject')}
              className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none"
            />
            {errors.subject && <p className="text-[10px] text-rose-600 mt-1">{errors.subject.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">Message *</label>
          <textarea
            rows={4}
            placeholder="Type your inquiry here..."
            {...register('message')}
            className="w-full bg-cream border border-beige focus:border-gold px-3.5 py-2 text-xs text-charcoal focus:outline-none"
          />
          {errors.message && <p className="text-[10px] text-rose-600 mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-charcoal text-cream py-3 px-6 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin text-gold" />
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

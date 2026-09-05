import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-[#FCFAF7] p-6 sm:p-8 border border-[#E5E1DA] flex flex-col justify-between relative shadow-sm">
      <Quote className="w-8 h-8 text-[#E5E1DA] absolute top-6 right-6" />

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'fill-[#C5A059] text-[#C5A059]' : 'text-[#E5E1DA]'
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm sm:text-base text-[#1A1A1A] font-light leading-relaxed mb-6 italic">
          "{testimonial.review || testimonial.quote}"
        </p>
      </div>

      {/* Client Profile */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-[#E5E1DA]">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar || testimonial.avatar_url}
            alt={testimonial.client_name}
            className="w-11 h-11 object-cover border border-[#C5A059]/40"
          />
        )}
        <div className="overflow-hidden">
          <h4 className="font-serif text-sm font-medium text-[#1A1A1A] truncate">
            {testimonial.client_name}
          </h4>
          <p className="text-xs text-[#8C7A6B] truncate">
            {testimonial.property_type || testimonial.project_title} · {testimonial.city}
          </p>
        </div>
      </div>
    </div>
  );
}

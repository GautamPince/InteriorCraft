import React from 'react';

/**
 * Flexible section heading used throughout the site.
 * Supports both old (tag/align/dark) and new (category/alignment) prop conventions.
 */
export default function SectionHeading({ title, subtitle, tag, category, align, alignment, dark = false, className = '' }) {
  const tagText = category || tag;
  const isCenter = (alignment || align) === 'center';

  return (
    <div className={`space-y-3 mb-12 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}>
      {tagText && (
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A059] block">
          {tagText}
        </span>
      )}

      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15] ${dark ? 'text-white' : 'text-[#1A1A1A]'}`}>
        {title}
      </h2>

      <div className={`w-12 h-[1.5px] bg-[#C5A059] ${isCenter ? 'mx-auto' : ''}`} />

      {subtitle && (
        <p className={`text-sm sm:text-base font-light leading-relaxed ${dark ? 'text-gray-400' : 'text-[#6B635B]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

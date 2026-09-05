import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function FilterBar({
  cities = [],
  styles = [],
  propertyTypes = [],
  selectedCity,
  selectedStyle,
  selectedPropertyType,
  searchQuery,
  onCityChange,
  onStyleChange,
  onPropertyTypeChange,
  onSearchChange,
  onReset
}) {
  const hasActiveFilters = selectedCity || selectedStyle || selectedPropertyType || searchQuery;

  return (
    <div className="bg-cream-light border border-beige p-4 sm:p-5 shadow-subtle space-y-4 mb-8">
      <div className="flex items-center justify-between pb-3 border-b border-beige">
        <div className="flex items-center space-x-2 text-charcoal">
          <Filter className="w-4 h-4 text-gold" />
          <span className="font-serif text-sm font-bold uppercase tracking-wider">Refine Portfolio</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center space-x-1 text-xs text-soft-brown hover:text-charcoal transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-soft-brown absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or locations..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-cream border border-beige focus:border-gold pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none"
          />
        </div>

        {/* City Filter */}
        <select
          value={selectedCity || ''}
          onChange={(e) => onCityChange(e.target.value)}
          className="bg-cream border border-beige focus:border-gold px-3 py-2 text-xs text-charcoal focus:outline-none cursor-pointer"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        {/* Style Filter */}
        <select
          value={selectedStyle || ''}
          onChange={(e) => onStyleChange(e.target.value)}
          className="bg-cream border border-beige focus:border-gold px-3 py-2 text-xs text-charcoal focus:outline-none cursor-pointer"
        >
          <option value="">All Design Styles</option>
          {styles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>

        {/* Property Type Filter */}
        <select
          value={selectedPropertyType || ''}
          onChange={(e) => onPropertyTypeChange(e.target.value)}
          className="bg-cream border border-beige focus:border-gold px-3 py-2 text-xs text-charcoal focus:outline-none cursor-pointer"
        >
          <option value="">All Property Types</option>
          {propertyTypes.map((ptype) => (
            <option key={ptype} value={ptype}>{ptype}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

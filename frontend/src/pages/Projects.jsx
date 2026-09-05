import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import api from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['Ahmedabad', 'Bangalore', 'Mumbai', 'Delhi', 'Patna', 'Pune', 'Jaipur', 'Hyderabad', 'Kochi', 'Surat'];
  const styles = ['Modern', 'Luxury', 'Minimal', 'Contemporary', 'Scandinavian', 'Traditional', 'Industrial'];
  const propertyTypes = ['Apartment', 'Villa', 'Independent House', 'Penthouse', 'Studio'];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = `/projects?page=${page}&limit=12`;
        if (selectedCity) url += `&city=${encodeURIComponent(selectedCity)}`;
        if (selectedStyle) url += `&style=${encodeURIComponent(selectedStyle)}`;
        if (selectedPropertyType) url += `&property_type=${encodeURIComponent(selectedPropertyType)}`;
        if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

        const res = await api.get(url);
        if (res.success && res.data) {
          setProjects(res.data.items || []);
          setPages(res.data.pages || 1);
          setTotal(res.data.total || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, selectedCity, selectedStyle, selectedPropertyType, searchQuery]);

  const handleReset = () => {
    setSelectedCity('');
    setSelectedStyle('');
    setSelectedPropertyType('');
    setSearchQuery('');
    setPage(1);
  };

  return (
    <div className="pt-28 pb-20 space-y-12">
      
      {/* Header Banner */}
      <section className="bg-cream-dark border-b border-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">Architectural Portfolio</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">
            Crafted Homes & Residences
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-charcoal/70 font-light leading-relaxed">
            Explore our architectural design projects completed across India. Filter by city, design style, or property configuration.
          </p>
        </div>
      </section>

      {/* Filter Bar & Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterBar
          cities={cities}
          styles={styles}
          propertyTypes={propertyTypes}
          selectedCity={selectedCity}
          selectedStyle={selectedStyle}
          selectedPropertyType={selectedPropertyType}
          searchQuery={searchQuery}
          onCityChange={(v) => { setSelectedCity(v); setPage(1); }}
          onStyleChange={(v) => { setSelectedStyle(v); setPage(1); }}
          onPropertyTypeChange={(v) => { setSelectedPropertyType(v); setPage(1); }}
          onSearchChange={(v) => { setSearchQuery(v); setPage(1); }}
          onReset={handleReset}
        />

        {loading ? (
          <div className="text-center py-20">
            <p className="font-serif text-lg text-charcoal animate-pulse">Loading projects portfolio...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-cream-light border border-beige p-12 text-center space-y-4 my-8">
            <h3 className="font-serif text-xl font-bold text-charcoal">No Matching Projects Found</h3>
            <p className="text-xs text-charcoal/70">Try adjusting your search criteria or resetting filters.</p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-charcoal text-cream text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <Pagination
              page={page}
              pages={pages}
              onPageChange={(p) => setPage(p)}
            />
          </>
        )}
      </section>

    </div>
  );
}

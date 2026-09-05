import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, BedDouble, Maximize2, Check, Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ImageGallery from '../components/ImageGallery';
import ProjectCard from '../components/ProjectCard';
import api from '../services/api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/projects/${slug}`);
        if (res.success && res.data) {
          setProject(res.data);
          const relRes = await api.get(`/projects?city=${encodeURIComponent(res.data.city)}&limit=4`);
          if (relRes.success && relRes.data) {
            setRelatedProjects((relRes.data.items || []).filter((p) => p.id !== res.data.id).slice(0, 3));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="font-serif text-lg text-[#1A1A1A] animate-pulse">Loading project gallery & specs...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-normal text-[#1A1A1A]">Project Not Found</h2>
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  // Build gallery images array for ImageGallery component
  const galleryImages = [
    {
      id: 'cover',
      image_url: project.cover_image,
      alt_text: `${project.title} — Cover`,
      sort_order: 0,
      caption: `${project.title}, ${project.location}`,
    },
    ...(project.images || []).map((img, i) => ({
      id: img.id || `img-${i}`,
      image_url: img.image_url,
      alt_text: img.alt_text || `${project.title} — View ${i + 1}`,
      sort_order: i + 1,
      caption: img.alt_text,
    })),
  ];

  const materials = project.materials_used || project.materials || [
    'Italian Botticino Marble Flooring',
    'BWP Marine Ply with Acrylic Shutters',
    'Natural Oak Veneer Wall Paneling',
    'Champagne Gold Brass Inlays',
    'Magnetic Track Lighting System',
  ];

  const palette = project.color_palette || [
    { name: 'Cream', hex: '#FDFBF7' },
    { name: 'Warm Beige', hex: '#EFE6D5' },
    { name: 'Soft Brown', hex: '#8C7A6B' },
    { name: 'Charcoal', hex: '#1A1918' },
    { name: 'Gold', hex: '#D4AF37' },
  ];

  return (
    <div className="bg-[#FCFAF7]">

      {/* Breadcrumb & Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <Breadcrumb items={[
          { label: 'Projects', path: '/projects' },
          { label: project.title },
        ]} />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E1DA]">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#1A1A1A] text-[#C5A059] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                {project.city}
              </span>
              <span className="bg-[#F5F2ED] text-[#1A1A1A] text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 border border-[#E5E1DA]">
                {project.design_style}
              </span>
              <span className="text-xs text-[#8C7A6B] font-serif italic">{project.property_type}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
              {project.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#8C7A6B] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>{project.location}</span>
            </p>
          </div>

          {/* Quick Specs */}
          <div className="bg-[#F5F2ED] border border-[#E5E1DA] p-5 sm:p-6 grid grid-cols-3 gap-5 text-xs shrink-0 min-w-[280px]">
            <div>
              <span className="text-[10px] uppercase text-[#8C7A6B] block font-normal">Area</span>
              <span className="font-serif text-lg text-[#C5A059]">{project.area_sqft?.toLocaleString()}</span>
              <span className="text-[10px] text-[#8C7A6B]"> sq.ft</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#8C7A6B] block font-normal">Bedrooms</span>
              <span className="font-serif text-lg text-[#C5A059]">{project.bedrooms}</span>
              <span className="text-[10px] text-[#8C7A6B]"> BHK</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#8C7A6B] block font-normal">Timeline</span>
              <span className="font-serif text-lg text-[#C5A059]">{project.timeline_weeks || 6}</span>
              <span className="text-[10px] text-[#8C7A6B]"> wks</span>
            </div>
            <div className="col-span-3 pt-3 border-t border-[#E5E1DA]">
              <span className="text-[10px] uppercase text-[#8C7A6B] block font-normal">Budget Range</span>
              <span className="font-serif text-base text-[#1A1A1A]">
                ₹{project.budget_min}–{project.budget_max} Lakh
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <ImageGallery images={galleryImages} />
      </section>

      {/* Design Concept & Material Palette */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Description + Materials + Palette */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-4">Design Concept & Execution</h2>
              <p className="text-sm text-[#6B635B] font-light leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Materials */}
              <div className="bg-[#F5F2ED] border border-[#E5E1DA] p-6 space-y-3">
                <h3 className="font-serif text-base font-normal text-[#1A1A1A]">Materials & Textures Used</h3>
                <ul className="space-y-2 text-xs text-[#524B44]">
                  {materials.map((mat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Palette */}
              <div className="bg-[#F5F2ED] border border-[#E5E1DA] p-6 space-y-4">
                <h3 className="font-serif text-base font-normal text-[#1A1A1A]">Color Palette</h3>
                <div className="flex flex-wrap gap-4">
                  {palette.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-10 h-10 rounded-full border border-[#E5E1DA] shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[9px] uppercase font-medium text-[#6B635B]">{color.name}</span>
                    </div>
                  ))}
                </div>

                {/* Before/After if available */}
                {project.before_image && project.after_image && (
                  <div className="pt-4 border-t border-[#E5E1DA]">
                    <p className="text-xs text-[#8C7A6B] uppercase tracking-wider font-semibold mb-2">Before & After</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <img src={project.before_image} alt="Before renovation" className="w-full h-24 object-cover rounded" />
                        <p className="text-[10px] text-center text-[#8C7A6B] mt-1">Before</p>
                      </div>
                      <div>
                        <img src={project.after_image} alt="After renovation" className="w-full h-24 object-cover rounded" />
                        <p className="text-[10px] text-center text-[#8C7A6B] mt-1">After</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Consultation CTA */}
          <div className="lg:col-span-4">
            <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 space-y-6 sticky top-24">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Book a Tour</span>
                <h3 className="font-serif text-xl font-normal mt-1">
                  Love what you see? Let's design yours.
                </h3>
                <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                  Schedule a free 45-minute consultation with our Lead Architect. Get a custom 3D render of your space.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  'Complimentary site visit & measurement',
                  'Custom 3D VR walkthrough',
                  '45-Day guaranteed handover',
                  '10-Year warranty included',
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/consultation')}
                className="w-full py-3.5 bg-[#C5A059] text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#1A1A1A] transition-colors"
              >
                Book Free Consultation
              </button>

              <a
                href="tel:+919876543210"
                className="block text-center text-xs text-gray-400 hover:text-white transition-colors"
              >
                or call +91 98765 43210
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-[#F5F2ED] py-16 border-t border-[#E5E1DA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-normal text-[#1A1A1A]">Similar Projects in {project.city}</h2>
              <Link to="/projects" className="text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:text-[#1A1A1A] transition-colors">
                View All Portfolio
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relProj) => (
                <ProjectCard key={relProj.id} project={relProj} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import StatsSection from '../components/StatsSection';
import PhilosophySection from '../components/PhilosophySection';
import ProcessSection from '../components/ProcessSection';
import TransformationSection from '../components/TransformationSection';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import BlogCard from '../components/BlogCard';
import api from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, servRes, testRes, blogRes] = await Promise.all([
          api.get('/projects?featured=true&limit=3'),
          api.get('/services?limit=4'),
          api.get('/testimonials'),
          api.get('/blog?limit=3'),
        ]);
        if (projRes.success) setFeaturedProjects(projRes.data.items || []);
        if (servRes.success) setServices(servRes.data || []);
        if (testRes.success) setTestimonials(testRes.data || []);
        if (blogRes.success) setRecentBlogs(blogRes.data.items || []);
      } catch (err) {
        console.error('Failed loading homepage data', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-0">

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Key Metrics & Value Badges */}
      <StatsSection />

      {/* 3. Featured Portfolio Projects */}
      <section className="py-20 lg:py-28 bg-[#FCFAF7] border-b border-[#E5E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              category="Curated Portfolio"
              title="Signature Living Residences"
              subtitle="Each space is an intimate dialogue between light, material texture, and architectural functionality."
              alignment="left"
            />
            <button
              onClick={() => navigate('/projects')}
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>View All 500+ Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Design Philosophy */}
      <PhilosophySection />

      {/* 5. Specialized Interior Services */}
      <section className="py-20 lg:py-28 bg-[#FCFAF7] border-b border-[#E5E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            category="End-to-End Capabilities"
            title="Tailored Interior Services"
            subtitle="From modular Indian kitchen ergonomics to full turnkey villa transformations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
            >
              Explore All Design Services
            </button>
          </div>
        </div>
      </section>

      {/* 6. Real Before & After Slider */}
      <TransformationSection />

      {/* 7. Process Section */}
      <ProcessSection />

      {/* 8. Client Reviews & Testimonials */}
      <section className="py-20 lg:py-28 bg-[#FCFAF7] border-b border-[#E5E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            category="Client Stories"
            title="Loved by Discerning Homeowners"
            subtitle="Read experiences from families who trusted CasaCraft to craft their dream sanctuaries."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Latest Design Ideas & Journal */}
      <section className="py-20 lg:py-28 bg-[#F5F2ED] border-b border-[#E5E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              category="Architecture & Trends"
              title="Design Ideas & Journal"
              subtitle="Guides on Vastu, materials, kitchen ergonomics, and luxury interior styling."
              alignment="left"
            />
            <button
              onClick={() => navigate('/design-ideas')}
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {recentBlogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Consultation CTA Banner */}
      <section className="py-20 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold">
            Begin Your Transformation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Ready to design a home that inspires you every day?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Schedule a complimentary 45-minute discovery session with our Lead Interior Architect. Includes a personalized 3D spatial concept and detailed estimate.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/consultation')}
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#C5A059] text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#1A1A1A] transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Complimentary Consultation</span>
            </button>

            <a
              href="tel:+919876543210"
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#C5A059]" />
              <span>Call: +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

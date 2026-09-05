import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import api from '../services/api';

export default function DesignIdeas() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Living Room',
    'Bedroom',
    'Kitchen',
    'Small Homes',
    'Budget Interiors',
    'Color Ideas',
    'Vastu',
    'Lighting',
    'Furniture'
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = `/blog?page=${page}&limit=9`;
        if (category && category !== 'All') {
          url += `&category=${encodeURIComponent(category)}`;
        }
        const res = await api.get(url);
        if (res.success && res.data) {
          setBlogs(res.data.items || []);
          setPages(res.data.pages || 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page, category]);

  return (
    <div className="pt-28 pb-20 space-y-12">
      
      {/* Banner */}
      <section className="bg-cream-dark border-b border-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">Design Journal</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">
            Design Ideas & Inspiration
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-charcoal/70 font-light leading-relaxed">
            Expert articles on modular kitchen planning, Vastu guidelines, small apartment hacks, and lighting aesthetics.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const isSelected = (cat === 'All' && !category) || category === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat === 'All' ? '' : cat);
                  setPage(1);
                }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-charcoal text-gold border-charcoal'
                    : 'bg-cream-light border-beige text-charcoal/70 hover:text-charcoal hover:border-gold'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <p className="font-serif text-lg text-charcoal animate-pulse">Loading design articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-cream-light border border-beige p-12 text-center my-8">
            <h3 className="font-serif text-xl font-bold text-charcoal">No Articles Found</h3>
            <p className="text-xs text-charcoal/70 mt-1">No blog posts currently under "{category}".</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <BlogCard key={post.id} post={post} />
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

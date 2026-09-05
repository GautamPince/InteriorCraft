import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';
import api from '../services/api';

export default function DesignIdeaDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/blog/${slug}`);
        if (res.success && res.data) {
          setPost(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-charcoal">
        <p className="font-serif text-lg animate-pulse">Loading design article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-charcoal">Article Not Found</h2>
        <Link to="/design-ideas" className="inline-flex items-center space-x-2 text-xs font-bold text-gold uppercase">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="pt-28 pb-20 space-y-12">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link to="/design-ideas" className="inline-flex items-center space-x-2 text-xs text-soft-brown hover:text-charcoal transition-colors">
          <ArrowLeft className="w-4 h-4 text-gold" />
          <span>Back to Design Ideas</span>
        </Link>

        <div className="space-y-4">
          <span className="bg-charcoal text-gold text-[10px] uppercase font-bold tracking-wider px-3 py-1">
            {post.category}
          </span>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 text-xs text-soft-brown pt-2 border-t border-beige">
            <span className="flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>{formatDate(post.published_at || post.created_at)}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Cover Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-[16/9] w-full overflow-hidden border border-beige shadow-elevated">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content & Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="prose max-w-none text-charcoal/90 font-light leading-relaxed text-sm sm:text-base space-y-4">
          <p className="font-serif text-lg text-charcoal font-normal italic border-l-2 border-gold pl-4 py-1">
            {post.excerpt}
          </p>
          <div className="whitespace-pre-line pt-4">
            {post.content}
          </div>
        </div>

        <div className="pt-8 border-t border-beige">
          <ConsultationForm compact={true} />
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-cream-light border border-beige flex flex-col justify-between overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300">
      <div>
        <div className="aspect-[16/10] overflow-hidden img-zoom-container relative bg-beige/30">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-charcoal/90 text-gold text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 border border-gold/30">
            {post.category}
          </span>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center space-x-3 text-[11px] text-soft-brown font-medium">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-gold" />
              <span>{formatDate(post.published_at || post.created_at)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <User className="w-3 h-3 text-gold" />
              <span>{post.author}</span>
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-gold transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-xs text-charcoal/70 font-light line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2">
        <Link
          to={`/design-ideas/${post.slug}`}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-gold transition-colors"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-gold" />
        </Link>
      </div>
    </div>
  );
}

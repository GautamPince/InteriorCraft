import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 my-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 border border-beige bg-cream-light text-charcoal disabled:opacity-40 hover:border-gold hover:text-gold transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {[...Array(pages)].map((_, idx) => {
        const pageNum = idx + 1;
        const isCurrent = pageNum === page;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-9 h-9 text-xs font-semibold border transition-colors ${
              isCurrent
                ? 'bg-charcoal text-gold border-charcoal'
                : 'bg-cream-light border-beige text-charcoal hover:border-gold'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="p-2 border border-beige bg-cream-light text-charcoal disabled:opacity-40 hover:border-gold hover:text-gold transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

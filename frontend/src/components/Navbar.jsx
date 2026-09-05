import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, X, Menu, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CostEstimatorModal from './CostEstimatorModal';

const navLinks = [
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'Design Ideas', path: '/design-ideas' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top utility strip */}
      <div className="bg-[#1A1A1A] text-[#A89F91] text-[11px] py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <span>🏆 Award-Winning Studio · Delivering Across 6+ Indian Cities</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCalculatorOpen(true)}
              className="text-[#C5A059] hover:text-white transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3 h-3" />
              <span>Cost Estimator</span>
            </button>
            <span className="text-[#4D4742]">|</span>
            {isAuthenticated ? (
              <Link to="/admin" className="text-[#FAF8F5] hover:text-[#C5A059] flex items-center gap-1 transition-colors">
                <UserIcon className="w-3 h-3" />
                <span>Admin ({user?.role})</span>
              </Link>
            ) : (
              <Link to="/login" className="hover:text-[#FAF8F5] transition-colors">
                Staff Portal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FCFAF7]/95 backdrop-blur-md shadow-sm border-b border-[#E5E1DA] py-3.5'
            : 'bg-[#FCFAF7] border-b border-[#E5E1DA] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-7 h-7 bg-[#C5A059] rotate-45 shrink-0 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-tighter font-bold uppercase text-[#1A1A1A] leading-none">
                CasaCraft
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mt-0.5">
                Architecture & Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#1A1A1A]/70">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative py-1 transition-colors hover:text-[#C5A059] cursor-pointer ${
                    isActive ? 'text-[#C5A059] font-bold opacity-100' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setCalculatorOpen(true)}
              className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#C5A059] px-4 py-3 border border-[#E5E1DA] hover:border-[#C5A059] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              Get Estimate
            </button>
            <button
              id="navbar-book-consultation-btn"
              onClick={() => navigate('/consultation')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setCalculatorOpen(true)}
              className="p-2 text-[#4A433D] hover:text-[#242220] border border-[#E0D7CB] rounded-lg"
              aria-label="Open cost estimator"
            >
              <Calculator className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#242220] hover:bg-[#EFE9DF] rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 bg-[#FCFAF7] border-b border-[#E5E1DA] shadow-xl px-6 py-6 space-y-4 z-50">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left py-2 text-sm uppercase tracking-widest font-semibold transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#C5A059]'
                      : 'text-[#1A1A1A] hover:text-[#C5A059]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E5E1DA] flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/consultation'); }}
                className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#C5A059] transition-colors"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); navigate(isAuthenticated ? '/admin' : '/login'); }}
                className="w-full py-3 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                {isAuthenticated ? 'Admin Dashboard' : 'Staff Login'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Cost Estimator Modal */}
      <CostEstimatorModal isOpen={calculatorOpen} onClose={() => setCalculatorOpen(false)} />
    </>
  );
}

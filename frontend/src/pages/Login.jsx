import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('admin@casacraft.in');
  const [password, setPassword] = useState('AdminPass2026!');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 bg-cream">
      <div className="max-w-md w-full bg-cream-light border border-beige p-8 shadow-elevated space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-charcoal text-gold mx-auto flex items-center justify-center rounded-full font-serif font-bold text-xl">
            C
          </div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">Staff Portal Login</h2>
          <p className="text-xs text-charcoal/70">Enter your credentials to access the CasaCraft admin dashboard.</p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-soft-brown absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cream border border-beige focus:border-gold pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none"
                placeholder="admin@casacraft.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-soft-brown absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream border border-beige focus:border-gold pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-charcoal text-cream py-3 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-gold" />
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Authenticate & Enter</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-beige text-center text-[11px] text-soft-brown space-y-1">
          <p>Demo Admin: <code className="bg-beige/60 px-1 py-0.5 text-charcoal font-mono">admin@casacraft.in</code></p>
          <p>Demo Password: <code className="bg-beige/60 px-1 py-0.5 text-charcoal font-mono">AdminPass2026!</code></p>
        </div>

      </div>
    </div>
  );
}

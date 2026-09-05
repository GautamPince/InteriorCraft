import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight } from 'lucide-react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

/**
 * Interactive interior cost estimator modal.
 * Calculates approximate interior cost based on BHK, sqft, finish tier, and scope options.
 */
export default function CostEstimatorModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [bhk, setBhk] = useState('3 BHK');
  const [sqft, setSqft] = useState(1850);
  const [tier, setTier] = useState('Premium');
  const [includeKitchen, setIncludeKitchen] = useState(true);
  const [includeCeiling, setIncludeCeiling] = useState(true);
  const [includeDecor, setIncludeDecor] = useState(true);

  // Approximate Indian rate per sq.ft based on tier
  const ratePerSqft = { Essential: 1150, Premium: 1650, 'Luxury Signature': 2400 }[tier];

  let estimatedCost = Math.round((sqft * ratePerSqft) / 100000) / 10;
  if (!includeKitchen) estimatedCost -= 2.5;
  if (!includeCeiling) estimatedCost -= 1.2;
  if (!includeDecor) estimatedCost -= 1.8;
  estimatedCost = Math.max(4.5, Math.round(estimatedCost * 10) / 10);

  const handleProceed = () => {
    onClose();
    navigate('/consultation');
  };

  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa'];
  const bhkSqft = { '1 BHK': 650, '2 BHK': 1100, '3 BHK': 1850, '4 BHK': 2800, Villa: 4200 };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CasaCraft Interior Cost Estimator" maxWidth="2xl">
      <div className="space-y-6 text-[#242220]">
        <p className="text-sm text-[#6B635B] font-light">
          Configure your home details below to calculate an instant architectural estimate tailored for Indian materials and labor standards.
        </p>

        {/* Property Configuration */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C7A6B] mb-2">
            Property Configuration
          </label>
          <div className="grid grid-cols-5 gap-2">
            {bhkOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => { setBhk(item); setSqft(bhkSqft[item]); }}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
                  bhk === item
                    ? 'bg-[#242220] text-[#FAF8F5] border-[#242220]'
                    : 'bg-white text-[#4A433D] border-[#E8E1D7] hover:border-[#C5A059]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Carpet Area Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#8C7A6B]">
              Carpet Area (Sq.Ft)
            </label>
            <span className="text-sm font-semibold text-[#242220] bg-[#EFE9DF] px-2.5 py-1 rounded">
              {sqft.toLocaleString()} sq.ft
            </span>
          </div>
          <input
            type="range"
            min={450}
            max={6500}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="w-full h-2 bg-[#E8E1D7] rounded-lg cursor-pointer accent-[#C5A059]"
          />
        </div>

        {/* Finish & Package Tier */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C7A6B] mb-2">
            Craftsmanship Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'Essential', rate: '₹1,150/sq.ft', desc: 'Commercial ply, laminate finish, sleek essential fittings' },
              { id: 'Premium', rate: '₹1,650/sq.ft', desc: 'BWP marine ply, acrylic/PU finish, Blum soft-close hardware' },
              { id: 'Luxury Signature', rate: '₹2,400/sq.ft', desc: 'Veneers, Italian marble accents, fluted glass, smart lighting' },
            ].map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setTier(pkg.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  tier === pkg.id
                    ? 'bg-[#F4EFEA] border-[#C5A059] shadow-sm'
                    : 'bg-white border-[#E8E1D7] hover:border-[#D6C7B2]'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#242220]">{pkg.id}</span>
                  {tier === pkg.id && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                </div>
                <div className="text-xs font-semibold text-[#8C7A6B]">{pkg.rate}</div>
                <p className="text-[11px] text-[#7A7268] mt-1.5 leading-snug">{pkg.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scope Checkboxes */}
        <div className="pt-2 border-t border-[#E8E1D7]">
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C7A6B] mb-2">
            Scope Options
          </label>
          <div className="flex flex-wrap gap-4 text-xs text-[#4A433D]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeKitchen}
                onChange={(e) => setIncludeKitchen(e.target.checked)}
                className="rounded"
              />
              Modular Kitchen & Quartz Top
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(e) => setIncludeCeiling(e.target.checked)}
                className="rounded"
              />
              Gypsum Ceiling & Magnetic Tracks
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDecor}
                onChange={(e) => setIncludeDecor(e.target.checked)}
                className="rounded"
              />
              Soft Furnishing & Accent Walls
            </label>
          </div>
        </div>

        {/* Result Card */}
        <div className="p-5 rounded-xl bg-[#242220] text-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Estimated Investment
            </span>
            <div className="text-3xl font-serif text-[#FAF8F5] mt-1">
              ₹{estimatedCost} Lakh <span className="text-xs font-sans text-[#A89F91]">(approx.)</span>
            </div>
            <p className="text-xs text-[#A89F91] mt-0.5">
              Includes 3D VR walkthrough, 45-day guaranteed handover, and 10-year warranty.
            </p>
          </div>

          <button
            onClick={handleProceed}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-[#C5A059] text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#242220] transition-colors"
          >
            <span>Lock this Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

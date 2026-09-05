import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({
  phoneNumber = '+919876543210',
  defaultMessage = 'Hello CasaCraft Interiors, I would like to enquire about home interior design services.',
}) {
  const handleClick = () => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      id="whatsapp-floating-btn"
      onClick={handleClick}
      aria-label="Chat on WhatsApp with CasaCraft design expert"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#20BE5A] active:scale-95 transition-all duration-200"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-sm font-semibold tracking-wide hidden sm:inline-block pr-1">
        Chat with Expert
      </span>
      {/* Pulse indicator */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
      </span>
    </button>
  );
}

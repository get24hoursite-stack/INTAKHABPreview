import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-white border-t border-stone-200 text-stone-800">
      {/* Editorial Announcement Bar (Matches Screenshot 4 & 7) */}
      <div className="bg-[#7A0B2E] text-white py-3 overflow-hidden text-xs uppercase tracking-widest font-medium border-b border-[#D4A456]/40">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          <span>Resort Collection is LIVE</span>
          <span className="text-[#D4A456]">✦</span>
          <span>Complimentary Nationwide Shipping on Orders over Rs. 15,000</span>
          <span className="text-[#D4A456]">✦</span>
          <span>Bespoke Stitched Tailoring · D.H.A Lahore</span>
          <span className="text-[#D4A456]">✦</span>
          <span>Resort Collection is LIVE</span>
          <span className="text-[#D4A456]">✦</span>
          <span>Complimentary Nationwide Shipping on Orders over Rs. 15,000</span>
          <span className="text-[#D4A456]">✦</span>
          <span>Bespoke Stitched Tailoring · D.H.A Lahore</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Top Logo & Statement */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-stone-200">
          <div className="text-center sm:text-left">
            <img
              src="/assets/aistudio/file_000000002824821181cc689ddface7a4_f24c2d22.png"
              alt="Intakhab - انتخاب"
              className="h-16 sm:h-20 w-auto object-contain mx-auto sm:mx-0"
            />
            <p className="font-serif text-sm text-[#D4A456] mt-2 tracking-wider">
              انتخاب — پریمیم سلائی شدہ سوٹ
            </p>
          </div>

          <div className="max-w-md text-center sm:text-right text-xs text-stone-500 leading-relaxed">
            Intakhab celebrates luxury Pakistani sartorial heritage. Each stitched piece is individually crafted in pure silks and velvets, complete with bespoke length customizations for contemporary women.
          </div>
        </div>

        {/* 3 Column Grid (Matches Screenshot 4 & 11) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: CONTACT US (Screenshot 4) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-2">
              CONTACT US
            </h3>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A0B2E] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-stone-900">Address:</strong> D.H.A Lahore, Pakistan
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7A0B2E] shrink-0" />
                <p>
                  <strong className="text-stone-900">Phone :</strong>{' '}
                  <a href="tel:+923167779661" className="hover:text-[#7A0B2E] transition-colors">
                    +923167779661
                  </a>
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7A0B2E] shrink-0" />
                <p>
                  <strong className="text-stone-900">Email :</strong>{' '}
                  <a href="mailto:info@intakhabofficial.com" className="hover:text-[#7A0B2E] transition-colors">
                    info@intakhabofficial.com
                  </a>
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#7A0B2E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Customer Service Hours:</strong>
                  <span>Monday - Saturday</span>
                  <br />
                  <span>9:00 am to 5:30 GMT+5.</span>
                </div>
              </div>
            </div>

            {/* Social Links (Screenshot 4) */}
            <div className="pt-4 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                INTAKHAB
              </h4>
              <div className="space-y-2 text-xs text-stone-600">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#7A0B2E] transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#7A0B2E]" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#7A0B2E] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#7A0B2E]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://wa.me/923167779661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#7A0B2E] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Whatsapp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: OUR POLICIES (Screenshot 4 & 11) */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <button
                onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-2"
              >
                <span>OUR POLICIES</span>
                {isPoliciesOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              <div className={`mt-3 space-y-2 text-xs text-stone-600 ${isPoliciesOpen ? 'block' : 'hidden md:block'}`}>
                <div className="p-3 bg-[#FAF6F2] border border-stone-200/80 space-y-2 text-[11px] leading-relaxed">
                  <p>
                    <strong className="text-stone-900 block">Shipping & Delivery:</strong>
                    Nationwide standard delivery takes 7-10 working days. Orders over Rs. 15,000 qualify for complimentary delivery.
                  </p>
                  <p>
                    <strong className="text-stone-900 block">Exchanges:</strong>
                    Unworn garments with tags intact can be exchanged within 7 days of delivery.
                  </p>
                  <p>
                    <strong className="text-stone-900 block">Custom Lengths:</strong>
                    Each piece is tailored to your chosen shirt and pant length specifications at our Lahore facility.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: FOLLOW THE LATEST TRENDS AND STYLES (Screenshot 4 & 11) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-2">
              FOLLOW THE LATEST TRENDS AND STYLES
            </h3>

            <p className="text-xs text-stone-600">
              Be the first to access new drops, velvet capsules, and VIP previews.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full py-3 px-3.5 text-xs bg-white border border-stone-300 rounded-none focus:outline-none focus:border-[#7A0B2E] text-stone-900 placeholder:text-stone-400"
              />

              <button
                type="submit"
                className="w-full sm:w-36 py-3 px-6 bg-black hover:bg-[#7A0B2E] text-white text-xs font-semibold tracking-widest uppercase transition-colors rounded-none shadow-sm"
              >
                SUBSCRIBE
              </button>
            </form>

            {isSubscribed && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you for joining Intakhab VIP updates!</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 Intakhab. All rights reserved. Premium Stitched Suits.</p>
          <div className="flex items-center gap-4">
            <span>D.H.A Lahore Boutique</span>
            <span>·</span>
            <span>Silk Karandi & French Velvet</span>
            <span>·</span>
            <span>WhatsApp Concierge Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

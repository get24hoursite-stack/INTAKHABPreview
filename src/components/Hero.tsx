import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBestSellersClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBestSellersClick }) => {
  return (
    <section className="relative bg-[#FAF6F2] overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4A456]/40 rounded-full text-xs font-medium text-[#7A0B2E] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A456]" />
              <span>THE SIGNATURE COLLECTION</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#7A0B2E] font-medium leading-[1.15] tracking-tight">
                Elegance in Every Stitch
              </h1>
              <p className="font-serif text-lg sm:text-xl text-[#D4A456] tracking-wide">
                انتخاب — ہر انداز میں نفاست
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover beautifully designed stitched suits that bring together timeless style, graceful details, and everyday comfort. Find your perfect look for every occasion.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#7A0B2E] hover:bg-[#580620] text-white text-xs uppercase tracking-widest font-semibold rounded-none transition-all duration-200 shadow-md flex items-center justify-center gap-2 group border border-[#7A0B2E]"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#D4A456]" />
              </button>
              <button
                onClick={onBestSellersClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-[#FAF6F2] text-[#7A0B2E] text-xs uppercase tracking-widest font-semibold rounded-none transition-all duration-200 border border-stone-300 hover:border-[#7A0B2E]"
              >
                EXPLORE NEW ARRIVALS
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Visual */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="/src/assets/images/suit_vesper_noir_1794446831674.jpg"
                alt="Intakhab Vesper Noir Prêt Collection"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover object-top hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#D4A456] font-medium">
                  Signature Prêt Feature
                </span>
                <h3 className="font-serif text-2xl text-white font-medium">
                  Vesper Noir Ensemble
                </h3>
                <p className="text-xs text-white/80 mt-1 max-w-md">
                  Noir silk karandi tunic with plush French velvet cuffs and authentic hand-finished Kashmiri woven pashmina shawl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

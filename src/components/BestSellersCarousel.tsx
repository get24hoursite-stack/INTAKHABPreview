import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  imageStyle?: 'zoom-crop' | 'standard';
}

interface BestSellersCarouselProps {
  onViewAll: () => void;
  onSelectCategory: (category: string) => void;
}

const SLIDES: Slide[] = [
  {
    id: 'solids',
    category: 'Solids',
    title: 'SOLIDS',
    subtitle: 'Pure Monochrome Raw Silk Sets',
    image: '/public/assets/aistudio/20261112_070522_ddf7e903.jpg',
    imageStyle: 'zoom-crop',
  },
  {
    id: 'embroidered',
    category: 'Best Sellers',
    title: 'EMBROIDERED',
    subtitle: 'Artisanal Floral Threadwork & Organza Dupattas',
    image: '/public/assets/aistudio/20261112_070511_d9a731b7.jpg',
    imageStyle: 'zoom-crop',
  },
  {
    id: 'velvet-edit',
    category: 'Velvet Edit',
    title: 'VELVET EDIT',
    subtitle: 'Noir Silk Karandi with French Velvet Cuffs',
    image: '/src/assets/images/suit_vesper_noir_1794446831674.jpg',
    imageStyle: 'standard',
  },
  {
    id: 'festive-couture',
    category: 'New Arrivals',
    title: 'FESTIVE COUTURE',
    subtitle: 'Royal Maroon Peshwas with Champagne Gold Zari',
    image: '/src/assets/images/hero_campaign_luxury_1794446831850.jpg',
    imageStyle: 'standard',
  },
];

export const BestSellersCarousel: React.FC<BestSellersCarouselProps> = ({
  onViewAll,
  onSelectCategory,
}) => {
  const slides = SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      id="best-sellers"
      className="py-10 sm:py-14 bg-white border-b border-stone-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Header: BEST SELLERS on Left, View all -> on Right (Matches Screenshot 1 & 2) */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium tracking-tight">
            BEST SELLERS
          </h2>

          <button
            onClick={onViewAll}
            className="py-1.5 px-4 sm:px-5 border border-stone-900 text-stone-900 hover:bg-[#7A0B2E] hover:border-[#7A0B2E] hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carousel Visual Box with Left/Right Arrows (Matches Screenshot 1 & 2) */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-stone-100 overflow-hidden cursor-pointer select-none group shadow-md"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => onSelectCategory(currentSlide.category)}
        >
          {/* Active Image with smooth cross-fade */}
          <div className="w-full h-full relative overflow-hidden">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out overflow-hidden ${
                  currentIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full ${
                    slide.imageStyle === 'zoom-crop'
                      ? 'object-cover object-[center_35%] scale-[1.32]'
                      : 'object-cover object-top'
                  }`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Left Arrow Button (Matches Screenshot 1 & 2 circle button on left edge) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-stone-900 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-20 focus:outline-none"
            aria-label="Previous Best Seller"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Right Arrow Button (Matches Screenshot 1 & 2 circle button on right edge) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-stone-900 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-20 focus:outline-none"
            aria-label="Next Best Seller"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Bottom Category Title (Matches Screenshot 1 & 2: "SOLIDS" / "EMBROIDERED") */}
        <div className="text-center mt-4 sm:mt-5 space-y-1">
          <h3
            onClick={() => onSelectCategory(currentSlide.category)}
            className="font-serif text-lg sm:text-xl font-bold tracking-widest uppercase text-stone-900 hover:text-[#7A0B2E] transition-colors cursor-pointer inline-block"
          >
            {currentSlide.title}
          </h3>
          <p className="text-xs text-stone-500 font-normal">
            {currentSlide.subtitle}
          </p>

          {/* Small Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 transition-all rounded-full ${
                  currentIndex === idx ? 'w-6 bg-[#7A0B2E]' : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Menu, Search, ShoppingBag, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenMenu,
  onSelectCategory,
  selectedCategory,
}) => {
  const categories = [
    { label: 'ALL COLLECTIONS', value: 'All' },
    { label: 'NEW ARRIVALS', value: 'New Arrivals' },
    { label: 'BEST SELLERS', value: 'Best Sellers' },
    { label: 'SOLIDS', value: 'Solids' },
    { label: 'VELVET EDIT', value: 'Velvet Edit' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Left Zone: Hamburger & Search */}
          <div className="flex items-center gap-3 sm:gap-4 w-1/4">
            <button
              onClick={onOpenMenu}
              className="p-2 -ml-2 text-stone-700 hover:text-[#7A0B2E] transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-700 hover:text-[#7A0B2E] transition-colors focus:outline-none flex items-center gap-1.5"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden md:inline text-xs tracking-wider uppercase text-stone-500">Search</span>
            </button>
          </div>

          {/* Center Zone: Exact Intakhab Logo */}
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group py-1"
            >
              {/* Exact Logo from Attachment 1 */}
              <img
                src="/assets/aistudio/file_000000002824821181cc689ddface7a4_f24c2d22.png"
                alt="Intakhab - انتخاب - Premium Stitched Suits"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Right Zone: Wishlist & Cart */}
          <div className="flex items-center justify-end gap-3 sm:gap-5 w-1/4">
            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-[#7A0B2E] transition-colors focus:outline-none"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A456] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button (matching reference Screenshot 6 & 10) */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-stone-800 hover:text-[#7A0B2E] transition-colors focus:outline-none flex items-center gap-1.5"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#7A0B2E] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:inline text-xs font-medium tracking-wider text-stone-600">
                ({cartCount})
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-t border-stone-100 text-xs tracking-widest font-medium uppercase text-stone-600">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`transition-colors py-1 relative ${
                selectedCategory === cat.value
                  ? 'text-[#7A0B2E] font-semibold'
                  : 'hover:text-[#7A0B2E]'
              }`}
            >
              {cat.label}
              {selectedCategory === cat.value && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7A0B2E]" />
              )}
            </button>
          ))}
          <a
            href="#contact"
            className="hover:text-[#7A0B2E] transition-colors py-1"
          >
            CONTACT US
          </a>
        </nav>
      </div>
    </header>
  );
};

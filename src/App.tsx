import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, PlacedOrder } from './types';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeChartModal } from './components/SizeChartModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { BestSellersCarousel } from './components/BestSellersCarousel';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['vesper-set-noir']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recentOrder, setRecentOrder] = useState<PlacedOrder | null>(null);

  // Cart operations
  const handleAddToCart = (itemConfig: {
    product: Product;
    shirtSize: string;
    pantSize: string;
    shirtLength: string;
    pantLength: string;
    quantity: number;
  }) => {
    const { product, shirtSize, pantSize, shirtLength, pantLength, quantity } = itemConfig;
    const cartId = `${product.id}-${shirtSize}-${pantSize}-${shirtLength}-${pantLength}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          shirtSize,
          pantSize,
          shirtLength,
          pantLength,
          quantity,
          material: product.material,
          colour: product.colour,
        },
      ];
    });

    // Close PDP and open Cart Drawer for instant feedback
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
      );
    }
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Filtered products
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const displayedProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : selectedCategory === 'New Arrivals'
      ? newArrivals
      : selectedCategory === 'Best Sellers'
      ? bestSellers
      : selectedCategory === 'Solids'
      ? PRODUCTS.filter((p) => p.category === 'Solids' || p.category === 'Best Sellers')
      : selectedCategory === 'Velvet Edit'
      ? PRODUCTS.filter((p) => p.material.toLowerCase().includes('velvet'))
      : PRODUCTS;

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF6F2] flex flex-col font-sans selection:bg-[#7A0B2E] selection:text-white">
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            setSelectedCategory('New Arrivals');
            const el = document.getElementById('new-arrivals');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onBestSellersClick={() => {
            setSelectedCategory('Best Sellers');
            const el = document.getElementById('best-sellers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section: NEW ARRIVALS (Matches Screenshot 10) */}
        <section id="new-arrivals" className="py-12 sm:py-16 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 font-medium tracking-tight">
                  NEW ARRIVAL
                </h2>
                <p className="text-xs text-[#D4A456] tracking-wider uppercase mt-1 font-medium">
                  Stitched Festive & Luxury Pret Edit
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('New Arrivals');
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2 px-5 sm:px-6 border border-stone-900 text-stone-900 hover:bg-[#7A0B2E] hover:border-[#7A0B2E] hover:text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center gap-1.5"
              >
                <span>VIEW ALL</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2 columns on mobile, 4 columns on desktop (Screenshot 10) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {newArrivals.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Interlude: SOLIDS & AS SEEN ON (Matches Screenshot 5 & 7) */}
        <section className="bg-[#FAF6F2] py-14 sm:py-20 border-b border-stone-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative">
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden shadow-xl border-4 border-white bg-white">
                  <img
                    src="/src/assets/images/hero_campaign_luxury_1794446831850.jpg"
                    alt="Intakhab Gulzar Silk Festive Ensemble"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#7A0B2E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A456]" />
                  <span>The Festive & Velvet Suite</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
                  GULZAR FESTIVE EDIT
                </h2>

                <p className="text-sm text-stone-600 leading-relaxed">
                  Royal Maroon pure silk peshwas silhouette embellished with handcrafted champagne gold tilla needlework, velvet trims, and flared palazzo trousers.
                </p>

                <div className="pt-2">
                  <h3 className="font-serif text-xl text-stone-800 font-medium tracking-wider uppercase mb-3">
                    AS SEEN ON
                  </h3>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-stone-900 text-stone-900 hover:bg-[#7A0B2E] hover:border-[#7A0B2E] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                  >
                    <span>Follow @intakhabofficial</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A456]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: BEST SELLERS Carousel Slider (Matches User Screenshots) */}
        <BestSellersCarousel
          onViewAll={() => {
            setSelectedCategory('All');
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Full Collection Catalog Grid with Filtering */}
        <section id="catalog" className="py-12 sm:py-16 bg-[#FAF6F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7A0B2E] font-bold">
                  The Ready-To-Wear Suite
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                  {selectedCategory === 'All' ? 'All Stitched Suits' : selectedCategory}
                </h2>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-stone-200">
                {['All', 'New Arrivals', 'Best Sellers', 'Solids', 'Velvet Edit'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#7A0B2E] text-white'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      {/* 1. Product Detail Page (PDP) Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onOpenSizeChart={() => setIsSizeChartOpen(true)}
        />
      )}

      {/* 2. Slide-Over Cart Drawer (Screenshot 3) */}
      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {/* 3. Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          onOrderSuccess={(order) => {
            setRecentOrder(order);
            setCartItems([]);
          }}
        />
      )}

      {/* 4. Size Chart Modal */}
      {isSizeChartOpen && (
        <SizeChartModal
          isOpen={isSizeChartOpen}
          onClose={() => setIsSizeChartOpen(false)}
        />
      )}

      {/* 5. Live Search Modal */}
      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* 6. Wishlist Drawer */}
      {isWishlistOpen && (
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistIds={wishlistIds}
          products={PRODUCTS}
          onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((item) => item !== id))}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* 7. Mobile Side Menu Drawer */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedCategory={selectedCategory}
          onOpenSizeChart={() => setIsSizeChartOpen(true)}
        />
      )}
    </div>
  );
}

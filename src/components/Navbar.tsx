import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store';
import { useState, useRef, useEffect } from 'react';
import { products } from '@/lib/mockData';

const Navbar = () => {
  const cartCount = useStore((state) => state.getCartCount());
  const wishlistCount = useStore((state) => state.wishlist.length);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Get unique suggestions from product names and categories
  const suggestions = searchQuery.trim()
    ? Array.from(new Set([
        ...products
          .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(p => p.name)
          .slice(0, 3),
        ...products
          .filter(p => p.category.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(p => p.category)
          .slice(0, 2)
      ])).slice(0, 5)
    : [];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleProductClick = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gradient-accent">
              SilkAura
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
              Shop All
            </Link>
            <Link to="/products?category=Serums" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
              Serums
            </Link>
            <Link to="/products?category=Cleansers" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
              Cleansers
            </Link>
            <Link to="/products?category=Masks" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
              Masks
            </Link>
          </div>

          {/* Icons & Search */}
          <div className="hidden md:flex items-center gap-3" ref={searchRef}>
            {/* Search */}
            <div className={`flex items-center transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-80' : 'w-auto'}`}>
              {!isSearchOpen ? (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale transition-transform"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              ) : (
                <div className="relative w-full animate-scale-in">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 h-10 bg-background border-border focus:border-primary transition-all duration-300 focus:shadow-soft"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-accent/20 transition-all duration-200"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && (searchQuery.trim() || suggestions.length > 0) && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-elegant z-50 max-h-96 overflow-y-auto animate-scale-in">
                {filteredProducts.length > 0 ? (
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground px-3 py-2 font-medium">Products</p>
                    {filteredProducts.slice(0, 5).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-accent/10 transition-all duration-200 hover-scale"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg transition-transform duration-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <p className="font-semibold text-primary">${product.price}</p>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No products found for "{searchQuery}"
                  </div>
                ) : null}

                {suggestions.length > 0 && !searchQuery.trim() && (
                  <div className="p-2 border-t border-border">
                    <p className="text-xs text-muted-foreground px-3 py-2 font-medium">Suggestions</p>
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-3 py-2 rounded-md cursor-pointer hover:bg-accent/10 transition-all duration-200 text-sm text-foreground hover-scale"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover-scale transition-transform">
                <Heart className="h-5 w-5 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover-scale transition-transform">
                <ShoppingCart className="h-5 w-5 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-scale transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/products" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
                Shop All
              </Link>
              <Link to="/products?category=Serums" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
                Serums
              </Link>
              <Link to="/products?category=Cleansers" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
                Cleansers
              </Link>
              <Link to="/products?category=Masks" className="text-foreground hover:text-primary transition-colors font-subheading story-link hover-scale">
                Masks
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

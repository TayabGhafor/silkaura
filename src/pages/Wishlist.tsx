import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

const Wishlist = () => {
  const wishlist = useStore((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in-up">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save your favorite products here!</p>
            <Link to="/products">
              <Button className="bg-gradient-accent hover:opacity-90 text-white">
                Discover Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-accent fill-accent" />
          <h1 className="text-4xl font-heading font-bold">My Wishlist</h1>
          <span className="text-muted-foreground">({wishlist.length} items)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <div key={product.id} className={`animate-fade-in-up delay-${(index % 8) * 100}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;

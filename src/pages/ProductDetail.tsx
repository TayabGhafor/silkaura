import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ArrowLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { products } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">Product not found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-muted hover-lift">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-subheading text-primary bg-primary/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="text-sm font-subheading text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  In Stock
                </span>
              ) : (
                <span className="text-sm font-subheading text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants && (
              <div className="mb-6">
                <Label className="text-sm font-subheading mb-2 block">Size</Label>
                <div className="flex gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedVariant === index
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <Label className="text-sm font-subheading mb-2 block">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-accent hover:opacity-90 text-white h-12"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleWishlist}
                className="h-12 w-12"
              >
                <Heart
                  className={`h-5 w-5 ${inWishlist ? 'fill-accent text-accent' : ''}`}
                />
              </Button>
            </div>

            {/* Skin Type */}
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h3 className="font-subheading font-semibold mb-2">Perfect for:</h3>
              <div className="flex flex-wrap gap-2">
                {product.skinType.map(type => (
                  <span
                    key={type}
                    className="text-sm bg-card px-3 py-1 rounded-full border border-border"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-subheading font-semibold mb-2">Key Ingredients:</h3>
              <ul className="space-y-1">
                {product.ingredients.map(ingredient => (
                  <li key={ingredient} className="text-sm text-muted-foreground flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-8">
            <h2 className="text-3xl font-heading font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

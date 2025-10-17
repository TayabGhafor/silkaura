import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Truck, Globe, Clock } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl font-heading font-bold mb-4">Shipping Information</h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about delivery and shipping
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-6 hover-lift animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Standard Shipping</h2>
              </div>
              <p className="text-muted-foreground mb-3">5-7 business days</p>
              <p className="text-2xl font-bold text-primary mb-3">FREE</p>
              <p className="text-sm text-muted-foreground">
                Available for all orders. Delivered via USPS or regional carriers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover-lift animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Express Shipping</h2>
              </div>
              <p className="text-muted-foreground mb-3">2-3 business days</p>
              <p className="text-2xl font-bold text-primary mb-3">$9.99</p>
              <p className="text-sm text-muted-foreground">
                Faster delivery via FedEx or UPS for urgent orders.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover-lift animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Overnight Shipping</h2>
              </div>
              <p className="text-muted-foreground mb-3">1 business day</p>
              <p className="text-2xl font-bold text-primary mb-3">$19.99</p>
              <p className="text-sm text-muted-foreground">
                Next-day delivery for time-sensitive purchases (order before 2 PM EST).
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover-lift animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">International</h2>
              </div>
              <p className="text-muted-foreground mb-3">7-14 business days</p>
              <p className="text-2xl font-bold text-primary mb-3">Varies</p>
              <p className="text-sm text-muted-foreground">
                International shipping costs calculated at checkout based on destination.
              </p>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="bg-gradient-card border border-border rounded-xl p-8">
              <h2 className="text-3xl font-heading font-bold mb-6">Shipping Policy Details</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-subheading font-semibold text-xl mb-3">Processing Time</h3>
                  <p className="text-muted-foreground">
                    All orders are processed within 1-2 business days (Monday-Friday, excluding holidays). Orders placed after 2 PM EST will be processed the next business day.
                  </p>
                </div>

                <div>
                  <h3 className="font-subheading font-semibold text-xl mb-3">Order Tracking</h3>
                  <p className="text-muted-foreground">
                    Once your order ships, you'll receive a confirmation email with a tracking number. You can track your package in real-time using the provided link.
                  </p>
                </div>

                <div>
                  <h3 className="font-subheading font-semibold text-xl mb-3">Shipping Restrictions</h3>
                  <p className="text-muted-foreground">
                    Currently, we ship to the United States, Canada, UK, and select European countries. Unfortunately, we cannot ship to PO boxes or APO/FPO addresses at this time.
                  </p>
                </div>

                <div>
                  <h3 className="font-subheading font-semibold text-xl mb-3">Customs & Import Fees</h3>
                  <p className="text-muted-foreground">
                    For international orders, customers are responsible for any customs duties, taxes, or import fees imposed by their country. These charges are not included in your order total.
                  </p>
                </div>

                <div>
                  <h3 className="font-subheading font-semibold text-xl mb-3">Lost or Damaged Packages</h3>
                  <p className="text-muted-foreground">
                    If your package is lost or arrives damaged, please contact us within 48 hours of delivery. We'll work with the carrier to resolve the issue and ensure you receive your products.
                  </p>
                </div>

                <div>
                  <h3 className="font-subheading font-semibold text-xl mb-3">Free Shipping Threshold</h3>
                  <p className="text-muted-foreground">
                    Enjoy free standard shipping on all orders! No minimum purchase required. Express and overnight shipping fees apply.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <h2 className="text-2xl font-heading font-bold mb-3">Need help with your order?</h2>
              <p className="text-muted-foreground mb-6">
                Contact our customer service team for shipping inquiries or tracking assistance.
              </p>
              <a href="/contact" className="inline-block bg-gradient-accent text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-subheading font-semibold">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shipping;

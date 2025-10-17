import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, CheckCircle } from 'lucide-react';

const Returns = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    firstName: '',
    lastName: '',
    productName: '',
    quantity: '',
    reason: 'damaged',
    description: '',
    refundMethod: 'original',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Return Request Submitted",
      description: "We've received your return request. You'll hear from us within 24-48 hours.",
    });
    setFormData({
      orderId: '',
      email: '',
      firstName: '',
      lastName: '',
      productName: '',
      quantity: '',
      reason: 'damaged',
      description: '',
      refundMethod: 'original',
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl font-heading font-bold mb-4">Returns & Exchanges</h1>
            <p className="text-muted-foreground text-lg">
              We want you to love your purchase. If you're not satisfied, we're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Return Policy</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>30-day return window from delivery date</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Products must be unused and in original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Free return shipping on defective items</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Refunds processed within 5-7 business days</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-heading font-bold mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-subheading font-semibold mb-1">Submit Request</h3>
                    <p className="text-sm text-muted-foreground">Fill out the form below with your order details</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-subheading font-semibold mb-1">Get Approval</h3>
                    <p className="text-sm text-muted-foreground">Receive return instructions via email within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-subheading font-semibold mb-1">Ship Item</h3>
                    <p className="text-sm text-muted-foreground">Package and ship the item using provided label</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-subheading font-semibold mb-1">Receive Refund</h3>
                    <p className="text-sm text-muted-foreground">Get your refund once we receive and inspect the item</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card border border-border rounded-xl p-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-heading font-bold mb-6">Return Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderId">Order ID *</Label>
                  <Input
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    placeholder="e.g., ORD-123456"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="e.g., Radiance Vitamin C Serum"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Reason for Return *</Label>
                <RadioGroup
                  value={formData.reason}
                  onValueChange={(value) => setFormData({ ...formData, reason: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="damaged" id="damaged" />
                    <Label htmlFor="damaged" className="cursor-pointer">Product arrived damaged</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wrong" id="wrong" />
                    <Label htmlFor="wrong" className="cursor-pointer">Wrong item received</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unsatisfied" id="unsatisfied" />
                    <Label htmlFor="unsatisfied" className="cursor-pointer">Not satisfied with product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="allergic" id="allergic" />
                    <Label htmlFor="allergic" className="cursor-pointer">Allergic reaction</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">Other reason</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="description">Additional Details *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide more details about your return request..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label className="mb-3 block">Preferred Refund Method *</Label>
                <RadioGroup
                  value={formData.refundMethod}
                  onValueChange={(value) => setFormData({ ...formData, refundMethod: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="original" id="original" />
                    <Label htmlFor="original" className="cursor-pointer">Refund to original payment method</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="store" id="store" />
                    <Label htmlFor="store" className="cursor-pointer">Store credit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exchange" id="exchange" />
                    <Label htmlFor="exchange" className="cursor-pointer">Exchange for different product</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full md:w-auto bg-gradient-accent hover:opacity-90 h-12 px-8">
                  Submit Return Request
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-card border border-border rounded-xl p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="font-subheading font-semibold text-xl mb-3">Important Notes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Products that show signs of use or are missing original packaging may not be eligible for return</li>
              <li>• Sale items and gift sets may have different return policies (see product page for details)</li>
              <li>• Return shipping costs are deducted from refund unless the return is due to our error or defect</li>
              <li>• Original shipping charges are non-refundable except in cases of defective or incorrect items</li>
              <li>• For hygiene reasons, opened skincare products cannot be returned unless defective</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Returns;

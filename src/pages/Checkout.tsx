import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { mockPaymentGateway, TEST_CARDS } from '@/lib/mockPaymentGateway';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, getCartTotal, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in-up">
            <p className="text-muted-foreground mb-6">Your cart is empty. Add items to checkout.</p>
            <Link to="/products">
              <Button className="bg-gradient-accent hover:opacity-90">Shop Now</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      const shippingCost = formData.shippingMethod === 'express' ? 9.99 : formData.shippingMethod === 'overnight' ? 19.99 : 0;
      const totalAmount = getCartTotal() + shippingCost;
      
      // Process payment through mock gateway
      const paymentResponse = await mockPaymentGateway.createPayment({
        amount: totalAmount,
        currency: 'USD',
        paymentMethod: formData.paymentMethod as 'card' | 'paypal' | 'applepay',
        cardDetails: formData.paymentMethod === 'card' ? {
          cardNumber: formData.cardNumber,
          cardName: formData.cardName,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
        } : undefined,
        customerInfo: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });
      
      if (paymentResponse.status === 'success') {
        // Capture the payment
        await mockPaymentGateway.capturePayment(paymentResponse.paymentId);
        
        toast({
          title: "Order Placed Successfully!",
          description: `Payment ID: ${paymentResponse.paymentId}. You'll receive a confirmation email shortly.`,
        });
        
        clearCart();
        navigate('/');
      } else {
        toast({
          title: "Payment Failed",
          description: paymentResponse.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <div className={`h-1 w-12 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <div className={`h-1 w-12 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          3
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-heading font-bold mb-8">Checkout</h1>

        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                  <Truck className="h-6 w-6 text-primary" />
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full bg-gradient-accent hover:opacity-90 h-12">
                    Continue to Shipping Method
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
                <h2 className="text-2xl font-heading font-bold mb-6">Shipping Method</h2>
                <RadioGroup value={formData.shippingMethod} onValueChange={(value) => setFormData({ ...formData, shippingMethod: value })}>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 mb-3 hover:border-primary cursor-pointer">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Standard Shipping (5-7 days)</span>
                        <span className="font-semibold">Free</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 mb-3 hover:border-primary cursor-pointer">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Express Shipping (2-3 days)</span>
                        <span className="font-semibold">$9.99</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary cursor-pointer">
                    <RadioGroupItem value="overnight" id="overnight" />
                    <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Overnight Shipping (1 day)</span>
                        <span className="font-semibold">$19.99</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="flex gap-4 mt-6">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1 bg-gradient-accent hover:opacity-90">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Payment Information
                </h2>
                <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })} className="mb-6">
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 mb-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 mb-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4">
                    <RadioGroupItem value="applepay" id="applepay" />
                    <Label htmlFor="applepay" className="cursor-pointer">Apple Pay</Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        value={formData.cardNumber} 
                        onChange={handleInputChange}
                        maxLength={19}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Test: {TEST_CARDS.SUCCESS} (Success) | {TEST_CARDS.DECLINED} (Declined)
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" name="cardName" value={formData.cardName} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate" 
                          name="expiryDate" 
                          placeholder="MM/YY" 
                          value={formData.expiryDate} 
                          onChange={handleInputChange}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv" 
                          placeholder="123" 
                          value={formData.cvv} 
                          onChange={handleInputChange}
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-muted/50 rounded-lg flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Your payment information is secure and encrypted. We accept all major credit cards.
                  </p>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1" disabled={isProcessing}>
                    Back
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder} 
                    className="flex-1 bg-gradient-accent hover:opacity-90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="font-heading font-bold text-2xl mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{formData.shippingMethod === 'standard' ? 'Free' : formData.shippingMethod === 'express' ? '$9.99' : '$19.99'}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${(getCartTotal() + (formData.shippingMethod === 'express' ? 9.99 : formData.shippingMethod === 'overnight' ? 19.99 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-card rounded-xl border border-border p-6 text-center hover-lift animate-fade-in-up">
              <Mail className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-subheading font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">hello@silkaura.com</p>
            </div>

            <div className="bg-gradient-card rounded-xl border border-border p-6 text-center hover-lift animate-fade-in-up delay-100">
              <Phone className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-subheading font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
            </div>

            <div className="bg-gradient-card rounded-xl border border-border p-6 text-center hover-lift animate-fade-in-up delay-200">
              <MapPin className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-subheading font-semibold mb-2">Address</h3>
              <p className="text-muted-foreground text-sm">123 Beauty Lane, CA 90210</p>
            </div>
          </div>

          <div className="bg-gradient-card rounded-xl border border-border p-8 animate-fade-in-up delay-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto bg-gradient-accent hover:opacity-90 text-white"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

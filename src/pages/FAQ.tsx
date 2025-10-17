import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer three shipping options: Standard (5-7 days, free), Express (2-3 days, $9.99), and Overnight (1 day, $19.99). All orders are processed within 1-2 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for unused products in their original packaging. Refunds are processed within 5-7 business days after we receive your return."
    },
    {
      question: "Are your products cruelty-free?",
      answer: "Yes! All SilkAura products are 100% cruelty-free. We never test on animals and only work with suppliers who share our ethical values."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on the carrier's website."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship to the United States, Canada, UK, and select European countries. International shipping costs and delivery times vary by location."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. After that, the order enters processing and cannot be changed. Please contact us immediately if you need assistance."
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer: "Many of our products are formulated for sensitive skin. Each product page includes detailed ingredient lists and skin type recommendations. If you have concerns, please consult with a dermatologist."
    },
    {
      question: "How should I store my skincare products?",
      answer: "Store products in a cool, dry place away from direct sunlight. Some products may require refrigeration (this will be noted on the packaging). Always close lids tightly after use."
    },
    {
      question: "Do you offer samples?",
      answer: "Yes! We include complimentary samples with every order over $50. You can also purchase sample sets on our Products page."
    },
    {
      question: "What if I have an allergic reaction?",
      answer: "Discontinue use immediately and consult a healthcare professional. While we test all products for safety, individual reactions can occur. Contact us for a full refund on the product."
    },
    {
      question: "How do I contact customer service?",
      answer: "You can reach us via our Contact page, email us at support@silkaura.com, or call us at 1-800-SILKAURA (Mon-Fri, 9am-6pm EST). We typically respond within 24 hours."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl font-heading font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our products, shipping, and policies.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left font-subheading font-semibold text-lg hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-8 bg-gradient-card border border-border rounded-xl text-center animate-fade-in">
            <h2 className="text-2xl font-heading font-bold mb-3">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer service team is here to help you with any inquiries.
            </p>
            <a href="/contact" className="inline-block bg-gradient-accent text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-subheading font-semibold">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;

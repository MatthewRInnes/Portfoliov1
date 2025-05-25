import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactRef = useIntersectionObserver({ direction: 'up' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <section id="contact" className="py-24 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-lightestSlate mr-4 tracking-tight">
            <span className="text-teal">06.</span> Contact
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={contactRef.ref} className={`space-y-8 ${contactRef.className}`}>
            <h3 className="text-xl font-semibold text-foreground dark:text-lightestSlate">
              Let's Connect
            </h3>
            <p className="text-foreground/70 dark:text-lightSlate">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4">
              <a
                href="mailto:matthewinnes42@gmail.com"
                className="flex items-center text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal transition-colors duration-300"
              >
                <Mail className="w-5 h-5 mr-3" />
                matthewinnes42@gmail.com
              </a>
              <a
                href="tel:07879959625"
                className="flex items-center text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal transition-colors duration-300"
              >
                <Phone className="w-5 h-5 mr-3" />
                07879959625
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-navy/30 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground dark:text-lightSlate mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-border dark:border-slate/20 bg-background dark:bg-navy/50 text-foreground dark:text-lightSlate focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground dark:text-lightSlate mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-border dark:border-slate/20 bg-background dark:bg-navy/50 text-foreground dark:text-lightSlate focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground dark:text-lightSlate mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-border dark:border-slate/20 bg-background dark:bg-navy/50 text-foreground dark:text-lightSlate focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              {status === 'error' && (
                <div className="text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className="text-green-500 text-sm">
                  Message sent successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center px-6 py-3 bg-teal text-white rounded-md hover:bg-teal/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

'use client';

import { useState } from 'react';

type ContactModalProps = {
  onClose: () => void;
  onSuccess: (message: string) => void;
  onFormFocusChange: (focused: boolean) => void;
};

export default function ContactModal({
  onClose,
  onSuccess,
  onFormFocusChange,
}: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      onSuccess('Your message has been sent!');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormFocusIn = (e: React.FocusEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      onFormFocusChange(true);
    }
  };

  const handleFormFocusOut = (e: React.FocusEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    requestAnimationFrame(() => {
      if (!form.contains(document.activeElement)) {
        onFormFocusChange(false);
      }
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9000] p-4"
      onClick={handleClose}
    >
      <div
        className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Get in touch</h3>
            <p className="text-sm text-gray-400 mt-1">Send me a message and I&apos;ll get back to you.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
            aria-label="Close contact form"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          onFocusCapture={handleFormFocusIn}
          onBlurCapture={handleFormFocusOut}
          className="space-y-4"
        >
          {submitError && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
              {submitError}
            </p>
          )}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300 mb-1.5">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1.5">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-gray-300 mb-1.5">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

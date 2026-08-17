'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CONTACT_EVENTS } from '@/lib/contact-events';

const ContactModal = dynamic(() => import('@/components/ContactModal'));
const ScheduleMeetingModal = dynamic(() => import('@/components/ScheduleMeetingModal'));

export default function ContactOverlay() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isModalInputFocused, setIsModalInputFocused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupMeetLink, setPopupMeetLink] = useState<string | null>(null);

  useEffect(() => {
    const onOpenContact = () => setShowContactModal(true);
    const onOpenSchedule = () => setShowScheduleModal(true);
    window.addEventListener(CONTACT_EVENTS.openContact, onOpenContact);
    window.addEventListener(CONTACT_EVENTS.openSchedule, onOpenSchedule);
    return () => {
      window.removeEventListener(CONTACT_EVENTS.openContact, onOpenContact);
      window.removeEventListener(CONTACT_EVENTS.openSchedule, onOpenSchedule);
    };
  }, []);

  useEffect(() => {
    if (!showPopup) return;
    const timer = setTimeout(() => {
      setShowPopup(false);
      setPopupMeetLink(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  useEffect(() => {
    if (!showContactModal && !showScheduleModal) {
      setIsModalInputFocused(false);
    }
  }, [showContactModal, showScheduleModal]);

  useEffect(() => {
    if (isModalInputFocused) {
      document.body.classList.add('contact-form-focus');
    } else {
      document.body.classList.remove('contact-form-focus');
    }

    return () => document.body.classList.remove('contact-form-focus');
  }, [isModalInputFocused]);

  const showSuccessToast = (message: string, meetLink?: string) => {
    setShowContactModal(false);
    setShowScheduleModal(false);
    setPopupMessage(message);
    setPopupMeetLink(meetLink ?? null);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMeetLink(null);
  };

  return (
    <>
      {showContactModal && (
        <ContactModal
          onClose={() => setShowContactModal(false)}
          onSuccess={(message) => showSuccessToast(message)}
          onFormFocusChange={setIsModalInputFocused}
        />
      )}

      {showScheduleModal && (
        <ScheduleMeetingModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          onSuccess={(meetLink) => showSuccessToast('Google Meet scheduled successfully!', meetLink)}
          onFormFocusChange={setIsModalInputFocused}
        />
      )}

      {showPopup && (
        <div className="fixed top-6 right-4 sm:top-8 sm:right-8 z-[9100] w-[calc(100%-2rem)] max-w-sm animate-fade-in-up">
          <div className="relative bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors text-lg leading-none"
              aria-label="Close notification"
            >
              ×
            </button>

            <div className="flex items-start gap-3 pr-6">
              <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white leading-snug">
                  {popupMessage}
                </p>
                {popupMeetLink && (
                  <a
                    href={popupMeetLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs text-blue-300 hover:text-blue-200 underline mt-1 inline-block break-all"
                  >
                    Open Google Meet link
                  </a>
                )}
                <p className="text-xs text-gray-400 mt-1">Just now</p>
                <button
                  type="button"
                  onClick={closePopup}
                  className="text-xs text-gray-400 hover:text-blue-300 transition-colors mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

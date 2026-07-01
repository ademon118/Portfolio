'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  formatDateKey,
  formatTimeLabel,
  getCalendarDays,
  getTimeSlotsForDate,
  startOfDay,
} from '@/lib/schedule';

type ScheduleMeetingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (meetLink: string) => void;
  onFormFocusChange: (focused: boolean) => void;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ScheduleMeetingModal({
  isOpen,
  onClose,
  onSuccess,
  onFormFocusChange,
}: ScheduleMeetingModalProps) {
  const today = startOfDay(new Date());
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);
  const timeSlots = useMemo(
    () => (selectedDate ? getTimeSlotsForDate(selectedDate) : []),
    [selectedDate]
  );

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(null);
      setSelectedTime('');
      setName('');
      setEmail('');
      setTopic('');
      setSubmitError('');
      setIsSubmitting(false);
      onFormFocusChange(false);
    }
  }, [isOpen, onFormFocusChange]);

  useEffect(() => {
    if (selectedDate && selectedTime && !timeSlots.includes(selectedTime)) {
      setSelectedTime('');
    }
  }, [selectedDate, selectedTime, timeSlots]);

  if (!isOpen) return null;

  const monthLabel = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setSubmitError('Please choose a date and time.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          date: formatDateKey(selectedDate),
          time: selectedTime,
          topic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule meeting.');
      }

      onSuccess(data.meetLink);
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to schedule meeting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9000] p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Schedule a meeting</h3>
            <p className="text-sm text-gray-400 mt-1">
              Pick a date and time — a Google Meet link will be created.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
            aria-label="Close scheduler"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          onFocusCapture={handleFormFocusIn}
          onBlurCapture={handleFormFocusOut}
          className="space-y-5"
        >
          {submitError && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
              {submitError}
            </p>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-300">Choose a date</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
                  }
                  className="w-8 h-8 rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-blue-400/40 transition-colors"
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <span className="text-sm text-white min-w-[120px] text-center">{monthLabel}</span>
                <button
                  type="button"
                  onClick={() =>
                    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
                  }
                  className="w-8 h-8 rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-blue-400/40 transition-colors"
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-center text-[10px] text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="h-9" />;
                }

                const isPast = day < today;
                const isSelected = selectedDate && formatDateKey(day) === formatDateKey(selectedDate);

                return (
                  <button
                    key={formatDateKey(day)}
                    type="button"
                    disabled={isPast}
                    onClick={() => setSelectedDate(day)}
                    className={`h-9 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? 'bg-white text-black'
                        : isPast
                          ? 'text-gray-600 cursor-not-allowed'
                          : 'text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Choose a time</p>
              {timeSlots.length === 0 ? (
                <p className="text-sm text-gray-500">No available slots for this date.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`px-2 py-2 rounded-xl text-xs sm:text-sm border transition-colors ${
                        selectedTime === slot
                          ? 'bg-white/15 border-white/70 text-white'
                          : 'border-white/10 text-gray-300 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {formatTimeLabel(slot)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="schedule-name" className="block text-sm text-gray-300 mb-1.5">
                Name
              </label>
              <input
                id="schedule-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="schedule-email" className="block text-sm text-gray-300 mb-1.5">
                Email
              </label>
              <input
                id="schedule-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="schedule-topic" className="block text-sm text-gray-300 mb-1.5">
              Topic (optional)
            </label>
            <input
              id="schedule-topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
              placeholder="What would you like to discuss?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !selectedDate || !selectedTime}
            className="w-full bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Google Meet...' : 'Schedule Google Meet'}
          </button>
        </form>
      </div>
    </div>
  );
}

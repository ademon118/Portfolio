export const CONTACT_EVENTS = {
  openContact: 'portfolio:open-contact',
  openSchedule: 'portfolio:open-schedule',
} as const;

export function openContactModal() {
  window.dispatchEvent(new Event(CONTACT_EVENTS.openContact));
}

export function openScheduleModal() {
  window.dispatchEvent(new Event(CONTACT_EVENTS.openSchedule));
}

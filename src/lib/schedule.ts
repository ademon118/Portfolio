export const TIMEZONE = 'Asia/Yangon';
export const WORK_START_HOUR = 9;
export const WORK_END_HOUR = 17;
export const SLOT_MINUTES = 30;

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getTimeSlotsForDate(date: Date): string[] {
  const slots: string[] = [];
  const now = new Date();
  const isToday = isSameDay(date, now);

  for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
    for (const minute of [0, 30]) {
      const slot = new Date(date);
      slot.setHours(hour, minute, 0, 0);

      if (isToday && slot <= now) continue;

      slots.push(
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      );
    }
  }

  return slots;
}

export function formatTimeLabel(time: string): string {
  const [hourStr, minuteStr] = time.split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

export function addMinutesToTime(time: string, minutesToAdd: number): string {
  const [hourStr, minuteStr] = time.split(':');
  const total = Number(hourStr) * 60 + Number(minuteStr) + minutesToAdd;
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function getCalendarDays(viewDate: Date): (Date | null)[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }

  return cells;
}

export const LANYARD_WS_URL = 'wss://api.lanyard.rest/socket';
export const LANYARD_REST_URL = 'https://api.lanyard.rest/v1/users';
export const DISCORD_USER_ID = '794148756290928653';

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface LanyardDiscordUser {
  id: string;
  username: string;
  display_name: string | null;
  global_name: string | null;
  avatar: string | null;
  discriminator: string;
}

export interface LanyardActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface LanyardActivityEmoji {
  id?: string;
  name: string;
  animated?: boolean;
}

export interface LanyardActivity {
  id?: string;
  name: string;
  type: number;
  application_id?: string;
  details?: string | null;
  state?: string | null;
  emoji?: LanyardActivityEmoji | null;
  assets?: LanyardActivityAssets;
  timestamps?: {
    start?: number;
    end?: number;
  };
}

export interface LanyardSpotify {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  track_id?: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardPresence {
  discord_user: LanyardDiscordUser;
  discord_status: DiscordStatus;
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
}

const ACTIVITY_TYPE_LABELS: Record<number, string> = {
  0: 'Playing',
  1: 'Streaming',
  2: 'Listening to',
  3: 'Watching',
  4: '',
  5: 'Competing in',
};

export function getActivityLabel(type: number): string {
  return ACTIVITY_TYPE_LABELS[type] ?? 'Using';
}

export function isSpotifyActivity(activity: LanyardActivity): boolean {
  return activity.name === 'Spotify' || activity.type === 2;
}

export function isCustomStatus(activity: LanyardActivity): boolean {
  return activity.type === 4;
}

export function isCodingActivity(activity: LanyardActivity): boolean {
  const name = activity.name.toLowerCase();
  return (
    name.includes('visual studio code') ||
    name === 'code' ||
    name.includes('cursor')
  );
}

/** Non-Spotify activities suitable for activity cards (includes custom status). */
export function getDisplayableActivities(activities: LanyardActivity[]): LanyardActivity[] {
  return activities.filter((activity) => !isSpotifyActivity(activity));
}

export function getCustomStatus(activities: LanyardActivity[]): LanyardActivity | null {
  return activities.find(isCustomStatus) ?? null;
}

export function getNonStatusActivities(activities: LanyardActivity[]): LanyardActivity[] {
  return activities.filter(
    (activity) => !isSpotifyActivity(activity) && !isCustomStatus(activity)
  );
}

export function getCodingWorkspace(activity: LanyardActivity): string | null {
  const raw = activity.state?.trim();
  if (!raw) return null;
  return raw.replace(/^Workspace:\s*/i, '').trim() || null;
}

export function getDiscordAvatarUrl(user: LanyardDiscordUser): string {
  if (user.avatar) {
    const isAnimated = user.avatar.startsWith('a_');
    const ext = isAnimated ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
  }
  const defaultIndex = Number(BigInt(user.id) >> BigInt(22)) % 6;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
}

export function getDisplayName(user: LanyardDiscordUser): string {
  return user.display_name || user.global_name || user.username;
}

export function getStatusColor(status: DiscordStatus): string {
  switch (status) {
    case 'online':
      return '#22c55e';
    case 'idle':
      return '#eab308';
    case 'dnd':
      return '#ef4444';
    default:
      return '#6b7280';
  }
}

export function getStatusLabel(status: DiscordStatus): string {
  switch (status) {
    case 'online':
      return 'Online';
    case 'idle':
      return 'Idle';
    case 'dnd':
      return 'Do Not Disturb';
    default:
      return 'Offline';
  }
}

export function getActivityAssetUrl(activity: LanyardActivity): string | null {
  const image = activity.assets?.large_image;
  if (!image) return null;

  if (image.startsWith('mp:')) {
    return `https://media.discordapp.net/${image.slice(3)}`;
  }

  if (image.startsWith('spotify:')) {
    return `https://i.scdn.co/image/${image.replace('spotify:', '')}`;
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
  }

  return null;
}

export function getSpotifyTrackUrl(spotify: LanyardSpotify): string | null {
  if (!spotify.track_id) return null;
  return `https://open.spotify.com/track/${spotify.track_id}`;
}

export function getEmojiDisplay(emoji: LanyardActivityEmoji | null | undefined): string | null {
  if (!emoji) return null;
  if (emoji.id) {
    const ext = emoji.animated ? 'gif' : 'png';
    return `https://cdn.discordapp.com/emojis/${emoji.id}.${ext}?size=32&quality=lossless`;
  }
  return emoji.name || null;
}

export function formatElapsed(startMs: number, nowMs: number = Date.now()): string {
  const totalSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  }
  return `${seconds}s`;
}

export function formatClock(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getSpotifyProgress(
  spotify: LanyardSpotify,
  nowMs: number = Date.now()
): { progress: number; current: string; total: string; percent: number } {
  const start = spotify.timestamps.start;
  const end = spotify.timestamps.end;
  const duration = Math.max(1, end - start);
  const elapsed = Math.min(duration, Math.max(0, nowMs - start));
  return {
    progress: elapsed,
    current: formatClock(elapsed),
    total: formatClock(duration),
    percent: Math.min(100, (elapsed / duration) * 100),
  };
}

export async function fetchLanyardPresence(
  userId: string = DISCORD_USER_ID
): Promise<LanyardPresence | null> {
  try {
    const response = await fetch(`${LANYARD_REST_URL}/${userId}`, {
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const json = (await response.json()) as {
      success: boolean;
      data?: LanyardPresence;
    };
    return json.success && json.data ? json.data : null;
  } catch {
    return null;
  }
}

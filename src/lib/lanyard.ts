export const LANYARD_WS_URL = 'wss://api.lanyard.rest/socket';
export const LANYARD_REST_URL = 'https://api.lanyard.rest/v1/users';
export const DISCORD_USER_ID = '794148756290928653';
export const DISCORD_PROFILE_URL = `https://discord.com/users/${DISCORD_USER_ID}`;
export const LANYARD_INVITE_URL = 'https://discord.gg/UrXF2cfJ7F';

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface LanyardAvatarDecoration {
  asset: string;
  sku_id?: string;
  expires_at?: number | null;
}

export interface LanyardPrimaryGuild {
  identity_guild_id: string | null;
  identity_enabled: boolean | null;
  tag: string | null;
  badge: string | null;
}

export interface LanyardDiscordUser {
  id: string;
  username: string;
  display_name: string | null;
  global_name: string | null;
  avatar: string | null;
  discriminator: string;
  avatar_decoration_data?: LanyardAvatarDecoration | null;
  primary_guild?: LanyardPrimaryGuild | null;
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

/** Map a VS Code workspace name to a portfolio route when possible. */
export function getCodingWorkspaceHref(workspace: string | null): string | null {
  if (!workspace) return null;
  const value = workspace.toLowerCase().trim();

  if (value.includes('portfolio')) return '/#projects';
  if (value.includes('student')) return '/projects/students-listener';
  if (value.includes('water')) return '/projects/water-intake-tracker';
  if (value.includes('anime') && value.includes('mobile')) return '/projects/anime-updates-mobile';
  if (value.includes('anime')) return '/projects/anime-updates-app';

  return null;
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

export function getAvatarDecorationUrl(user: LanyardDiscordUser): string | null {
  const asset = user.avatar_decoration_data?.asset;
  if (!asset) return null;
  return `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=160&passthrough=true`;
}

export function getClanBadgeUrl(user: LanyardDiscordUser): string | null {
  const guild = user.primary_guild;
  if (!guild?.identity_enabled || !guild.identity_guild_id || !guild.badge) return null;
  return `https://cdn.discordapp.com/clan-badges/${guild.identity_guild_id}/${guild.badge}.png?size=16`;
}

export function getClanTag(user: LanyardDiscordUser): string | null {
  const guild = user.primary_guild;
  if (!guild?.identity_enabled || !guild.tag) return null;
  return guild.tag;
}

export function getDisplayName(user: LanyardDiscordUser): string {
  return user.display_name || user.global_name || user.username;
}

export function getStatusColor(status: DiscordStatus): string {
  switch (status) {
    case 'online':
      return '#23a55a';
    case 'idle':
      return '#f0b232';
    case 'dnd':
      return '#f23f43';
    default:
      return '#80848e';
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

export function formatRelativeTime(fromMs: number, nowMs: number = Date.now()): string {
  const seconds = Math.max(0, Math.floor((nowMs - fromMs) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
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

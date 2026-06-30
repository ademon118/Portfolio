export const LANYARD_WS_URL = 'wss://api.lanyard.rest/socket';
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

export interface LanyardActivity {
  name: string;
  type: number;
  details?: string | null;
  state?: string | null;
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

export function getDiscordAvatarUrl(user: LanyardDiscordUser): string {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
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

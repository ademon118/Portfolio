'use client';

import { useEffect, useState } from 'react';
import { useLanyard } from '@/hooks/useLanyard';
import {
  formatElapsed,
  getActivityAssetUrl,
  getActivityLabel,
  getCodingWorkspace,
  getCustomStatus,
  getDiscordAvatarUrl,
  getDisplayName,
  getEmojiDisplay,
  getNonStatusActivities,
  getSpotifyProgress,
  getSpotifyTrackUrl,
  getStatusColor,
  getStatusLabel,
  isCodingActivity,
  type LanyardActivity,
  type LanyardSpotify,
} from '@/lib/lanyard';

function PlatformBadge({ label, active }: { label: string; active: boolean }) {
  if (!active) return null;

  return (
    <span className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider border border-blue-400/40 bg-blue-500/10 text-blue-200">
      {label}
    </span>
  );
}

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
}

function SpotifyCard({ spotify }: { spotify: LanyardSpotify }) {
  const now = useNow();
  const progress = getSpotifyProgress(spotify, now);
  const trackUrl = getSpotifyTrackUrl(spotify);

  const content = (
    <>
      <img
        src={spotify.album_art_url}
        alt={spotify.album}
        className="w-14 h-14 rounded-lg shadow-md shrink-0"
      />
      <div className="min-w-0 flex-1 w-full">
        <p className="text-xs text-[#1db954] uppercase tracking-wider mb-1">
          Listening to Spotify
        </p>
        <p className="text-white font-medium break-words leading-snug">
          {spotify.song}
        </p>
        <p className="text-sm text-gray-400 break-words mt-0.5 leading-snug">
          by {spotify.artist}
        </p>

        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1db954] transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 tabular-nums">
            <span>{progress.current}</span>
            <span>{progress.total}</span>
          </div>
        </div>
      </div>
    </>
  );

  if (trackUrl) {
    return (
      <a
        href={trackUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-[#1db954]/10 border border-[#1db954]/30 w-full hover:bg-[#1db954]/15 hover:border-[#1db954]/50 transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-[#1db954]/10 border border-[#1db954]/30 w-full">
      {content}
    </div>
  );
}

function ActivityCard({ activity, now }: { activity: LanyardActivity; now: number }) {
  const iconUrl = getActivityAssetUrl(activity);
  const elapsed =
    activity.timestamps?.start != null
      ? formatElapsed(activity.timestamps.start, now)
      : null;

  if (isCodingActivity(activity)) {
    const workspace = getCodingWorkspace(activity);
    return (
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
        {iconUrl && (
          <img
            src={iconUrl}
            alt=""
            className="w-12 h-12 rounded-xl border border-white/10 shrink-0 bg-black/40"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">
            Coding{elapsed ? ` · ${elapsed}` : ''}
          </p>
          <p className="text-white font-medium break-words">
            {workspace ?? 'Working on something'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
      {iconUrl && (
        <img
          src={iconUrl}
          alt=""
          className="w-12 h-12 rounded-xl border border-white/10 shrink-0 bg-black/40"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">
          {getActivityLabel(activity.type)} {activity.name}
          {elapsed ? ` · ${elapsed}` : ''}
        </p>
        {activity.details && (
          <p className="text-white font-medium break-words">{activity.details}</p>
        )}
        {activity.state && (
          <p className="text-sm text-gray-400 break-words">{activity.state}</p>
        )}
      </div>
    </div>
  );
}

function CustomStatusBubble({ activity }: { activity: LanyardActivity }) {
  const emoji = getEmojiDisplay(activity.emoji);
  const text = activity.state || activity.name;
  if (!text && !emoji) return null;

  return (
    <div
      className="absolute -top-3 left-11 z-20 flex items-center pointer-events-none"
      aria-label={`Status: ${text ?? ''}`}
    >
      {/* Discord-style thought-bubble dots */}
      <span className="absolute left-0 top-6 w-1.5 h-1.5 rounded-full bg-[#111214] border border-white/10" />
      <span className="absolute left-2 top-3 w-2.5 h-2.5 rounded-full bg-[#111214] border border-white/10" />

      <div className="ml-4 max-w-[10rem] sm:max-w-[13rem] rounded-2xl bg-[#111214] border border-white/10 px-3 py-1.5 shadow-lg shadow-black/40">
        <div className="flex items-center gap-1.5 min-w-0">
          {emoji &&
            (emoji.startsWith('http') ? (
              <img src={emoji} alt="" className="w-4 h-4 shrink-0" />
            ) : (
              <span className="text-sm leading-none shrink-0">{emoji}</span>
            ))}
          {text && (
            <span className="text-[13px] leading-snug text-[#dbdee1] truncate">
              {text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WhatImDoingNow() {
  const { presence, connectionState } = useLanyard();
  const now = useNow();

  const isLoading = connectionState === 'connecting' && !presence;
  const user = presence?.discord_user;
  const status = presence?.discord_status ?? 'offline';
  const listeningToSpotify = Boolean(presence?.listening_to_spotify && presence.spotify);
  const customStatus = getCustomStatus(presence?.activities ?? []);
  const activities = getNonStatusActivities(presence?.activities ?? []);

  const activePlatforms = [
    { label: 'Desktop', active: presence?.active_on_discord_desktop ?? false },
    { label: 'Mobile', active: presence?.active_on_discord_mobile ?? false },
    { label: 'Web', active: presence?.active_on_discord_web ?? false },
  ].filter((p) => p.active);

  return (
    <section id="now" className="py-8 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden z-10">
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 sm:mb-10 text-white px-2">
          What I&apos;m doing now
        </h2>

        <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden hover:border-blue-400/40 transition-all duration-300">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          {isLoading ? (
            <div className="relative z-10 flex items-center gap-4 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-48 bg-white/10 rounded" />
                <div className="h-3 w-24 bg-white/10 rounded" />
              </div>
            </div>
          ) : user ? (
            <div className={`relative z-10 space-y-4 sm:space-y-5 ${customStatus ? 'pt-2' : ''}`}>
              {/* Profile row */}
              <div className={`flex gap-3 sm:gap-4 min-w-0 ${customStatus ? 'items-end' : 'items-center'}`}>
                <div className="relative shrink-0 w-16 h-16">
                  <img
                    src={getDiscordAvatarUrl(user)}
                    alt={getDisplayName(user)}
                    className="w-16 h-16 rounded-full object-cover border-[3px] border-[#0a0a0a] shadow-lg shadow-blue-500/20"
                  />
                  <span
                    className="absolute bottom-0 right-0 w-[18px] h-[18px] rounded-full border-[3px] border-[#0a0a0a]"
                    style={{ backgroundColor: getStatusColor(status) }}
                    title={getStatusLabel(status)}
                  />
                  {customStatus && <CustomStatusBubble activity={customStatus} />}
                </div>

                <div className={`min-w-0 flex-1 ${customStatus ? 'pb-0.5' : ''}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-white truncate">
                      {getDisplayName(user)}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border shrink-0"
                      style={{
                        color: getStatusColor(status),
                        borderColor: `${getStatusColor(status)}40`,
                        backgroundColor: `${getStatusColor(status)}15`,
                      }}
                    >
                      {getStatusLabel(status)}
                    </span>
                  </div>
                  {/* <p className="text-sm text-gray-400 truncate">@{user.username}</p> */}
                </div>
              </div>

              {/* Activity row — full width */}
              {listeningToSpotify || activities.length > 0 ? (
                <div className="space-y-3">
                  {listeningToSpotify && presence?.spotify && (
                    <SpotifyCard spotify={presence.spotify} />
                  )}

                  {activities.map((activity) => (
                    <ActivityCard
                      key={`${activity.id ?? activity.name}-${activity.type}-${activity.state ?? ''}-${activity.details ?? ''}`}
                      activity={activity}
                      now={now}
                    />
                  ))}
                </div>
              ) : !customStatus ? (
                <p className="text-gray-400 text-sm">
                  {status === 'offline'
                    ? 'Currently offline on Discord.'
                    : 'Not doing anything specific right now — probably coding something cool.'}
                </p>
              ) : null}

              {activePlatforms.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activePlatforms.map((platform) => (
                    <PlatformBadge
                      key={platform.label}
                      label={platform.label}
                      active={platform.active}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="relative z-10 text-center text-gray-400 text-sm">
              Could not load Discord presence. Make sure you&apos;ve joined the{' '}
              <a
                href="https://discord.gg/UrXF2cfJ7F"
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Lanyard Discord server
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

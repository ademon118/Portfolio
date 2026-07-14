'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanyard } from '@/hooks/useLanyard';
import {
  DISCORD_PROFILE_URL,
  LANYARD_INVITE_URL,
  formatElapsed,
  formatRelativeTime,
  getActivityAssetUrl,
  getActivityLabel,
  getAvatarDecorationUrl,
  getClanBadgeUrl,
  getClanTag,
  getCodingWorkspace,
  getCodingWorkspaceHref,
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
  type DiscordStatus,
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
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, reduceMotion]);

  return { now, reduceMotion };
}

function StatusIndicator({ status }: { status: DiscordStatus }) {
  const color = getStatusColor(status);
  const label = getStatusLabel(status);

  return (
    <span
      className="absolute bottom-0 right-0 w-[18px] h-[18px] rounded-full border-[3px] border-[#0a0a0a] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: color }}
      title={label}
      aria-label={label}
    >
      {status === 'idle' && (
        <span className="absolute -left-[3px] -top-[3px] w-[11px] h-[11px] rounded-full bg-[#0a0a0a]" />
      )}
      {status === 'dnd' && (
        <span className="w-[8px] h-[2px] rounded-full bg-[#0a0a0a]" />
      )}
      {status === 'offline' && (
        <span className="w-[6px] h-[6px] rounded-full bg-[#0a0a0a]" />
      )}
    </span>
  );
}

function SpotifyCard({
  spotify,
  now,
  reduceMotion,
}: {
  spotify: LanyardSpotify;
  now: number;
  reduceMotion: boolean;
}) {
  const progress = getSpotifyProgress(spotify, now);
  const trackUrl = getSpotifyTrackUrl(spotify);

  const content = (
    <>
      <div className="relative shrink-0">
        <div
          className="absolute inset-0 rounded-xl blur-xl opacity-50 scale-110 pointer-events-none motion-reduce:hidden"
          style={{
            backgroundImage: `url(${spotify.album_art_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden
        />
        <img
          src={spotify.album_art_url}
          alt={spotify.album}
          className="relative w-14 h-14 rounded-lg shadow-md"
        />
      </div>
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
              className={`h-full rounded-full bg-[#1db954] ${
                reduceMotion ? '' : 'transition-[width] duration-1000 ease-linear'
              }`}
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

  const className =
    'relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-[#1db954]/10 border border-[#1db954]/30 w-full hover:bg-[#1db954]/15 hover:border-[#1db954]/50 transition-colors';

  if (trackUrl) {
    return (
      <a href={trackUrl} target="_blank" rel="noreferrer noopener" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

function ActivityCard({ activity, now }: { activity: LanyardActivity; now: number }) {
  const iconUrl = getActivityAssetUrl(activity);
  const elapsed =
    activity.timestamps?.start != null
      ? formatElapsed(activity.timestamps.start, now)
      : null;

  if (isCodingActivity(activity)) {
    const workspace = getCodingWorkspace(activity);
    const href = getCodingWorkspaceHref(workspace);
    const body = (
      <>
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
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.07] transition-colors"
        >
          {body}
        </Link>
      );
    }

    return (
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
        {body}
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
      className="absolute -top-3 left-10 sm:left-11 z-20 flex items-center pointer-events-auto"
      aria-label={`Status: ${text ?? ''}`}
      title={text ?? undefined}
    >
      <span className="absolute left-0 top-5 sm:top-6 w-1.5 h-1.5 rounded-full bg-[#111214] border border-white/10" />
      <span className="absolute left-1.5 sm:left-2 top-2.5 sm:top-3 w-2.5 h-2.5 rounded-full bg-[#111214] border border-white/10" />

      <div className="ml-3.5 sm:ml-4 max-w-[8rem] sm:max-w-[13rem] rounded-2xl bg-[#111214] border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg shadow-black/40">
        <div className="flex items-center gap-1.5 min-w-0">
          {emoji &&
            (emoji.startsWith('http') ? (
              <img src={emoji} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            ) : (
              <span className="text-sm leading-none shrink-0">{emoji}</span>
            ))}
          {text && (
            <span className="text-[12px] sm:text-[13px] leading-snug text-[#dbdee1] truncate">
              {text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WhatImDoingNow() {
  const { presence, connectionState, lastSeenAt, errorMessage } = useLanyard();
  const { now, reduceMotion } = useNow();
  const [dismissedError, setDismissedError] = useState(false);

  const isLoading = connectionState === 'connecting' && !presence;
  const user = presence?.discord_user;
  const status = presence?.discord_status ?? 'offline';
  const listeningToSpotify = Boolean(presence?.listening_to_spotify && presence.spotify);
  const customStatus = getCustomStatus(presence?.activities ?? []);
  const activities = getNonStatusActivities(presence?.activities ?? []);
  const decorationUrl = user ? getAvatarDecorationUrl(user) : null;
  const clanTag = user ? getClanTag(user) : null;
  const clanBadgeUrl = user ? getClanBadgeUrl(user) : null;

  const activePlatforms = [
    { label: 'Desktop', active: presence?.active_on_discord_desktop ?? false },
    { label: 'Mobile', active: presence?.active_on_discord_mobile ?? false },
    { label: 'Web', active: presence?.active_on_discord_web ?? false },
  ].filter((p) => p.active);

  const showErrorToast = Boolean(errorMessage) && !dismissedError && !presence;

  useEffect(() => {
    if (!errorMessage) setDismissedError(false);
  }, [errorMessage]);

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

          {showErrorToast && (
            <div className="relative z-20 mb-4 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2.5 text-xs text-amber-100">
              <span className="mt-0.5 shrink-0">⚠</span>
              <p className="flex-1 min-w-0 leading-relaxed">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setDismissedError(true)}
                className="text-amber-200/80 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="relative z-10 flex items-center gap-4 animate-pulse motion-reduce:animate-none">
              <div className="w-16 h-16 rounded-full bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-24 bg-white/10 rounded" />
              </div>
            </div>
          ) : user ? (
            <div className={`relative z-10 space-y-4 sm:space-y-5 ${customStatus ? 'pt-2' : ''}`}>
              <div
                className={`flex gap-3 sm:gap-4 min-w-0 ${
                  customStatus ? 'items-end' : 'items-center'
                }`}
              >
                <a
                  href={DISCORD_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="relative shrink-0 w-16 h-16 group"
                  aria-label={`Open ${getDisplayName(user)} on Discord`}
                >
                  <img
                    src={getDiscordAvatarUrl(user)}
                    alt={getDisplayName(user)}
                    className="w-16 h-16 rounded-full object-cover border-[3px] border-[#0a0a0a] shadow-lg shadow-blue-500/20 group-hover:brightness-110 transition"
                  />
                  {decorationUrl && (
                    <img
                      src={decorationUrl}
                      alt=""
                      className="absolute inset-[-6px] w-[76px] h-[76px] max-w-none pointer-events-none select-none"
                    />
                  )}
                  <StatusIndicator status={status} />
                  {customStatus && <CustomStatusBubble activity={customStatus} />}
                </a>

                <div className={`min-w-0 flex-1 ${customStatus ? 'pb-0.5' : ''}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={DISCORD_PROFILE_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xl font-semibold text-white truncate hover:text-blue-200 transition-colors"
                    >
                      {getDisplayName(user)}
                    </a>

                    {clanTag && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[11px] font-semibold text-gray-200">
                        {clanBadgeUrl && (
                          <img src={clanBadgeUrl} alt="" className="w-3.5 h-3.5" />
                        )}
                        {clanTag}
                      </span>
                    )}

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
                </div>
              </div>

              {listeningToSpotify || activities.length > 0 ? (
                <div className="space-y-3">
                  {listeningToSpotify && presence?.spotify && (
                    <SpotifyCard
                      spotify={presence.spotify}
                      now={now}
                      reduceMotion={reduceMotion}
                    />
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
                    ? lastSeenAt
                      ? `Currently offline — last seen ${formatRelativeTime(lastSeenAt, now)}.`
                      : 'Currently offline on Discord.'
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
            <div className="relative z-10 text-center space-y-3">
              <p className="text-gray-400 text-sm">
                {errorMessage || 'Could not load Discord presence right now.'}
              </p>
              <a
                href={LANYARD_INVITE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Join the Lanyard Discord server
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

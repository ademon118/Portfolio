'use client';

import { useLanyard } from '@/hooks/useLanyard';
import {
  getActivityLabel,
  getDiscordAvatarUrl,
  getDisplayName,
  getStatusColor,
  getStatusLabel,
} from '@/lib/lanyard';

function PlatformBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider border ${
        active
          ? 'border-blue-400/40 bg-blue-500/10 text-blue-200'
          : 'border-white/5 bg-white/[0.02] text-gray-600'
      }`}
    >
      {label}
    </span>
  );
}

export default function WhatImDoingNow() {
  const { presence, connectionState } = useLanyard();

  const isLoading = connectionState === 'connecting' && !presence;
  const user = presence?.discord_user;
  const status = presence?.discord_status ?? 'offline';
  const primaryActivity = presence?.activities?.[0];

  return (
    <section id="now" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5" />
      <div className="absolute top-10 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-6 sm:mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
          What I&apos;m doing now
        </h2>

        <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden hover:border-blue-400/40 transition-all duration-300">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          {isLoading ? (
            <div className="relative z-10 flex items-center gap-4 animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-48 bg-white/10 rounded" />
                <div className="h-3 w-24 bg-white/10 rounded" />
              </div>
            </div>
          ) : user ? (
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative shrink-0">
                <img
                  src={getDiscordAvatarUrl(user)}
                  alt={getDisplayName(user)}
                  className="w-16 h-16 rounded-2xl border border-white/20 shadow-lg shadow-blue-500/20"
                />
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0f0b21]"
                  style={{ backgroundColor: getStatusColor(status) }}
                  title={getStatusLabel(status)}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-white">
                      {getDisplayName(user)}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        color: getStatusColor(status),
                        borderColor: `${getStatusColor(status)}40`,
                        backgroundColor: `${getStatusColor(status)}15`,
                      }}
                    >
                      {getStatusLabel(status)}
                    </span>
                    {connectionState === 'connected' && (
                      <span className="flex items-center gap-1 text-[10px] text-green-400/80 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>

                {presence?.listening_to_spotify && presence.spotify ? (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1db954]/10 border border-[#1db954]/30">
                    <img
                      src={presence.spotify.album_art_url}
                      alt={presence.spotify.album}
                      className="w-14 h-14 rounded-lg shadow-md"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-[#1db954] uppercase tracking-wider mb-1">
                        Listening to Spotify
                      </p>
                      <p className="text-white font-medium truncate">
                        {presence.spotify.song}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        by {presence.spotify.artist}
                      </p>
                    </div>
                  </div>
                ) : primaryActivity ? (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">
                      {getActivityLabel(primaryActivity.type)}{' '}
                      {primaryActivity.type !== 4 ? primaryActivity.name : ''}
                    </p>
                    {primaryActivity.details && (
                      <p className="text-white font-medium">{primaryActivity.details}</p>
                    )}
                    {primaryActivity.state && (
                      <p className="text-sm text-gray-400">{primaryActivity.state}</p>
                    )}
                    {!primaryActivity.details && !primaryActivity.state && primaryActivity.type === 4 && (
                      <p className="text-white font-medium">{primaryActivity.name}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    {status === 'offline'
                      ? 'Currently offline on Discord.'
                      : 'Not doing anything specific right now — probably coding something cool.'}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  <PlatformBadge label="Desktop" active={presence?.active_on_discord_desktop ?? false} />
                  <PlatformBadge label="Mobile" active={presence?.active_on_discord_mobile ?? false} />
                  <PlatformBadge label="Web" active={presence?.active_on_discord_web ?? false} />
                </div>
              </div>
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

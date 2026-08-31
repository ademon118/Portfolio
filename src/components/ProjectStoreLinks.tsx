type ProjectStoreLinksProps = {
  iosUrl?: string;
  androidUrl?: string;
  className?: string;
  variant?: 'card' | 'detail';
};

export default function ProjectStoreLinks({
  iosUrl,
  androidUrl,
  className = '',
  variant = 'card',
}: ProjectStoreLinksProps) {
  if (!iosUrl && !androidUrl) return null;

  const baseClass =
    variant === 'card'
      ? 'pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs text-gray-200 hover:bg-white/15 hover:border-white/70 transition-colors'
      : 'inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-500/20 px-4 py-1.5 text-xs text-emerald-50 hover:bg-emerald-400/40 transition-colors';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {iosUrl && (
        <a href={iosUrl} target="_blank" rel="noreferrer noopener" className={baseClass}>
          <span>App Store</span>
        </a>
      )}
      {androidUrl && (
        <a href={androidUrl} target="_blank" rel="noreferrer noopener" className={baseClass}>
          <span>Google Play</span>
        </a>
      )}
    </div>
  );
}

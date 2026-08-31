import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProjectStoreLinks from '@/components/ProjectStoreLinks';
import { getProjectBySlug, projects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  const heroImage = project.images?.[0];
  const secondaryImages = project.images?.slice(1) ?? [];
  const isMobileDemo = project.demoLayout === 'mobile';
  const isMobileScreenshots =
    (project.screenshotLayout ?? project.demoLayout) === 'mobile';

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5">
              ←
            </span>
            <span>Back to projects</span>
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 py-1.5 text-sm text-gray-200 hover:bg-white/15 hover:border-white/70 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>View on GitHub</span>
            </a>
          )}
        </div>

        <header
          className={`mb-10 ${
            isMobileDemo
              ? 'grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start'
              : ''
          }`}
        >
          <div className={isMobileDemo ? '' : 'max-w-3xl'}>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-200 mb-4">
              <span className="text-lg" aria-hidden>
                {project.emoji}
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>{project.category}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>{project.timeline}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-gray-300">
              {project.tagline}
            </p>
          </div>

          {heroImage && isMobileDemo && (
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] justify-self-center md:justify-self-end md:ml-auto">
              <div className="relative w-full aspect-[1179/2556] rounded-[32px] border border-white/10 bg-black overflow-hidden shadow-[0_25px_60px_rgba(15,23,42,0.8)]">
                <Image
                  src={heroImage}
                  alt={`${project.title} demo`}
                  fill
                  className="object-contain"
                  sizes="300px"
                  quality={75}
                  priority
                />
              </div>
            </div>
          )}

          {heroImage && !isMobileDemo && (
            <div className="mt-8 relative w-full col-span-full">
              <div className="relative w-full aspect-[2880/1624] rounded-[32px] border border-white/10 bg-black overflow-hidden shadow-[0_25px_60px_rgba(15,23,42,0.8)]">
                <Image
                  src={heroImage}
                  alt={`${project.title} demo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  quality={75}
                  priority
                />
              </div>
            </div>
          )}
        </header>

        <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] mb-12">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5">
              <h2 className="text-sm font-semibold text-gray-200 mb-2">
                Overview
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-5">
              <h2 className="text-sm font-semibold text-blue-100 mb-3">
                Highlights
              </h2>
              <ul className="space-y-2.5">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-blue-100/90">
                    <span
                      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold text-gray-100 mb-2">
                Tech stack / tools used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-black/40 border border-white/15 px-3 py-1 text-xs text-gray-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold text-gray-100 mb-2">
                Project info
              </h2>
              <dl className="space-y-2 text-xs text-gray-200">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Category</dt>
                  <dd className="text-right">{project.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Timeline</dt>
                  <dd className="text-right">{project.timeline}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Role</dt>
                  <dd className="text-right">{project.role}</dd>
                </div>
              </dl>
            </div>

            {project.storeLinks && (project.storeLinks.ios || project.storeLinks.android) && (
              <div className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-5">
                <h2 className="text-sm font-semibold text-emerald-100 mb-2">
                  Get the app
                </h2>
                <p className="text-xs text-emerald-100/80 mb-3">
                  Available on the App Store and Google Play for Edunburgh Elevator customers.
                </p>
                <ProjectStoreLinks
                  iosUrl={project.storeLinks.ios}
                  androidUrl={project.storeLinks.android}
                  variant="detail"
                />
              </div>
            )}

            {project.demoAccount && (
              <div className="rounded-3xl border border-blue-400/40 bg-blue-500/10 p-5">
                <h2 className="text-sm font-semibold text-blue-100 mb-2">
                  Test account
                </h2>
                {project.demoAccount.note && (
                  <p className="text-xs text-blue-100/80 mb-3">{project.demoAccount.note}</p>
                )}
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-blue-200/70">Username</dt>
                    <dd className="font-mono text-blue-50">{project.demoAccount.username}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-blue-200/70">Password</dt>
                    <dd className="font-mono text-blue-50">{project.demoAccount.password}</dd>
                  </div>
                </dl>
              </div>
            )}

            {project.liveUrl && project.liveUrl.trim().length > 0 && (
              <div className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-5">
                <h2 className="text-sm font-semibold text-emerald-100 mb-2">
                  {project.liveLabel ?? "Live demo"}
                </h2>
                <p className="text-xs text-emerald-100/80 mb-3">
                  {project.liveLabel === "Download"
                    ? "Download the Android APK to try this app on your device."
                    : "Explore the running version of this project in your browser."}
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-500/20 px-4 py-1.5 text-xs text-emerald-50 hover:bg-emerald-400/40 transition-colors"
                >
                  <span>
                    {project.liveLabel === "Download"
                      ? "Download APK"
                      : "Open live site"}
                  </span>
                </a>
              </div>
            )}
          </aside>
        </section>

        {secondaryImages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">Screenshots</h2>
            <div className={`grid gap-4 ${isMobileScreenshots ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {secondaryImages.map((src, index) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${
                    isMobileScreenshots ? 'aspect-[1179/2556]' : 'aspect-video'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${index + 2}`}
                    fill
                    className="object-contain bg-black"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={70}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}



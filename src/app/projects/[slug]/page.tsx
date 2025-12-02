import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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

  return (
    <main className="min-h-screen bg-[#050515] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.2),_transparent_55%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/#case-studies"
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
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/60 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-100 hover:bg-blue-500/20 hover:border-blue-300 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>View on GitHub</span>
            </a>
          )}
        </div>

        <header className="mb-10 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] items-start">
          <div>
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
            <p className="text-base md:text-lg text-gray-300 max-w-2xl">
              {project.tagline}
            </p>
          </div>

          {heroImage && (
            <div className="relative w-full max-w-md ml-auto">
              <div className="relative aspect-[4/5] rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] overflow-hidden shadow-[0_25px_60px_rgba(15,23,42,0.8)]">
                <Image
                  src={heroImage}
                  alt={`${project.title} demo`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-5">
              <h2 className="text-sm font-semibold text-gray-100 mb-3">
                Highlights
              </h2>
              <ul className="space-y-2 text-sm text-gray-100">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>{item}</span>
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

            {project.liveUrl && project.liveUrl.trim().length > 0 && (
              <div className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-5">
                <h2 className="text-sm font-semibold text-emerald-100 mb-2">
                  Live demo
                </h2>
                <p className="text-xs text-emerald-100/80 mb-3">
                  Explore the running version of this project in your browser.
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-500/20 px-4 py-1.5 text-xs text-emerald-50 hover:bg-emerald-400/40 transition-colors"
                >
                  <span>Open live site</span>
                </a>
              </div>
            )}

            {secondaryImages.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <h2 className="text-sm font-semibold text-gray-100 mb-2">
                  Screenshots
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {secondaryImages.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} extra screenshot`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}



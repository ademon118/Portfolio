import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-12 sm:py-20 md:py-24 px-6 relative overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
              Selected work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Projects that I&apos;ve built
            </h2>
            <p className="mt-3 sm:mt-4 text-gray-400 max-w-2xl">
              A mix of client work and personal projects that show how I design, build,
              and ship mobile experiences from idea to production.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-4 sm:p-6 flex flex-col overflow-hidden hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-300 cursor-pointer"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-[1]"
                aria-label={`View ${project.title} details`}
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-transparent blur-3xl" />
              </div>

              <div className="relative z-[2] pointer-events-none flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">
                    <span aria-hidden>{project.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-blue-200/80 uppercase tracking-[0.2em]">
                      {project.timeline} • {project.role}
                    </p>
                  </div>
                </div>
              </div>

              <p className="relative z-[2] pointer-events-none text-sm text-gray-300 mb-4 line-clamp-3">
                {project.tagline}
              </p>

              <div className="relative z-[2] pointer-events-none flex flex-wrap gap-2 mb-5">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="relative z-[2] mt-auto flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs text-gray-200 hover:bg-white/15 hover:border-white/70 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span>View code</span>
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl.trim().length > 0 && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs text-gray-200 hover:bg-white/15 hover:border-white/70 transition-colors"
                    >
                      <span>{project.liveLabel ?? 'Live demo'}</span>
                    </a>
                  )}
                </div>

                <span className="pointer-events-none inline-flex items-center gap-1.5 text-xs text-gray-200 group-hover:text-white transition-colors">
                  <span>View details</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover:bg-blue-500 group-hover:border-blue-300 transition-all">
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 11L11 5M7 5H11V9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

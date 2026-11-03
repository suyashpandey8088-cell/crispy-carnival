import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Github,
  ExternalLink,
} from "lucide-react";
import { projects } from "@/lib/content";
import { Header, Footer, ProjectVisual } from "@/components/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p ? `${p.title} — Suyash Pandey` : "Exploration not found",
    description: p?.description,
  };
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <Header />
      <main id="main" className="detail-main section-wrap">
        <Link href="/#work" className="back-link">
          <ArrowLeft size={15} />
          Back to the explorations
        </Link>
        <div className="detail-eyebrow mono">
          <span>
            EXPLORATION {project.number} / {project.category}
          </span>
          <span>{project.year}</span>
        </div>
        <h1 className="detail-heading">{project.title}</h1>
        <p className="detail-description">{project.description}</p>
        <div className="detail-visual">
          <ProjectVisual visual={project.visual} large />
        </div>
        <div className="detail-content">
          <aside className="detail-aside">
            <span className="mono">THE TOOLKIT · PROPOSED / EDITABLE</span>
            <div className="detail-tags">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="detail-links">
              {project.github ? (
                <a
                  href={project.github}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={15} />
                  View source
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="unavailable-link">
                  <Github size={15} />
                  Source link pending
                </span>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={15} />
                  Live experience
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="unavailable-link">
                  <ExternalLink size={15} />
                  Live demo not published
                </span>
              )}
            </div>
          </aside>
          <article className="detail-story">
            <h2>The question.</h2>
            <p>{project.problem}</p>
            <h2>The intended experience.</h2>
            <ul>
              {project.features.map((f, i) => (
                <li key={f}>
                  <span>{f}</span>
                  <span className="mono">0{i + 1}</span>
                </li>
              ))}
            </ul>
            <h2>A possible architecture.</h2>
            <div className="architecture">
              {project.architecture.map((step, i) => (
                <div className="architecture-node" key={step}>
                  <span>0{i + 1}</span>
                  {step}
                  {i < project.architecture.length - 1 && (
                    <ArrowRight size={12} />
                  )}
                </div>
              ))}
            </div>
            <div className="verification-note">
              <span className="mono">{project.status.toUpperCase()}</span>
              <p>{project.result}</p>
              <p>
                The artwork above is an editorial visual, not a product
                screenshot. Verified screenshots and technical case-study
                details can be added here.
              </p>
            </div>
          </article>
        </div>
        <Link className="detail-next" href={`/projects/${next.slug}`}>
          <div>
            <span className="mono muted">
              CONTINUE EXPLORING — {next.number}
            </span>
            <p>{next.title}</p>
          </div>
          <ArrowUpRight strokeWidth={0.8} />
        </Link>
      </main>
      <Footer />
    </>
  );
}

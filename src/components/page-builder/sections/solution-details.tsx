"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { fileUrl, urlFor } from "@/sanity/lib/image";
import { cn } from "@/utils/cn";
import type { PageSection } from "../page-builder";

type SolutionDetailsSection = Extract<
  PageSection,
  { _type: "solutionDetailsSection" }
>;
import { ArrowUpRight, Check, Circle, Expand, Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { resolveLink } from "@/sanity/lib/resolve-link";
import { useCallback, useEffect, useState } from "react";

export function SolutionDetails({
  backgroundColor,
  content: sectionContent,
  eyebrow,
  items,
  title: sectionTitle,
}: SolutionDetailsSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("relative overflow-hidden", bg, text)}>
      <div className="gradient-glow" />

      <div className="site-container relative">
        {eyebrow || sectionTitle ? (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow ? (
              <div className="section-eyebrow">
                <span />
                <p>{eyebrow}</p>
                <span />
              </div>
            ) : null}

            {sectionTitle ? (
              <h2 className="section-heading text-(--text-primary)">
                {sectionTitle}
              </h2>
            ) : null}

            {sectionContent ? (
              <p className="mx-auto section-content max-w-2xl">
                {sectionContent}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-6">
          {items.map((item, index) => {
            const anchorId = item.slug?.current;
            const hasMedia = item.media && item.media.length > 0;
            const isReversed = index % 2 === 1;

            return (
              <article
                key={item._key}
                id={anchorId || undefined}
                className="relative scroll-mt-24 overflow-hidden rounded-[2rem] border border-black/6 bg-white/94 shadow-[0_18px_45px_rgba(16,24,40,0.05)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(63,100,176,0.35),rgba(62,198,238,0.16),transparent)]" />

                <div
                  className={cn(
                    "flex flex-col gap-0 lg:flex-row",
                    isReversed && "lg:flex-row-reverse",
                  )}
                >
                  {/* Left — Content + Capabilities */}
                  <div className="flex flex-1 flex-col p-8 lg:p-10">
                    {/* Logo + status */}
                    <div className="mb-1 flex items-center gap-3">
                      {item.logo ? (
                        <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/6 bg-white shadow-[0_2px_6px_rgba(16,24,40,0.05)]">
                          <Image
                            src={urlFor(item.logo)
                              .width(72)
                              .height(72)
                              .fit("max")
                              .url()}
                            alt={item.title}
                            width={72}
                            height={72}
                            className="h-14 w-14 object-contain"
                          />
                        </div>
                      ) : null}
                      {item.status ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                          <Circle className="h-1.5 w-1.5 fill-current" />
                          {item.status}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-(--text-primary)">
                      {item.title}
                    </h3>

                    {item.subtitle ? (
                      <p className="mt-2 text-sm font-medium text-(--brand-primary)">
                        {item.subtitle}
                      </p>
                    ) : null}

                    <p className="mt-4 whitespace-pre-line text-base leading-7 text-(--text-body)">
                      {item.content}
                    </p>

                    {/* Stack tags */}
                    {item.stack && item.stack.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-black/6 bg-(--surface-alt) px-3 py-1 text-[11px] font-medium text-(--text-muted)"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Core capabilities */}
                    {item.capabilities && item.capabilities.length > 0 ? (
                      <div className="mt-6 rounded-[1.4rem] border border-black/6 bg-[rgba(247,249,252,0.72)] p-5 shadow-[0_10px_24px_rgba(16,24,40,0.035)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--text-body)">
                          {item.capabilitiesTitle || "Core capabilities"}
                        </p>
                        <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                          {item.capabilities.map((cap) => (
                            <div
                              key={cap}
                              className="flex items-start gap-3 text-sm leading-6 text-(--text-body)"
                            >
                              <span className="mt-0.5 icon-box-sm">
                                <Check className="h-3.25 w-3.25" />
                              </span>
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* CTA button */}
                    {(() => {
                      const resolved = item.button
                        ? resolveLink(item.button)
                        : null;
                      if (!resolved) return null;
                      const isExternal = resolved.href.startsWith("http");
                      return (
                        <div className="mt-6">
                          <Link
                            href={resolved.href}
                            {...(isExternal
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                            className="inline-flex items-center gap-2 rounded-xl bg-(--brand-primary) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--brand-primary)/90"
                          >
                            {resolved.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Right — Media + Adaptable */}
                  <div
                    className={cn(
                      "shrink-0 space-y-4 p-6 lg:w-[460px] lg:p-8",
                      isReversed
                        ? "lg:border-r lg:border-black/5"
                        : "lg:border-l lg:border-black/5",
                    )}
                  >
                    {hasMedia ? (
                      <MediaGallery media={item.media!} title={item.title} />
                    ) : null}

                    {item.adaptableItems && item.adaptableItems.length > 0 ? (
                      <div className="rounded-[1.4rem] border border-black/6 bg-white/92 p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--text-body)">
                          {item.adaptableTitle || "Adaptable for"}
                        </p>
                        <ul className="mt-3.5 space-y-2.5">
                          {item.adaptableItems.map((adapt) => (
                            <li
                              key={adapt}
                              className="border-b border-black/5 pb-2.5 text-sm leading-6.5 text-(--text-body) last:border-b-0 last:pb-0"
                            >
                              {adapt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Media gallery ────────────────────────────────────────────────── */

type MediaItem = NonNullable<
  SolutionDetailsSection["items"][number]["media"]
>[number];

function MediaGallery({ media, title }: { media: MediaItem[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = media[activeIndex];

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const openLightbox = useCallback(() => {
    if (active?._type === "screenshot") {
      setLightboxOpen(true);
    }
  }, [active?._type]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      <div className="space-y-3">
        {/* Main preview */}
        <div className="group/media relative overflow-hidden rounded-[1.2rem] border border-black/6 bg-black/4">
          {active?._type === "screenshot" ? (
            <>
              <Image
                src={urlFor(active).width(860).height(520).fit("max").url()}
                alt={(active as { alt?: string }).alt || title}
                width={860}
                height={520}
                className="aspect-[16/10] w-full object-cover"
              />
              <button
                onClick={openLightbox}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/media:opacity-100"
                aria-label="View full size"
              >
                <Expand className="h-4 w-4" />
              </button>
            </>
          ) : null}
          {active?._type === "video" ? (
            <VideoEmbed
              url={(active as { url: string }).url}
              poster={(active as { poster?: unknown }).poster}
              alt={(active as { alt?: string }).alt || `${title} video`}
            />
          ) : null}
          {active?._type === "uploadedVideo" ? (
            <UploadedVideoPlayer
              file={(active as { file?: { asset?: { _ref?: string } } }).file}
              poster={(active as { poster?: unknown }).poster}
              alt={(active as { alt?: string }).alt || `${title} video`}
            />
          ) : null}
        </div>

        {/* Thumbnails */}
        {media.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {media.map((item, i) => {
              const hasPoster =
                (item._type === "video" || item._type === "uploadedVideo") &&
                !!(item as { poster?: unknown }).poster;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    i === activeIndex
                      ? "border-(--brand-primary) shadow-[0_0_0_1px_var(--brand-primary)]"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  {item._type === "screenshot" ? (
                    <Image
                      src={urlFor(item).width(120).height(80).fit("crop").url()}
                      alt=""
                      width={120}
                      height={80}
                      className="h-12 w-18 object-cover"
                    />
                  ) : null}
                  {(item._type === "video" || item._type === "uploadedVideo") &&
                  hasPoster ? (
                    <div className="relative h-12 w-18">
                      <Image
                        src={urlFor(
                          (item as { poster: Parameters<typeof urlFor>[0] })
                            .poster,
                        )
                          .width(120)
                          .height(80)
                          .fit("crop")
                          .url()}
                        alt=""
                        width={120}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-3.5 w-3.5 fill-white text-white" />
                      </div>
                    </div>
                  ) : null}
                  {(item._type === "video" || item._type === "uploadedVideo") &&
                  !hasPoster ? (
                    <div className="flex h-12 w-18 items-center justify-center bg-(--brand-deep-navy)">
                      <Play className="h-4 w-4 fill-white/60 text-white/60" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Lightbox */}
      {lightboxOpen && active?._type === "screenshot" ? (
        <Lightbox
          src={urlFor(active).width(1920).quality(90).url()}
          alt={(active as { alt?: string }).alt || title}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}

/* ─── Lightbox ─────────────────────────────────────────────────────── */

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ─── Video players ────────────────────────────────────────────────── */

function VideoEmbed({
  url,
  poster,
  alt,
}: {
  url: string;
  poster?: unknown;
  alt: string;
}) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const embedUrl = url
    .replace("youtube.com/watch?v=", "youtube.com/embed/")
    .replace("youtu.be/", "youtube.com/embed/")
    .replace("vimeo.com/", "player.vimeo.com/video/");

  if (playing) {
    return (
      <iframe
        src={`${embedUrl}?autoplay=1`}
        title={alt}
        allow="autoplay; fullscreen"
        className="aspect-[16/10] w-full"
      />
    );
  }

  return (
    <button
      onClick={handlePlay}
      className="group/play relative aspect-[16/10] w-full"
    >
      {poster ? (
        <Image
          src={urlFor(poster as Parameters<typeof urlFor>[0])
            .width(860)
            .height(520)
            .fit("crop")
            .url()}
          alt={alt}
          width={860}
          height={520}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--brand-deep-navy)] to-[#061a27]" />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover/play:scale-110">
          <Play className="h-6 w-6 fill-(--brand-primary) text-(--brand-primary)" />
        </div>
      </div>
    </button>
  );
}

function UploadedVideoPlayer({
  file,
  poster,
  alt,
}: {
  file?: { asset?: { _ref?: string } };
  poster?: unknown;
  alt: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoSrc = file ? fileUrl(file) : null;

  const handlePlay = useCallback(() => {
    setPlaying(true);
  }, []);

  if (!videoSrc) return null;

  if (playing) {
    return (
      <video
        src={videoSrc}
        autoPlay
        controls
        playsInline
        className="aspect-[16/10] w-full object-cover"
      >
        <track kind="descriptions" label={alt} />
      </video>
    );
  }

  return (
    <button
      onClick={handlePlay}
      className="group/play relative aspect-[16/10] w-full"
    >
      {poster ? (
        <Image
          src={urlFor(poster as Parameters<typeof urlFor>[0])
            .width(860)
            .height(520)
            .fit("crop")
            .url()}
          alt={alt}
          width={860}
          height={520}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--brand-deep-navy)] to-[#061a27]" />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover/play:scale-110">
          <Play className="h-6 w-6 fill-(--brand-primary) text-(--brand-primary)" />
        </div>
      </div>
    </button>
  );
}

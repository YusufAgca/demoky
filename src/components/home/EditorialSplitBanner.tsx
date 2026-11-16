"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause } from "lucide-react";
import { EditorialMediaItem } from "@/types";
import { EDITORIAL_ITEMS } from "@/data/homeContent";
import { cn } from "@/lib/utils";

/**
 * Tekil Editöryal Medya Kartı (Yüksek Çözünürlüklü Görsel & Video Oynatıcı)
 */
function EditorialCard({
  item,
  className = "",
}: {
  item: EditorialMediaItem;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.type === "video" && item.videoSrc) {
      if (isPlaying) {
        videoRef.current?.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  return (
    <div
      onClick={togglePlay}
      className={cn(
        "relative overflow-hidden rounded-2xl md:rounded-3xl group cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-gray-100",
        className
      )}
    >
      {item.type === "video" && item.videoSrc && (
        <video
          ref={videoRef}
          src={item.videoSrc}
          playsInline
          muted
          loop
          preload="none"
          onEnded={() => setIsPlaying(false)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500 ease-out",
            isPlaying ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
        />
      )}

      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out",
          isPlaying ? "opacity-0" : "opacity-100"
        )}
        priority={item.id === 1}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {item.type === "video" && (
        <button
          type="button"
          onClick={togglePlay}
          className={cn(
            "absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
            isPlaying
              ? "bg-black/70 text-white"
              : "bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white hover:scale-105"
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
      )}
    </div>
  );
}

/**
 * 1:1 Elonky "Personalized Gift" Editöryal Vitrin Bölümü
 */
export function EditorialSplitBanner() {
  return (
    <section className="w-full py-8 sm:py-12 bg-white" aria-label="Editors Picks Personalized Gift">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col justify-center max-w-xl">
            <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
              EDITORS&apos; PICKS
            </span>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif tracking-tight leading-tight">
              Personalized Gift
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Add a name, date, or message; with engraving, embroidery, and printing options, make your gift truly one of a kind.
            </p>

            <div>
              <Link
                href="/gifts/personalized"
                className="inline-block bg-[#0E0E0E17] hover:bg-[#0e0e0e28] text-gray-900 font-medium py-3 px-7 text-sm rounded-full transition-all duration-300 hover:shadow-sm active:scale-95"
              >
                Personalize Now
              </Link>
            </div>
          </div>

          <div className="w-full">
            <EditorialCard
              item={EDITORIAL_ITEMS[0]}
              className="h-[300px] sm:h-[360px] lg:h-[400px] w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EditorialCard
            item={EDITORIAL_ITEMS[1]}
            className="h-[260px] sm:h-[320px] lg:h-[400px]"
          />
          <EditorialCard
            item={EDITORIAL_ITEMS[2]}
            className="h-[260px] sm:h-[320px] lg:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}

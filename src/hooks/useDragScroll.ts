"use client";

import { useRef, useCallback } from "react";

interface UseDragScrollOptions {
  /** Sürükleme hızı çarpanı (Varsayılan: 1) */
  speedMultiplier?: number;
  /** Sürükleme olarak kabul edilecek minimum piksel eşiği (Varsayılan: 5) */
  dragThreshold?: number;
}

/**
 * Sıfır Re-Render ile 60fps Akıcı Sürükle-Kaydır Kancası (useDragScroll Hook)
 * 
 * Mimari Açıklama:
 * Sürükleme durumunu (`isMouseDown`, `startX`, `scrollLeftStart`, `hasDragged`)
 * `useState` yerine `useRef` üzerinde tutarak fare hareketi boyunca bileşenin
 * yeniden çizilmesini (re-render) tamamen engeller.
 */
export function useDragScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseDragScrollOptions = {}
) {
  const { speedMultiplier = 1, dragThreshold = 5 } = options;

  const scrollRef = useRef<T>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStartRef.current = scrollRef.current.scrollLeft;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isMouseDownRef.current || !scrollRef.current) return;
      e.preventDefault();
      const currentX = e.pageX - scrollRef.current.offsetLeft;
      const walk = (currentX - startXRef.current) * speedMultiplier;
      if (Math.abs(walk) > dragThreshold) {
        hasDraggedRef.current = true;
      }
      scrollRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    },
    [speedMultiplier, dragThreshold]
  );

  const onMouseUp = useCallback(() => {
    isMouseDownRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 0);
  }, []);

  const onMouseLeave = useCallback(() => {
    isMouseDownRef.current = false;
  }, []);

  /**
   * Sürükleme esnasında kart içi linklerin yanlışlıkla tetiklenmesini önler
   */
  const onLinkClick = useCallback((e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  /**
   * Ok butonlarıyla belirli bir piksel miktarı kadar yumuşak kaydırma yapar
   */
  const scrollByOffset = useCallback((offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, []);

  return {
    scrollRef,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
    },
    onLinkClick,
    scrollByOffset,
  };
}

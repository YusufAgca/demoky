"use client";

import { useEffect, RefObject } from "react";

/**
 * Dışarı Tıklama ve Escape Tuşu Algılayıcı Kanca (useClickOutside Hook)
 * 
 * Mimari Açıklama:
 * Dropdown menüler, arama kutuları ve açılır panellerin kendi kapsayıcısı dışına
 * tıklandığında veya `Escape` tuşuna basıldığında otomatik kapanmasını sağlar.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  onClose: () => void,
  enableEscape: boolean = true
) {
  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (enableEscape && event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    if (enableEscape) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      if (enableEscape) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [ref, onClose, enableEscape]);
}

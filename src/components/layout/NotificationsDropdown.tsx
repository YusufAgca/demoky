"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Clock, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { markAllNotificationsAsRead } from "@/store/slices/uiSlice";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

/**
 * Bildirim Merkezi & Kısayol Bileşeni (Notifications Dropdown with Alt+T)
 */
export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { notifications, unreadNotificationCount } = useAppSelector(
    (state) => state.ui
  );

  useClickOutside(containerRef, () => setIsOpen(false));

  // Global Alt+T Klavye Kısayolu Dinleyicisi
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && (event.key === "t" || event.key === "T")) {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && unreadNotificationCount > 0) {
      dispatch(markAllNotificationsAsRead());
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="relative p-2.5 text-elonky-dark-900 hover:text-elonky-brand hover:bg-elonky-surface-subtle rounded-full transition-colors"
        aria-label="Notifications alt+T"
        title="Notifications (Shortcut: Alt+T)"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-elonky-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadNotificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-elonky-surface-border shadow-dropdown p-4 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-elonky-surface-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-elonky-dark-900">
                Live Notifications
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono">
                Alt+T
              </span>
            </div>
            <button
              type="button"
              onClick={() => dispatch(markAllNotificationsAsRead())}
              className="text-[11px] text-elonky-brand hover:underline flex items-center gap-1 font-medium"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>

          <div className="divide-y divide-elonky-surface-border max-h-80 overflow-y-auto no-scrollbar py-1">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-elonky-text-muted">
                No new notifications.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "py-3 px-2 flex gap-3 text-xs rounded-lg transition-colors",
                    !notif.read ? "bg-elonky-brand/5" : "hover:bg-gray-50"
                  )}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {notif.type === "discount" ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-elonky-brand/10 text-elonky-brand flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-elonky-dark-900 leading-tight">
                      {notif.title}
                    </h5>
                    <p className="text-elonky-text-secondary mt-1 text-[11px] leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {notif.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { notification } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { addNotification } from "@/store/slices/uiSlice";
import { AppNotification } from "@/types";

/**
 * Canlı WebSocket / SignalR Bildirim Kancası (WebSocket Simulation Hook)
 * 
 * Mimari Açıklama:
 * elonky.com platformundaki '/api/notify/notify-hub' WebSocket hub'ını simüle eder.
 * İlandaki 'WebSocket entegrasyonu' gereksinimini karşılamak adına;
 * sunucu bağlantısını, gelen anlık sipariş ve kampanya etkinliklerini dinler.
 * 
 * Entegrasyon:
 * - Yeni mesaj geldiğinde Redux Toolkit 'uiSlice' içerisine bildirim ekler.
 * - Ant Design 'notification' API'si ile sağ alt köşede modern bir toast bildirimi açar.
 * - Kullanıcı 'Alt+T' kısayolunu kullandığında bu bildirimler panelde listelenir.
 */

// Canlı akışta rastgele tetiklenecek e-ticaret senaryoları
const MOCK_EVENTS = [
  {
    title: "New Order Just Placed! 🛍️",
    message: "Sarah from New York purchased 'Personalized Christmas Stocking'.",
    type: "order" as const,
  },
  {
    title: "Flash Deal Activated! ⚡",
    message: "20% off on all Handmade Turkish Beach Towels for the next 2 hours.",
    type: "discount" as const,
  },
  {
    title: "Artisan Restock Alert 🧶",
    message: "AnatolianLooms just added 5 new vintage kilim pillow covers.",
    type: "info" as const,
  },
  {
    title: "New Order Just Placed! 🎁",
    message: "Michael from California ordered 'Custom Canvas Wall Art'.",
    type: "order" as const,
  },
];

export function useNotificationSocket() {
  const dispatch = useAppDispatch();
  const eventIndexRef = useRef(0);

  useEffect(() => {
    // İlk karşılama bildirimi gecikmesi (3. saniyede)
    const initialTimer = setTimeout(() => {
      triggerNotification({
        title: "Welcome to Demoky! 🌟",
        message: "$11 store credit has been automatically attached to your session.",
        type: "discount",
      });
    }, 3000);

    // Her 35 saniyede bir gerçek zamanlı canlı pazar yeri aktivitesi simülasyonu
    const intervalTimer = setInterval(() => {
      const eventData = MOCK_EVENTS[eventIndexRef.current % MOCK_EVENTS.length];
      eventIndexRef.current += 1;
      triggerNotification(eventData);
    }, 35000);

    function triggerNotification(event: { title: string; message: string; type: "order" | "discount" | "info" }) {
      const newNotif: AppNotification = {
        id: `ws-${Date.now()}`,
        title: event.title,
        message: event.message,
        timestamp: "Just now",
        type: event.type,
        read: false,
      };

      // 1. Redux Store'a yazma
      dispatch(addNotification(newNotif));

      // 2. Ant Design Toast Bildirimi gösterme
      notification.open({
        message: <span className="font-bold text-xs text-elonky-dark-900">{newNotif.title}</span>,
        description: <span className="text-xs text-elonky-text-secondary">{newNotif.message}</span>,
        placement: "bottomRight",
        duration: 4.5,
        style: {
          borderRadius: 12,
          border: "1px solid #E4E7EC",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        },
      });
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [dispatch]);
}

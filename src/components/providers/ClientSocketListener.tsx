"use client";

import { useNotificationSocket } from "@/services/useNotificationSocket";

/**
 * WebSocket Dinleyicisi İstemci Bileşeni (Client Component)
 * 
 * Mimari Açıklama:
 * Sayfanın kendisinin Server Component (RSC) kalabilmesi ve SEO performansını
 * maksimize etmesi için; WebSocket yaşam döngüsü bu görünmez istemci bileşeni
 * aracılığıyla izole edilir.
 */
export function ClientSocketListener() {
  useNotificationSocket();
  return null;
}

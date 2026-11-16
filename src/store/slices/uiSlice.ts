import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppNotification } from "@/types";

/**
 * Genel UI ve Modal Durumları Arayüzü (UI State Interface)
 */
export interface UiState {
  isSellerModalOpen: boolean;
  isMobileMenuOpen: boolean;
  notifications: AppNotification[];
  unreadNotificationCount: number;
}

const initialState: UiState = {
  isSellerModalOpen: false,
  isMobileMenuOpen: false,
  notifications: [
    {
      id: "init-1",
      title: "Welcome to Demoky! 🎉",
      message: "Your $11 welcome credit has been automatically applied to your first order.",
      timestamp: "Just now",
      type: "discount",
      read: false,
    },
  ],
  unreadNotificationCount: 1,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSellerModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSellerModalOpen = action.payload;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notifications.unshift(action.payload);
      state.unreadNotificationCount += 1;
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true));
      state.unreadNotificationCount = 0;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadNotificationCount = 0;
    },
  },
});

export const {
  setSellerModalOpen,
  setMobileMenuOpen,
  addNotification,
  markAllNotificationsAsRead,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;

import { create } from "zustand";
type NotificationState = {
  notifications: Notification[] | undefined;
  updateNotifications: (arr: Notification[]) => void;
};

export const notificationStore = create<NotificationState>((set) => ({
  notifications: undefined,
  updateNotifications: (updatedNotifications) => set({ notifications: updatedNotifications }),
}));

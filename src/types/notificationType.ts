export interface NotificationItem {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Notification {
  cursorId?: number;
  notifications: NotificationItem[];
  totalCount: number;
}

export interface NotificationParams {
  cursorId?: number;
  size: number;
}

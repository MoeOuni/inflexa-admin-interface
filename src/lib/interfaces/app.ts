export interface NotificationItem {
    count: number;
    color: 'red' | 'orange' | 'green' | 'blue';
}

export interface NotificationMenu {
    id: number,
    notifications: NotificationItem[],
    path: string,
}

export interface NotificationResponse {
    header: {
        notification: boolean,
    },
    menu: NotificationMenu[],
}

export const unreadNotificationFunction = (notifications) => {
    return notifications.filter((n) => n.isRead === false);
}
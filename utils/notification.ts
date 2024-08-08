import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

type NotificationType = 'success' | 'info' | 'warning' | 'error';

/* 
    打开消息通知框
    - placement：消息通知框在哪里显示
    - info: 消息内容
    - type: 通知类型
*/
const openNotification = (placement: NotificationPlacement, info: string, type: NotificationType, message: string) => {
    notification[type]({
        message: `${message}`,
        description: info,
        placement,
    });
};

export const notificationService = {
    success: (placement: NotificationPlacement, description: string) => openNotification(placement, description, 'success', 'Success notification'),
    error: (placement: NotificationPlacement, description: string) => openNotification(placement, description, 'error', 'Error notification'),
    info: (placement: NotificationPlacement, description: string) => openNotification(placement, description, 'info', 'Info notification'),
    warning: (placement: NotificationPlacement, description: string) => openNotification(placement, description, 'warning', 'Warning notification'),
};
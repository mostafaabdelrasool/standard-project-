import { AcNotification, ActionType } from 'angular-cesium';

export interface NotificationState {
    notifications: Array<AcNotification>;
    currentNotification: AcNotification;
}
export const initialNotificationState: AcNotification = { id: '', actionType: ActionType.DELETE };

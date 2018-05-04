import { EntityData } from './../model/ac-entity';
import { Position } from './../model/position';
import { NotificationState, initialNotificationState } from './app-state';
import { AcNotification } from 'angular-cesium';
import { notificationsReducer } from './aircraft.reducer';
import * as _ from 'lodash';
import { ActionType } from '../model/base';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export function getCurrentNotification(notifications: Array<AcNotification>, ac: EntityData) {
    if (notifications.length === 0) {
        return;
    }
    return notifications.find(x => (x.entity as EntityData).text === ac.text);
}
export function getNewNotificationsPosition(notification: AcNotification) {
    if (!notification.entity) {
        return [];
    }
    return notification.entity['positions'];
}
export const getNotificationState = createFeatureSelector<NotificationState>('notifications');
export const getCurrentNotifications = createSelector(getNotificationState, x => {
    if (x.notifications.length === 0) {
        return initialNotificationState;
    } else {
        return x.currentNotification;
    }
});
export const getNotifications = createSelector(getNotificationState, x => x.notifications);


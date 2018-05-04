import { AcNotification } from 'angular-cesium';
import { ActionType } from '../model/base';
import { Action } from '@ngrx/store';
import { Waypoint } from '../model/waypoint';
export const ADD_WAYPOINTS = '3';
export function getNotificationsAction(notification: AcNotification): NotificationAction {
    return { type: notification.actionType.toString(), payload: notification };
}
export function addWayPointAction(waypoint: Waypoint): WaypointAction {
    return { type: ADD_WAYPOINTS, payload: waypoint };
}
export class NotificationAction implements Action {
    type: string;
    constructor(public payload: AcNotification) { }
}
export class WaypointAction implements Action {
    type: string;
    constructor(public payload: Waypoint) { }
}

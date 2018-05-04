import { Waypoint } from './../model/waypoint';
import { EntityData } from './../model/ac-entity';
import { NotificationState, initialNotificationState } from './app-state';
import { ActionReducer, State, Action } from '@ngrx/store';
import { AcNotification, ActionType } from 'angular-cesium';
import { NotificationAction, ADD_WAYPOINTS, WaypointAction } from './aircraft-action';
import * as _ from 'lodash';

const newNotificationsState = (state: NotificationState, newData: AcNotification): NotificationState => {
    const index = state.notifications.findIndex(x => x.id === newData.id);
    const newState = _.cloneDeep(state);
    const entityData: EntityData = newData.entity;
    entityData.positions.push(entityData.position);
    if (index !== -1) {
        entityData.positions.push(...(newState.notifications[index].entity as EntityData).positions);
        newState.notifications[index] = newData;
        newState.currentNotification = newData;
        return newState;
    } else {
        newState.currentNotification = newData;
        newState.notifications.push(_.cloneDeep(newData));
        return newState;
    }
};

const deleteState = (state: Array<AcNotification>, newData: AcNotification) => {
    return _.remove(...state, newData);
};
export function notificationsReducer(state: NotificationState, action: any): NotificationState {
    switch (action.type) {
        case ActionType.ADD_UPDATE.toString():
            return newNotificationsState(state, action.payload);
        case ActionType.DELETE.toString():
            return deleteState(state.notifications, action.payload);
        case ADD_WAYPOINTS:
            return addWayPoint(state, action.payload);
        default:
            return { notifications: [], currentNotification: initialNotificationState };
    }
}
const addWayPoint = (state: NotificationState, newData: Waypoint): NotificationState => {
    const index = state.notifications.findIndex(x => (x.entity as EntityData).text === newData.name);
    const newState = _.cloneDeep(state);
    newData.position = (newState.notifications[index].entity as EntityData).positions;
    (newState.notifications[index].entity as EntityData).waypoints = newData;
    return newState;
};

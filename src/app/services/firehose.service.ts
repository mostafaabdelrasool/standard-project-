import { Waypoint } from './../model/waypoint';
import { EntityData } from './../model/ac-entity';
import { Injectable, OnInit } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { AcNotification, ActionType, AcEntity } from 'angular-cesium';
import { Observable } from 'rxjs/Observable';
import { HubConnection, TransportType } from '@aspnet/signalr';
import { Subscriber } from 'rxjs/Subscriber';
import { Position } from '../model/position';
import { Store } from '@ngrx/store';
import { NotificationState, getNotificationsAction, addWayPointAction } from '../store';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from '../common/config.service';

@Injectable()
export class FirehoseService implements OnInit {
  private hubConnection: HubConnection;
  private url: string;
  private messages: Array<string>;
  constructor(
    private store: Store<NotificationState>,
    private configService: ConfigService
  ) {
    this.url = configService.baseHubUrl;
    this.hubConnection = new HubConnection(this.url, {
      transport: TransportType.WebSockets
    });
    this.hubConnection.on('SendPosition', this.getPositions);
    this.hubConnection.on('SendFlightplan', this.getFlightPlan);
    this.messages = new Array<string>();
  }
  public setupHubConnection(): Promise<any> {
    return this.hubConnection
      .start()
      .then(() => { })
      .catch(err => {
        console.log('Error while establishing connection');
        console.log(err);
      });
  }

  public getPositions = (position: Position) => {
    const acNotification = new AcNotification();
    acNotification.id = position.id;

    if (position.action.valueOf() === ActionType.ADD_UPDATE) {
      acNotification.actionType = ActionType.ADD_UPDATE;
      acNotification.entity = this.convertToCesiumObj(position);
      // acNotification.entity.id = position.id;
    } else if (position.action.valueOf() === ActionType.DELETE) {
      acNotification.actionType = ActionType.DELETE;
    }
    this.store.dispatch(getNotificationsAction(acNotification));
    this.store.dispatch(addWayPointAction({ longitude: position.lon, latitude: position.lat, name: position.ident }));
  }
  ngOnInit() { }
  private convertToCesiumObj(entity: Position): EntityData {
    const acEntity: EntityData = {};
    const fixedHeading = entity.heading - Math.PI / 2;
    const heading = fixedHeading;
    const pitch = Cesium.Math.toRadians(0.0);
    const roll = Cesium.Math.toRadians(0.0);

    acEntity.alt = Math.round(entity.alt);
    acEntity.text = entity.ident;
    acEntity.position = Cesium.Cartesian3.fromDegrees(
      entity.lon,
      entity.lat,
      entity.alt
    );
    acEntity.geographic = { lat: entity.lat, lng: entity.lon, alt: entity.alt };
    acEntity.rotation = heading;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    acEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(
      acEntity.position,
      hpr
    );
    acEntity.squawk = entity.squawk;
    acEntity.gs = entity.gs;
    acEntity.orig = entity.orig;
    acEntity.dest = entity.dest;
    acEntity.positions = [];
    acEntity.show = false;
    return acEntity;
  }
  getFlightPlan = (plan: Waypoint) => {
    plan.position = Cesium.Cartesian3.fromDegrees(
      plan.latitude,
      plan.latitude,
      plan.alt
    );
    this.store.dispatch(addWayPointAction(plan));
  }
}

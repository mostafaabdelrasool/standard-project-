import { ActionType } from './../model/base';
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  NgZone,
  AfterViewInit
} from '@angular/core';
import { FirehoseService } from '../services/firehose.service';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import {
  AcNotification,
  MapLayerProviderOptions,
  AcLayerComponent,
  EventRegistrationInput,
  MapEventsManagerService,
  CesiumEvent,
  CesiumEventModifier,
  AcEntity,
  PickOptions,
  AcMapComponent,
  MapsManagerService,
  ViewerConfiguration
} from 'angular-cesium';
import { Observable } from 'rxjs/Observable';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { FirehoseListComponent } from '../firehoseList/firehoseList.component';
import { NotificationState } from '../store';
import { Store } from '@ngrx/store';
import { FirehoseItemComponent } from '../firehoseItem/firehoseItem.component';
import {
  getCurrentNotifications,
  getNotifications,
  getNewNotificationsPosition
} from '../store/store';
import { PolylineEditUpdate } from 'angular-cesium/src/angular-cesium-widgets/models/polyline-edit-update';
import { EntityData } from '../model/ac-entity';
@Component({
  selector: 'app-firehose',
  templateUrl: './firehose.component.html',
  styleUrls: ['./firehose.component.scss'],
})
export class FirehoseComponent implements AfterViewInit {
  showPopover: boolean;
  tracks: AcNotification[];
  polylineDashed: any;
  polylineMaterial: any;
  updatePos: PolylineEditUpdate;
  currentAc: EntityData;
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;
  @ViewChild(AcMapComponent) acMap;
  private track$: Store<AcNotification>;

  private Cesium = Cesium;
  private MapLayerProviderOptions = MapLayerProviderOptions;
  constructor(
    private mapsManagerService: MapsManagerService,
    private viewerConf: ViewerConfiguration,
    private fireHoseService: FirehoseService,
    private dialog: MatDialog,
    private store: Store<NotificationState>,
    private ngZone: NgZone
  ) {
    viewerConf.viewerOptions = {
      timeline: false,
      baseLayerPicker: false,
      animation: false
    };
    this.polylineMaterial = Cesium.Color.ORANGE;
    this.polylineDashed = new Cesium.PolylineDashMaterialProperty({
      color: Cesium.Color.BLUE,
      dashLength: 8.0
    });
    this.track$ = store.select(getCurrentNotifications);
    store.select(getNotifications).subscribe(x => (this.tracks = x));

    this.fireHoseService.setupHubConnection().then(x => { });
  }
  ngAfterViewInit() {
    const mapEventManager = this.mapsManagerService
      .getMap()
      .getMapEventsManager();
    const eventRegistration: EventRegistrationInput = {
      event: CesiumEvent.LEFT_CLICK,
      pick: PickOptions.PICK_ALL
    };
    mapEventManager.register(eventRegistration).subscribe(result => {
      this.ngZone.run(() => {
        if (result.entities) {
          this.showFirehoseItem(result.cesiumEntities[0].acEntity, '');
        } else {
          this.currentAc = undefined;
          this.showPopover = false;
          this.layer.refreshAll(this.tracks);
        }
      });
    });
  }
  showPopup() {
    this.dialog.closeAll();
    this.dialog.open(FirehoseListComponent, {
      width: '50vw',
      height: 'auto',
      hasBackdrop: true
    });
  }
  showFirehoseItem(ac: EntityData, id: string) {
    this.currentAc = ac;
    this.showPopover = true;
    this.layer.refreshAll(this.tracks);
  }
  checkCurrentAc(track: EntityData): boolean {
    return track && this.currentAc === track.text;
  }
}

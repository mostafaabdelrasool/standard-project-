import { Component, OnInit } from "@angular/core";
import { FirehoseService } from "../services/firehose.service";
import { Store } from "@ngrx/store";
import { NotificationState } from "../store";
import { Observable } from "rxjs/Observable";
import { AcNotification, ActionType } from "angular-cesium";
import { getNotifications } from '../store/store';

@Component({
  selector: 'app-firehoseList',
  templateUrl: './firehoseList.component.html',
  styleUrls: ['./firehoseList.component.scss']
})

export class FirehoseListComponent implements OnInit {
  private tracks$;
  constructor(private fireHoseService: FirehoseService, private store: Store<NotificationState>) {
    this.tracks$ = store.select(getNotifications);
  }
  // select<a extends keyof FirehoseListComponent>(key: a) {

  // }
  ngOnInit() {

  }
}

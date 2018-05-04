import { Component, OnInit, Inject, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { NotificationState } from "../store";
import { Store } from "@ngrx/store";
import { getCurrentNotification, getNotifications } from "../store/store";

@Component({
  selector: "app-firehoseItem",
  templateUrl: "./firehoseItem.component.html",
  styleUrls: ["./firehoseItem.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FirehoseItemComponent implements OnInit {


  public track$;
  constructor(@Inject(MAT_DIALOG_DATA) private ac: any,
    private cd: ChangeDetectorRef, private store: Store<NotificationState>) {
    this.track$ = this.store.select(x => {
      return getCurrentNotification(getNotifications(x), this.ac);
    });
  }

  ngOnInit() {

  }
  toDegrees(value: number) {
    const result = Math.round((360 - (180 * value / Math.PI) % 360.0) * 100) / 100;
    return result < 0 ? result + 360 : result;
  }
}

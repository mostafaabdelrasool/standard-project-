import { CesiumEventBuilder } from 'angular-cesium/src/angular-cesium/services/map-events-mananger/cesium-event-builder';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';
import { AngularCesiumModule, AngularCesiumWidgetsModule, ViewerConfiguration } from 'angular-cesium';

import { AppComponent } from './app.component';
import { FirehoseComponent } from './firehose/firehose.component';
import { FirehoseService } from './services/firehose.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { FirehoseListComponent } from './firehoseList/firehoseList.component';
import { StoreModule } from '@ngrx/store';
import { notificationsReducer, AsReducer } from './store/index';
import { MapLayersService } from 'angular-cesium/src/angular-cesium/services/map-layers/map-layers.service';
import { FirehoseItemComponent } from './firehoseItem/firehoseItem.component';
import { AsHtmlComponent } from './htmlContainer/as-html.component';
import { ConfigService } from './common/config.service';
import { firehoseRouting } from './firehose-routing';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    FirehoseComponent, FirehoseListComponent, FirehoseItemComponent, AsHtmlComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AngularCesiumModule.forRoot(), AngularCesiumWidgetsModule,
    MatDialogModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule,
    StoreModule.forRoot(AsReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    firehoseRouting
  ],
  entryComponents: [FirehoseListComponent, FirehoseItemComponent],
  providers: [FirehoseService, ConfigService, ViewerConfiguration],
  bootstrap: [AppComponent]
})
export class AppModule {

}

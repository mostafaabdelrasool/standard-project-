import { Observable } from 'rxjs/Observable';
import {
  Component, DoCheck, ElementRef, Input,
  OnDestroy, OnInit, Renderer2, AfterViewInit, NgZone, Output, EventEmitter
} from '@angular/core';
import {
  CesiumService, MapsManagerService, CesiumEvent, EventRegistrationInput,
  PickOptions, CameraService, DisposableObservable, EventResult
} from 'angular-cesium';
import { AsHtmlService } from './as-html.service';
import { Subscription } from 'rxjs/Subscription';

/**
 *  This is an html implementation.
 *  The ac-html element must be a child of ac-map element.
 *  __Usage:__
 *  ```
 *  <ac-html [props]="{position: position, show: true}">;
 *    <p>html element</p>
 *  </ac-html>
 *  ```
 */

@Component({
  selector: 'as-html',
  template: ` <button *ngIf="fontSize > 10" (click)='close()' class='html-close' mat-icon-button>
                <mat-icon>close</mat-icon>
             </button>
  <ng-content></ng-content>`,
  styleUrls: ['./as-html.component.scss'],
  providers: [AsHtmlService]
})
export class AsHtmlComponent implements OnDestroy, OnInit, AfterViewInit {
  screenPosition: any;
  fontSize = 14;
  wheelEventListener: DisposableObservable<EventResult>;
  @Input() props: any;
  private _show: boolean;
  @Input() set show(val: boolean) {
    this._show = val;
    if (val) {
      this.add();
    } else {
      this.remove();
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private isDraw = false;
  preRenderEventListener: () => void;

  constructor(private cesiumService: CesiumService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private mapsManagerService: MapsManagerService,
    private ngZone: NgZone,
    private cameraService: CameraService,
    private htmlService: AsHtmlService) {
  }

  setScreenPosition(screenPosition: any) {
    if (screenPosition) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'top', `${screenPosition.y}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'left', `${screenPosition.x}px`);
      this.checkElementOutside();
    }
  }

  ngOnInit(): void {
    if (!this.show) {
      this.hideElement();
    }
  }

  remove() {
    if (this.isDraw) {
      this.isDraw = false;
      this.cesiumService.getScene().preRender.removeEventListener(this.preRenderEventListener);
      this.hideElement();
    }
  }

  hideElement() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', `none`);
  }

  add() {
    if (!this.isDraw) {
      this.isDraw = true;
      this.preRenderEventListener = () => {
        this.setElementPosition();
      };
      const fontSize = parseFloat(this.elementRef.nativeElement.style.fontSize);
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', `block`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', fontSize === 0 || !Number(fontSize) ? '14px'
        : fontSize + 'px');
      this.cesiumService.getScene().preRender.addEventListener(this.preRenderEventListener);
    }
  }

  ngAfterViewInit() {
    const mapEventManager = this.mapsManagerService
      .getMap()
      .getMapEventsManager();
    const eventRegistration: EventRegistrationInput = {
      event: CesiumEvent.WHEEL,
      pick: PickOptions.NO_PICK
    };
    this.wheelEventListener = mapEventManager.register(eventRegistration);
    this.subscribeToWheelEvent();
  }
  checkElementOutside() {
    const existType = this.htmlService.HorizontallyBound(this.elementRef.nativeElement.parentNode,
      this.elementRef.nativeElement);
    if (existType === null) {
      this.add();
    } else {
      this.remove();
      this.isDraw = false;
    }
    return existType;
  }
  setElementPosition() {
    this.screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.cesiumService.getScene(),
      this.props.position);
    this.setScreenPosition(this.screenPosition);
  }
  ngOnDestroy(): void {
    this.remove();
    this.wheelEventListener.dispose();
  }
  scalePopover(result) {
    this.ngZone.run(() => {
      const ele = this.elementRef.nativeElement;
      if (!this.show) {
        return;
      }
      // wheel up
      if (Number(result.movement) > 0 && this.fontSize <= 20) {
        ele.style.fontSize = (this.fontSize + 1) + 'px';
      } else {
        ele.style.fontSize = (this.fontSize - 1) + 'px';
      }
      this.fontSize = parseFloat(ele.style.fontSize);
      setTimeout(() => {
        // check if element outside map boundry
        this.checkElementOutside();
      }, 200);
    });
  }
  subscribeToWheelEvent() {
    if (this.wheelEventListener['operator']['notifier'].observers.length === 0) {
      this.wheelEventListener.subscribe(result => {
        this.scalePopover(result);
      });
    }

  }
  close() {
    this.show = false;
    this.showChange.emit(this.show);
    this.hideElement();
  }
}

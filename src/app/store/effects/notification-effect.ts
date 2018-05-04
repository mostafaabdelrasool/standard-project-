import { ActionType } from './../../model/base';
import { NotificationAction } from './../aircraft-action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { Subscriber } from 'rxjs/Subscriber';


@Injectable()
export class NotificationEffects {
    // not used
    @Effect() $notificationEffect: Observable<NotificationAction> = this.actions$.pipe(
        ofType('NotificationAction'),
        Observable.create((observer: Subscriber<NotificationAction>) => {
            debugger
            observer.next();
        })
    );

    constructor(
        private actions$: Actions
    ) { }
}

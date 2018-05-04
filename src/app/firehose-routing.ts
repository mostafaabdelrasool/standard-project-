import { Routes, RouterModule } from '@angular/router';
import { FirehoseComponent } from './firehose/firehose.component';
import { FirehoseListComponent } from './firehoseList/firehoseList.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: FirehoseComponent },
    { path: 'list', component: FirehoseListComponent }
];

export const firehoseRouting = RouterModule.forRoot(routes);

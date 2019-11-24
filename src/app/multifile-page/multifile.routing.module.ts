import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { MultifilePageComponent } from './multifile-page.component';

const routes: Routes = [
    { path: '', component: MultifilePageComponent },
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(
        routes
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class MultifileRoutingModule { }
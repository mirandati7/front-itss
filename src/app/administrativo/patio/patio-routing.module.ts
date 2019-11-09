import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../shared/auth/auth.guard";

import { PatioListComponent }    from './patio-list.component';
import { PatioDetailComponent }    from './patio-detail.component';

const routes: Routes = [
  { path: '',
          children: [
               { path :'' , component: PatioListComponent ,canActivateChild: [AuthGuard] },
               { path :':id' , component: PatioDetailComponent ,canActivateChild: [AuthGuard] }
          ]      
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PatioRoutingModule { }

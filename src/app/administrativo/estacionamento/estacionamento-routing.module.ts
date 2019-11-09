import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../shared/auth/auth.guard";

import { EstacionamentoListComponent }    from './estacionamento-list.component';
import { EstacionamentoDetailComponent }    from './estacionamento-detail.component';

const routes: Routes = [
  { path: '',
          children: [
               { path :'' , component: EstacionamentoListComponent ,canActivateChild: [AuthGuard] },
               { path :':id' , component: EstacionamentoDetailComponent ,canActivateChild: [AuthGuard] }
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
export class EstacioamentoRoutingModule { }

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../shared/auth/auth.guard";

import { ClienteListComponent }    from './cliente-list.component';
import { ClienteDetailComponent }    from './cliente-detail.component';

const clienteRoutes: Routes = [
  { path: '',
          children: [
               { path :'' , component: ClienteListComponent ,canActivateChild: [AuthGuard] },
               { path :':id' , component: ClienteDetailComponent ,canActivateChild: [AuthGuard] }
          ]      
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(clienteRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClienteRoutingModule { }

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../shared/auth/auth.guard";

import { VeiculoListComponent }    from './veiculo-list.component';
import { VeiculoDetailComponent }    from './veiculo-detail.component';

const routes: Routes = [
  { path: '',
          children: [
               { path :'' , component: VeiculoListComponent ,canActivateChild: [AuthGuard] },
               { path :':id' , component: VeiculoDetailComponent ,canActivateChild: [AuthGuard] }
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
export class VeiculoRoutingModule { }

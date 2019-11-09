import { NgModule }         from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../shared/auth/auth.guard";

@NgModule({
  imports: [RouterModule.forChild([    
    { path: 'cliente',                 loadChildren: 'app/administrativo/cliente/cliente.module#ClienteModule', canActivate: [AuthGuard] } ,
    { path: 'veiculo',                 loadChildren: 'app/administrativo/veiculo/veiculo.module#VeiculoModule', canActivate: [AuthGuard] },
    { path: 'patio',                   loadChildren: 'app/administrativo/patio/patio.module#PatioModule', canActivate: [AuthGuard] },
    { path: 'estacionamento',          loadChildren: 'app/administrativo/estacionamento/estacionamento.module#EstacionamentoModule', canActivate: [AuthGuard] }                 
  ])],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule {}

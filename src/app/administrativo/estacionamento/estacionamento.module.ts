import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { MRSharedModule } from '../../mr-shared.module';
import { EstacionamentoDetailComponent } from './estacionamento-detail.component';
import { EstacionamentoListComponent } from './estacionamento-list.component';
import { EstacioamentoRoutingModule } from './estacionamento-routing.module';
import { EstacionamentoService } from './estacionamento.service';
import { PatioService } from '../patio/patio.service';
import { VeiculoService } from '../veiculo/veiculo.service';
import { ClienteService } from '../cliente/cliente.service';

@NgModule({
  imports: [
    MRSharedModule,
    EstacioamentoRoutingModule,
    NgxMaskModule.forRoot(null)
  ],
  declarations: [
    EstacionamentoListComponent,
    EstacionamentoDetailComponent
  ],
  providers: [
    EstacionamentoService,
    PatioService,
    VeiculoService,
    ClienteService,
  ]
})

export class EstacionamentoModule { }


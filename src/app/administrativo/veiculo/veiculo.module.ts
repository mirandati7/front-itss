import { NgModule }       from '@angular/core';

import { MRSharedModule }    from '../../mr-shared.module';

import { VeiculoListComponent }    from './veiculo-list.component';
import { VeiculoDetailComponent }  from './veiculo-detail.component';

import { NgxMaskModule } from 'ngx-mask';

import { VeiculoService } from './veiculo.service';
import { VeiculoRoutingModule } from './veiculo-routing.module';

@NgModule({
  imports: [    
    MRSharedModule,
    VeiculoRoutingModule,
    NgxMaskModule.forRoot(null)   
  ],
  declarations: [
    VeiculoListComponent,
    VeiculoDetailComponent    
  ],
  providers: [
    VeiculoService
  ]
})

export class VeiculoModule {}


import { NgModule }       from '@angular/core';

import { MRSharedModule }    from '../../mr-shared.module';

import { ClienteListComponent }    from './cliente-list.component';
import { ClienteDetailComponent }  from './cliente-detail.component';

import { NgxMaskModule } from 'ngx-mask';

import { ClienteService } from './cliente.service';
import { ClienteRoutingModule } from './cliente-routing.module';

@NgModule({
  imports: [    
    MRSharedModule,
    ClienteRoutingModule,
    NgxMaskModule.forRoot(null)   
  ],
  declarations: [
    ClienteListComponent,
    ClienteDetailComponent    
  ],
  providers: [
    ClienteService
  ]
})

export class ClienteModule {}


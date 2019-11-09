import { NgModule }       from '@angular/core';

import { MRSharedModule }    from '../../mr-shared.module';

import { PatioListComponent }    from './patio-list.component';
import { PatioDetailComponent }  from './patio-detail.component';

import { NgxMaskModule } from 'ngx-mask';

import { PatioService } from './patio.service';
import { PatioRoutingModule } from './patio-routing.module';

@NgModule({
  imports: [    
    MRSharedModule,
    PatioRoutingModule,
    NgxMaskModule.forRoot(null)   
  ],
  declarations: [
    PatioListComponent,
    PatioDetailComponent    
  ],
  providers: [
    PatioService
  ]
})

export class PatioModule {}


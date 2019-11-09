import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ClienteService } from '../../administrativo/cliente/cliente.service';
import { MRSharedModule } from '../../mr-shared.module';
import { UsuarioService } from './usuario.service';

@NgModule({
  imports: [    
    MRSharedModule,
    NgxMaskModule.forRoot(null)           
  ],
  declarations: [
  ],
  providers: [
    UsuarioService,
    ClienteService,
  ]
})

export class UsuarioModule {}


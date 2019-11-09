
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CrudService } from '../../shared/service/crud.service';
import { PageResult, SearchParams } from '../../shared/service/generic.service';
import { MessageService } from '../../shared/service/message.service';
import { Cliente } from './cliente.model';


@Injectable()
export class ClienteService extends CrudService<Cliente> {
  
  public url: string = "api/clientes";
  pageResult: PageResult = new PageResult();
  

    constructor(_http: HttpClient, _message: MessageService) { 
        super(<any>_http, _message);
    } 

    public list(search: SearchParams) {
        let self = this;
        return this.search(this.url + '/search', search)
            .subscribe(res => {
                self.pageResult = res;        
                
            });
    }
    
    public findByCPF(cpf: string){
        let self = this;
        return this.get(`${this.url}/findByCPF/${cpf}`).toPromise()
        .then(res =><Cliente>res );
    }
   



}



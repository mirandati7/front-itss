
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CrudService } from '../../shared/service/crud.service';
import { PageResult, SearchParams } from '../../shared/service/generic.service';
import { MessageService } from '../../shared/service/message.service';
import { Patio } from './patio.model';


@Injectable()
export class PatioService extends CrudService<Patio> {
  
  public url: string = "api/patios";
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
    



}



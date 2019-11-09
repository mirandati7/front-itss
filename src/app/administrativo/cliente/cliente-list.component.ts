import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { QtdeRegistrosDataTable } from '../../shared/constantes/qtde-registros-data-table';
import { LazyLoadEvent } from '../../shared/primeng/common/api';
import { SearchParams } from '../../shared/service/generic.service';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { RowMaskService } from '../../shared/service/row-mask.service';
import { ClienteService } from './cliente.service';


@Component({
  templateUrl: './cliente-list.component.html'         
})
export class ClienteListComponent implements OnInit {
  
    rota: string = '/administrativo/cliente';
    public search: SearchParams = new SearchParams();
    private pesquisa: HTMLInputElement;    
    breadcrumb:BreadcrumbModel = new BreadcrumbModel("Administrativo","Clientes","Pesquisa");
    private status: boolean;

    cols: any[];
    
    constructor(private _router: Router,
                public _service: ClienteService,
                public rowMaskService: RowMaskService,
                public globalsVariablesService: GlobalsVariablesService) {         
    }

    ngOnInit() {

        this.cols = [                                
                {field: 'nome',     header: 'Nome',  style:{'width':'40%','text-align':'left'},  type:'string'},
                {field: 'telefone', header: 'Telefone', style:{'width':'40%','text-align':'left'},  type:'string'},           
                {field: 'cpf',      header: 'cpf',   style:{'width':'20%','text-align':'left',   type:'string'}}            
        ];
        document.getElementById('pesquisa').focus();
    }

   novo() {
        this._router.navigate(['/administrativo/cliente/new']);
    }

    editar(id: number) {
        this._router.navigate(['/administrativo/cliente', id]);
    }


    loadClientes(event: LazyLoadEvent) {
        //Calcula a página atual
        let page = 0;
        if (event.first > 0) {
            page = event.first / event.rows;
        }

        this.search.page = page;
        this.search.size = QtdeRegistrosDataTable.QTDE;
        this.search.filters["pesquisa"];
        this.search.sorting[event.sortField] = event.sortOrder == -1 ? 'desc' : 'asc';
        this.refresh();
    }

     refresh() {

        this._service.list(this.search);
    }

    onkey(event: any) {
        this.refresh();
    }

}


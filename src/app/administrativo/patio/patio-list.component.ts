import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { QtdeRegistrosDataTable } from '../../shared/constantes/qtde-registros-data-table';
import { LazyLoadEvent } from '../../shared/primeng/common/api';
import { SearchParams } from '../../shared/service/generic.service';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { RowMaskService } from '../../shared/service/row-mask.service';
import { PatioService as PatioService } from './patio.service';


@Component({
  templateUrl: './patio-list.component.html'         
})
export class PatioListComponent implements OnInit {
  
    rota: string = '/administrativo/patio';
    public search: SearchParams = new SearchParams();
    private pesquisa: HTMLInputElement;    
    breadcrumb:BreadcrumbModel = new BreadcrumbModel("Administrativo","Pátio","Pesquisa");
    private status: boolean;

    cols: any[];
    
    constructor(private _router: Router,
                public _service: PatioService,
                public rowMaskService: RowMaskService,
                public globalsVariablesService: GlobalsVariablesService) {         
    }

    ngOnInit() {

        this.cols = [                                
                {field: 'descricao',     header: 'Descrição',  style:{'width':'40%','text-align':'left'},  type:'string'},
                {field: 'numeroVagas',   header: 'Vagas', style:{'width':'40%','text-align':'left'},  type:'number'},           
                {field: 'taxaHora',      header: 'Taxa Hora',   style:{'width':'20%','text-align':'left',   type:'number'}}            
        ];
        document.getElementById('pesquisa').focus();
    }

   novo() {
        this._router.navigate(['/administrativo/patio/new']);
    }

    editar(id: number) {
        this._router.navigate([this.rota, id]);
    }


    loadPatios(event: LazyLoadEvent) {
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


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { QtdeRegistrosDataTable } from '../../shared/constantes/qtde-registros-data-table';
import { LazyLoadEvent } from '../../shared/primeng/common/api';
import { SearchParams } from '../../shared/service/generic.service';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { RowMaskService } from '../../shared/service/row-mask.service';
import { EstacionamentoService } from './estacionamento.service';


@Component({
    templateUrl: './estacionamento-list.component.html'
})
export class EstacionamentoListComponent implements OnInit {

    rota: string = '/administrativo/estacionamento';
    public search: SearchParams = new SearchParams();
    private pesquisa: HTMLInputElement;
    breadcrumb: BreadcrumbModel = new BreadcrumbModel("Administrativo", "Estacionamentos", "Pesquisa");
    private status: boolean;

    cols: any[];

    constructor(private _router: Router,
        public _service: EstacionamentoService,
        public rowMaskService: RowMaskService,
        public globalsVariablesService: GlobalsVariablesService) {
    }

    ngOnInit() {

        this.cols = [
            { field: 'patioDescricao', header: 'Pátio', style: { 'width': '30%', 'text-align': 'left' }, type: 'string' },
            { field: 'veiculoModelo', header: 'Veículo', style: { 'width': '30%', 'text-align': 'left' }, type: 'string' },
            { field: 'clienteNome', header: 'Cliente', style: { 'width': '20%', 'text-align': 'left', type: 'string' } },
            { field: 'tempoPermanencia', header: 'Tempo', style: { 'width': '8%', 'text-align': 'left', type: 'string' } },
            {field:  'valor',             header: 'Valor',   style:{'width':'12%','text-align':'right'},  type:'number'} 
        ];
        document.getElementById('pesquisa').focus();
    }

    novo() {
        this._router.navigate(['/administrativo/estacionamento/new']);
    }

    editar(id: number) {
        this._router.navigate([this.rota, id]);
    }


    loadEstacionamentos(event: LazyLoadEvent) {
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


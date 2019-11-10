import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { GenericModel } from '../../shared/model/generic.model';
import { SearchParams } from '../../shared/service/generic.service';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { MessageService } from '../../shared/service/message.service';
import { Util } from '../../utilitarios/util';
import { ClienteService } from '../cliente/cliente.service';
import { PatioService } from '../patio/patio.service';
import { VeiculoService } from '../veiculo/veiculo.service';
import { Estacionamento } from './estacionamento.model';
import { EstacionamentoService } from './estacionamento.service';
import { ValidationService } from '../../shared/validacao/validation.service';

@Component({
    templateUrl: './estacionamento-detail.component.html',
})

export class EstacionamentoDetailComponent<T extends GenericModel> implements OnInit {

    public id: string;
    apiEndPointUpload = this._estacionamentoService._endpoint;
    public cpfValido:any;

    breadcrumb: BreadcrumbModel = new BreadcrumbModel("Administrativo", "Estacionamentos", "Cadastro");
    pt_BR: any;

    constructor(public _route: ActivatedRoute,
        public _router: Router,
        public _messages: MessageService,
        public fb: FormBuilder,
        public _estacionamentoService: EstacionamentoService,
        public _patioService: PatioService,
        public _veiculoService: VeiculoService,
        public _clienteService: ClienteService,
         public _http: Http,
        public http: HttpClient,
        public globalsVariablesService: GlobalsVariablesService
    ) {

    }

    images: any[];

    model: Estacionamento = new Estacionamento();
    estacionamentoForm: FormGroup;
    ativo: boolean = true;
    inativo: boolean = false;
    msgs: String[];
    
    ngOnInit() {
        
        this.pt_BR = Util.traducaoDataCalendar();
        this.buildForm();

        this._route.params.forEach((params: Params) => {
            this.id = String(+params['id']);
        });

        if (this.id == 'NaN') {
            this.limpar();

        }
        else {
            this._estacionamentoService.findOne(Number(this.id)).subscribe(model => {
                this.model = model;


                var patioObj: any = new Object();
				patioObj.id = this.model.patioId;
				patioObj.descricao = this.model.patioDescricao;
                this.onSelectPatio(patioObj);
                
                var veiculoObj: any = new Object();
				veiculoObj.id = this.model.veiculoId;
                veiculoObj.modelo = this.model.veiculoModelo;
                this.onSelectVeiculo(veiculoObj);
                
                var clienteObj: any = new Object();
				clienteObj.id = this.model.clienteId;
                clienteObj.nome = this.model.clienteNome;
                this.onSelectCliente(clienteObj);


                this.estacionamentoForm.get('tempoPermanencia').setValue(this.model.tempoPermanencia);
                this.estacionamentoForm.get('valor').setValue(this.model.valor);
                this.estacionamentoForm.get('dataHoraChegada').setValue(this.model.dataHoraChegada);
                this.estacionamentoForm.get('dataHoraSaida').setValue(this.model.dataHoraSaida);

            });

        }


    }


    buildForm(): void {
        this.estacionamentoForm = this.fb.group({
            'id': [''],
            'patioId': [''],
            'patioDescricao': ['',ValidationService.autocompleteValidator],
            'veiculoId': [''] ,
            'veiculoModelo': ['',ValidationService.autocompleteValidator],   
            'clienteId': [''],      
            'clienteNome': ['',ValidationService.autocompleteValidator],  
            'tempoPermanencia': [''],
            'valor': [''],   
            'dataHoraChegada': [''], 
            'dataHoraSaida': ['']     
        });

        this.estacionamentoForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    pesquisarPatios(event) {
		let search: SearchParams = new SearchParams();
		search.filters['descricao'] = event.query.toUpperCase();
		search.filters['status'] = 'A';
		search.page = 0;
		search.size = 10;
		search.sorting[event.sortField] = event.sortOrder == -1 ? 'desc' : 'asc';
		this._patioService.list(search);
	}

	public onSelectPatio(event) {
		this.estacionamentoForm.get('patioId').setValue(event.id);
		this.estacionamentoForm.get('patioDescricao').setValue(event);
    }
    
    pesquisarVeiculos(event) {
		let search: SearchParams = new SearchParams();
		search.filters['modelo'] = event.query.toUpperCase();
		search.page = 0;
		search.size = 10;
		search.sorting[event.sortField] = event.sortOrder == -1 ? 'desc' : 'asc';
		this._veiculoService.list(search);
	}

	public onSelectVeiculo(event) {
		this.estacionamentoForm.get('veiculoId').setValue(event.id);
		this.estacionamentoForm.get('veiculoModelo').setValue(event);
    }
    
        
    pesquisarClientes(event) {
		let search: SearchParams = new SearchParams();
		search.filters['nome'] = event.query.toUpperCase();
		search.page = 0;
		search.size = 10;
		search.sorting[event.sortField] = event.sortOrder == -1 ? 'desc' : 'asc';
		this._clienteService.list(search);
	}

	public onSelectCliente(event) {
		this.estacionamentoForm.get('clienteId').setValue(event.id);
		this.estacionamentoForm.get('clienteNome').setValue(event);
	}


    onValueChanged(data?: any) {
        if (!this.estacionamentoForm) { return; }
        const form = this.estacionamentoForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + '';
                }
            }
        }
    }

    formErrors = {
        'patioDescricao': '',
        
    };
    validationMessages = {
        'patioDescricao': {
            'required': 'Descrição é obrigatório!',
            'minlength': 'Descrição no mínimo 3 caracteres !',
            'maxlength': 'Descrição no máximo 50 caracteres !'
        }       
    }
 


    onBeforeSave() {
        this.estacionamentoForm.get('patioDescricao').disable();
        this.estacionamentoForm.get('veiculoModelo').disable();
        this.estacionamentoForm.get('clienteNome').disable();
        this.model = this.estacionamentoForm.value;
    }

    public limpar() {

        this.model = new Estacionamento();
        this.estacionamentoForm.reset();
        this.estacionamentoForm.get('patioDescricao').enable();
        this.estacionamentoForm.get('veiculoModelo').enable();
        this.estacionamentoForm.get('clienteNome').enable();
        this.buildForm();
    }

    public save() {

        this.onBeforeSave();
        
        if (this.estacionamentoForm.valid) {
            if (this.model.id == 0 || this.model.id == null) {

                this._estacionamentoService.save(this.model).subscribe(res => {
                    this.limpar();
                    this._messages.success("Registro Salvo com sucesso!");
                    if (res != null ){
                        this._estacionamentoService.findOne(Number(res)).subscribe(model => {
                            this.model = model;
                            if (this.model.valor != null){
                                this._messages.template("Valor a ser cobrado : "  + this.model.valor   +
                                "  \n Tempo de permanência: "  + this.model.tempoPermanencia);
                            }
                          
                        });

                    }
                })
            }
            else {
                this._estacionamentoService.save(this.model).subscribe(res => {
                    this._messages.success("Registro alterado com sucesso!");
                    this.limpar();
                    if (res != null ){
                        this._estacionamentoService.findOne(Number(res)).subscribe(model => {
                            this.model = model;
                            this._messages.template("Valor a ser cobrado : "  + this.model.valor   +
                                                    "  \n Tempo de permanência: "  + this.model.tempoPermanencia);
                        });

                    }
                })
            }
        }
        else {
            this._messages.info("Para salvar preencha os campos assinalados");
        }
    }

    public back() {
        this._router.navigate(['/administrativo/estacionamento']);
    }

    public cancel() {
        this.back();
    }

  

}






import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { GenericModel } from '../../shared/model/generic.model';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { MessageService } from '../../shared/service/message.service';
import { Util } from '../../utilitarios/util';
import { Veiculo } from './veiculo.model';
import { VeiculoService } from './veiculo.service';

@Component({
    templateUrl: './veiculo-detail.component.html',
})

export class VeiculoDetailComponent<T extends GenericModel> implements OnInit {

    public id: string;
    apiEndPointUpload = this._veiculoService._endpoint;
    public cpfValido:any;

    breadcrumb: BreadcrumbModel = new BreadcrumbModel("Administrativo", "Veículo", "Cadastro");
    pt_BR: any;

    constructor(public _route: ActivatedRoute,
        public _router: Router,
        public _messages: MessageService,
        public fb: FormBuilder,
        public _veiculoService: VeiculoService,
         public _http: Http,
        public http: HttpClient,
        public globalsVariablesService: GlobalsVariablesService
    ) {

    }

    images: any[];

    model: Veiculo = new Veiculo();
    veiculoForm: FormGroup;
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
            this._veiculoService.findOne(Number(this.id)).subscribe(model => {
                this.model = model;
                this.veiculoForm.patchValue(this.model);
            });

        }

        document.getElementById('cpf').focus();

    }


    buildForm(): void {
        this.veiculoForm = this.fb.group({
            'id': [''],
            'placa': [''],
            'modelo': [''],
            'cor': ['']          

        });

        this.veiculoForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.veiculoForm) { return; }
        const form = this.veiculoForm;

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
        'placa': '',
        'modelo': '',
        'cor': '',
        
    };
    validationMessages = {
        'placa': {
            'required': 'Placa é obrigatório!',
            'minlength': 'Descrição no mínimo 7 caracteres !',
            'maxlength': 'Descrição no máximo 7 caracteres !'
        },        
        'modelo': {
            'required': 'Modelo é obrigatório ! '
        },
        'cor': {
            'required': 'Cor e obrigatório'
        }
    }
 


    onBeforeSave() {
        this.model = this.veiculoForm.value;
    }

    public limpar() {

        this.model = new Veiculo();
        this.veiculoForm.reset();
        this.buildForm();
        document.getElementById('placa').focus();
    }

    public save() {

        this.onBeforeSave();
        
        if (this.veiculoForm.valid) {
            if (this.model.id == 0 || this.model.id == null) {

                this._veiculoService.save(this.model).subscribe(res => {
                    this._messages.success("Registro salvo com sucesso!");
                    this.limpar();
                })
            }
            else {
                this._veiculoService.save(this.model).subscribe(res => {
                    this._messages.success("Registro alterado com sucesso!");
                    this.limpar();
                })
            }
        }
        else {
            this._messages.info("Para salvar preencha os campos assinalados");
        }
    }

    public back() {
        this._router.navigate(['/administrativo/veiculo']);
    }

    public cancel() {
        this.back();
    }

  

}





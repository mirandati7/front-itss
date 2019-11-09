
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { GenericModel } from '../../shared/model/generic.model';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { MessageService } from '../../shared/service/message.service';
import { Util } from '../../utilitarios/util';
import { Patio } from './patio.model';
import { PatioService } from './patio.service';

@Component({
    templateUrl: './patio-detail.component.html',
})

export class PatioDetailComponent<T extends GenericModel> implements OnInit {

    public id: string;
    apiEndPointUpload = this._patioService._endpoint;
    public cpfValido:any;

    breadcrumb: BreadcrumbModel = new BreadcrumbModel("Administrativo", "Pátios", "Cadastro");
    pt_BR: any;

    constructor(public _route: ActivatedRoute,
        public _router: Router,
        public _messages: MessageService,
        public fb: FormBuilder,
        public _patioService: PatioService,
         public _http: Http,
        public http: HttpClient,
        public globalsVariablesService: GlobalsVariablesService
    ) {

    }

    images: any[];

    model: Patio = new Patio();
    patioForm: FormGroup;
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
            this._patioService.findOne(Number(this.id)).subscribe(model => {
                this.model = model;
                this.patioForm.patchValue(this.model);
            });

        }

        document.getElementById('descricao').focus();

    }


    buildForm(): void {
        this.patioForm = this.fb.group({
            'id': [''],
            'descricao': [''],
            'numeroVagas': [''],
            'taxaHora': ['']          

        });

        this.patioForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.patioForm) { return; }
        const form = this.patioForm;

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
        'descricao': '',
        'numeroVagas': '',
        'taxaHora': '',
        
    };
    validationMessages = {
        'descricao': {
            'required': 'Descrição é obrigatório!',
            'minlength': 'Descrição no mínimo 3 caracteres !',
            'maxlength': 'Descrição no máximo 50 caracteres !'
        },        
        'numeroVagas': {
            'required': 'Número de vagas é obrigatório ! '
        },
        'taxaHora': {
            'required': 'Taxa hora  e obrigatório !'
        }
    }
 


    onBeforeSave() {
        this.model = this.patioForm.value;
    }

    public limpar() {

        this.model = new Patio();
        this.patioForm.reset();
        this.buildForm();
        document.getElementById('placa').focus();
    }

    public save() {

        this.onBeforeSave();
        
        if (this.patioForm.valid) {
            if (this.model.id == 0 || this.model.id == null) {

                this._patioService.save(this.model).subscribe(res => {
                    this._messages.success("Registro salvo com sucesso!");
                    this.limpar();
                })
            }
            else {
                this._patioService.save(this.model).subscribe(res => {
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
        this._router.navigate(['/administrativo/patio']);
    }

    public cancel() {
        this.back();
    }

  

}






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
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';

@Component({
    templateUrl: './cliente-detail.component.html',
})

export class ClienteDetailComponent<T extends GenericModel> implements OnInit {

    public id: string;
    apiEndPointUpload = this._clienteService._endpoint;
    public cpfValido:any;

    breadcrumb: BreadcrumbModel = new BreadcrumbModel("Administrativo", "Cliente", "Cadastro");
    pt_BR: any;

    constructor(public _route: ActivatedRoute,
        public _router: Router,
        public _messages: MessageService,
        public fb: FormBuilder,
        public _clienteService: ClienteService,
         public _http: Http,
        public http: HttpClient,
        public globalsVariablesService: GlobalsVariablesService
    ) {

    }

    images: any[];

    model: Cliente = new Cliente();
    clienteForm: FormGroup;
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
            this._clienteService.findOne(Number(this.id)).subscribe(model => {
                this.model = model;
                this.clienteForm.patchValue(this.model);
            });

        }

        document.getElementById('cpf').focus();

    }


    buildForm(): void {
        this.clienteForm = this.fb.group({
            'id': [''],
            'nome': [''],
            'cpf': [''],
            'telefone': ['']          

        });

        this.clienteForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.clienteForm) { return; }
        const form = this.clienteForm;

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
        'nome': '',
        'cpf': '',
        'telefone': '',
        
    };
    validationMessages = {
        'nome': {
            'required': 'Codigo é obrigatório!',
            'minlength': 'Descrição no mínimo 4 caracteres !',
            'maxlength': 'Descrição no máximo 24 caracteres !'
        },        
        'cpf': {
            'required': 'CNPJ/Cpf é obrigatório ser valido '
        },
        'telefone': {
            'required': 'Telefone e obrigatório'
        }
    }
 


    onBeforeSave() {
        this.model = this.clienteForm.value;
    }

  


    public limpar() {

        this.model = new Cliente();
        this.clienteForm.reset();
        this.buildForm();
        document.getElementById('nome').focus();
    }

    public save() {

        this.onBeforeSave();
        


        if (this.clienteForm.valid) {
            if (this.model.id == 0 || this.model.id == null) {

                this._clienteService.save(this.model).subscribe(res => {
                    this._messages.success("Registro salvo com sucesso!");
                    this.limpar();
                })
            }
            else {
                this._clienteService.save(this.model).subscribe(res => {
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
        this._router.navigate(['/administrativo/cliente']);
    }

    public cancel() {
        this.back();
    }


  

}





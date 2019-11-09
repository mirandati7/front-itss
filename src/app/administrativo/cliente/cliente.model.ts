import { GenericModel } from '../../shared/model/generic.model';

export class Cliente extends GenericModel {

    public id: number;
    public nome: String;
    public cpf: String;
    public telefone: String;


}

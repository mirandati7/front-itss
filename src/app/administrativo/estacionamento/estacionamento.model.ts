import { GenericModel } from '../../shared/model/generic.model';

export class Estacionamento extends GenericModel {

    public id: number;
    public clienteId: number;
    public clienteNome: string;
    public veiculoId: number;
    public veiculoModelo: string;
    public veiculoPlaca: string;
    public patioId: number;
    public patioDescricao: string;
    public tempoPermanencia: number;
    public valor: number;
    public dataHoraChegada: Date;
    public dataHoraSaida: Date;

}

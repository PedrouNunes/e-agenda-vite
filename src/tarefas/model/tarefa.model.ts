


// Extends = herança
// implements = implementando

import { EntidadeBase } from "../../shared/entidade.model";
import { Prioridade } from "./prioridade.enum";

export class Tarefa extends EntidadeBase{
    public descricao: string;
    public dataCriacao: Date;
    // public dataConclusao?: Date;
    public prioridade: Prioridade;

    constructor(descricao: string, prioridade: Prioridade, id?: string){
        super();

        if(id){
            this.id = id;
        }
        
        this.descricao = descricao;
        this.dataCriacao = new Date();
       // this.dataConclusao = new Date();
        this.prioridade = prioridade;

    }
}
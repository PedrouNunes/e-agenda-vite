import { IPaginaHTML } from "../shared/pagina.interface";
import { IPaginaListagem } from "../shared/pagina.list.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Tarefa } from "./model/tarefa.model";
import { TarefaRepositoryLocalStorage } from "./repositories/tarefa.repository.local-storage";



class TarefaPaginaListagem implements IPaginaHTML, IPaginaListagem{

    tabela: HTMLTableElement;

    constructor(private repositorioTarefas: IRepositorio<Tarefa>){
        this.configurarElementos();

        this.atualizarTabela();
    }

    configurarElementos(): void {
        this.tabela = document.getElementById("tabela") as HTMLTableElement;
    }

    atualizarTabela(): void {
        const tarefas = this.repositorioTarefas.selecionarTodos();

    let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

    tarefas.forEach(tarefa => {
        const novaLinha = corpoTabela.insertRow();

        Object.values(tarefa).forEach((valor: any) => {
            const novaCelula = novaLinha.insertCell(); 

            novaCelula.innerText = valor;
        });

        const celulaBotoes = novaLinha.insertCell();

        const btnEditar = document.createElement("a");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btn btn-primary me-2";

        btnEditar.addEventListener("click", () => {
            const idSelecionado = tarefa.id;

            // parâmetro de query, quer dizer que a informação que estiver após o sinal de interrogação vai ser algo que vai estar sendo disponível no navegador
            window.location.href = `tarefa.create.html?id=${idSelecionado}`;
        });


        const btnExcluir = document.createElement("a");
        btnExcluir.innerText = "Excluir";
        btnExcluir.className = "btn btn-outline-warning";

        btnExcluir.addEventListener("click", () => {
            const idSelecionado = tarefa.id;    

            this.repositorioTarefas.excluir(idSelecionado);

            window.location.reload();
        });

        celulaBotoes.appendChild(btnEditar);
        celulaBotoes.appendChild(btnExcluir);

    });
    }
}

new TarefaPaginaListagem(new TarefaRepositoryLocalStorage());
import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Contato } from "./model/contato.model";
import { ContatoRepositoryLocalStorage } from "./repositories/contato.repository.local-storage";


class ContatoPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
    private txtNome: HTMLInputElement;
    private txtEmail: HTMLInputElement;
    private txtTelefone: HTMLInputElement;
    private txtEmpresa: HTMLInputElement;
    private txtCargo: HTMLInputElement;
    private btnSalvar: HTMLButtonElement;
    private idSelecionado: string;
 
    constructor(public repositorioContatos: IRepositorio<Contato>, id?: string){
     this.configurarElementos();
 
     if(id){
       this.idSelecionado = id;
 
       const contatoSelecionado = this.repositorioContatos.selecionarPorId(id);
 
       if(contatoSelecionado)
         this.preencherFormulario(contatoSelecionado);
     }
    }
 
    private preencherFormulario(contatoSelecionado: Contato){
     this.txtNome.value = contatoSelecionado.nome;
     this.txtEmail.value = contatoSelecionado.email;
     this.txtTelefone.value = contatoSelecionado.telefone;
     this.txtEmpresa.value = contatoSelecionado.empresa;
     this.txtCargo.value = contatoSelecionado.cargo;
    }
 
    configurarElementos(): void {
     this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
     this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
     this.txtTelefone = document.getElementById("txtTelefone") as HTMLInputElement;
     this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
     this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;
     this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;
 
     // operador discard _ (discartar parâmetro que está vindo caso não queiramos usá-lo)
     this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
   }
 
   gravarRegistros(): void {
     const contato = this.obterDadosFormulario();
 
     if(!this.idSelecionado)
       this.repositorioContatos.inserir(contato);
     else
       this.repositorioContatos.editar(contato.id, contato);
 
     // método para redirecionar usuario
     window.location.href = "contato.list.html";
   }
 
   private obterDadosFormulario(): Contato {
     const nome = this.txtNome.value;
     const email = this.txtEmail.value;
     const telefone = this.txtTelefone.value;
     const empresa = this.txtEmpresa.value;
     const cargo = this.txtCargo.value;
 
     let contato = null;
     
     if (!this.idSelecionado)
     contato = new Contato(nome, email, telefone, empresa, cargo);
     else
     contato = new Contato(nome, email, telefone, empresa, cargo, this.idSelecionado);
 
     return contato;
   }
 }
 
 const params =  new URLSearchParams(window.location.search);
 
 const id = params.get("id") as string;
 
 new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage(), id);
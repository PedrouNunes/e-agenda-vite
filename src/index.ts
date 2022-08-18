import { IPaginaHTML } from "./shared/pagina.interface";


class Index implements IPaginaHTML{
    btnCadastrar: HTMLButtonElement;

    constructor(){
        this.configurarElementos();
    }

    // método responsável pelo data bading dos elementos da página(dados da página)
    public configurarElementos(): void {
        this.btnCadastrar = document.getElementById("btnCadastrar") as HTMLButtonElement;

        this.btnCadastrar.addEventListener("click", () => console.log("Clicado"));
    }
}

new Index();
var r=Object.defineProperty;var c=(s,t,o)=>t in s?r(s,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[t]=o;var a=(s,t,o)=>(c(s,typeof t!="symbol"?t+"":t,o),o);class l{constructor(){a(this,"localStorage");a(this,"contatos");this.localStorage=window.localStorage,this.contatos=this.selecionarTodos()}gravar(){const t=JSON.stringify(this.contatos);this.localStorage.setItem("contatos",t)}inserir(t){this.contatos.push(t),this.gravar()}editar(t,o){const e=this.contatos.findIndex(n=>n.id===t);this.contatos[e]={id:t,nome:o.nome,email:o.email,telefone:o.telefone,empresa:o.empresa,cargo:o.cargo},this.gravar()}excluir(t){this.contatos=this.contatos.filter(o=>o.id!==t),this.gravar()}selecionarTodos(){const t=this.localStorage.getItem("contatos");return t?JSON.parse(t):[]}selecionarPorId(t){return this.contatos.find(o=>o.id===t)}}export{l as C};

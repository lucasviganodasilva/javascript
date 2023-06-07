class Cliente {
    constructor(nome, taxa) {
        this.nome = nome;
        this.produtosConsumidos = [];
        this.taxa = taxa;
    }

    adicionarProdutoConsumido(produto) {
        this.produtosConsumidos.push(produto);
    }
}

class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
}

class Estabelecimento {
    constructor() {
        this.clientes = [];
        this.produtos = [];
    }

    adicionarCliente(cliente) {
        this.clientes.push(cliente);
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    calcularDivisaoDaConta() {
        const valorPorCliente = {};

        for (const cliente of this.clientes) {
            let valorConsumido = 0;
            for (const produto of cliente.produtosConsumidos) {
                valorConsumido += produto.preco;
            }

            const valorComTaxa = cliente.taxa ? valorConsumido + valorConsumido * 0.1 : valorConsumido;
            valorPorCliente[cliente.nome] = valorComTaxa.toFixed(2);
        }

        return valorPorCliente;
    }
}

const estabelecimento = new Estabelecimento();

function adicionarCliente(event) {
    event.preventDefault();

    const form = event.target;
    const nome = form.elements["icliente"].value;
    const taxa = form.elements["itaxa"].checked;
    const cliente = new Cliente(nome, taxa);
    estabelecimento.adicionarCliente(cliente);

    form.reset();
    exibirClientes();
    exibirClientesComCheckbox();
}

function adicionarProduto(event) {
    event.preventDefault();

    const form = event.target;
    const nome = form.elements["iproduto"].value;
    const preco = parseFloat(form.elements["ipreco"].value);
    const produto = new Produto(nome, preco);
    estabelecimento.adicionarProduto(produto);

    const produtoSelect = document.getElementById("iconsumido");

    var opt = document.createElement("option");
    opt.value = produto.nome;
    opt.innerHTML = produto.nome;
    produtoSelect.appendChild(opt);

    form.reset();
    exibirProdutos();
}

function adicionarProdutoConsumido(event) {
    event.preventDefault();

    const form = event.target;
    const clientes = document.querySelectorAll("input[type=checkbox]");
    const arrayClientes = [...clientes].map((cliente) => ({
        nome: cliente.id,
        checked: cliente.checked
    }));
    const clientesChecked = arrayClientes.filter((cliente) => cliente.checked);

    const nomeProduto = form.elements["iconsumido"].value;
    console.log(nomeProduto);

    const produto = estabelecimento.produtos.find((p) => p.nome === nomeProduto);

    const produtoConjunto = {
        nome: produto.nome,
        preco: produto.preco / clientesChecked.length
    };

    if (!produto) {
        alert(`Produto "${nomeProduto}" não encontrado!`);
        form.reset();
        return;
    }

    clientesChecked.forEach((cliente) => {
        const _cliente = estabelecimento.clientes.find(
            (c) => c.nome === cliente.nome
        );
        _cliente.adicionarProdutoConsumido(produtoConjunto);
    });

    form.reset();
    exibirClientes();
}

function calcularDivisaoDaConta(event) {
    event.preventDefault();

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
    const resultado = estabelecimento.calcularDivisaoDaConta();
    for (const cliente in resultado) {
        const valorDiv = document.createElement("div");
        valorDiv.textContent = `${cliente}: R$ ${resultado[cliente]}`;
        resultadosDiv.appendChild(valorDiv);
    }
}

function exibirClientes() {
    const clientesDiv = document.getElementById("clientes");
    clientesDiv.innerHTML = "";

    for (const cliente of estabelecimento.clientes) {
        const clienteDiv = document.createElement("div");
        clienteDiv.textContent = cliente.nome;
        clientesDiv.appendChild(clienteDiv);
    }
}

function exibirClientesComCheckbox() {
    const clientesDiv = document.getElementById("clientes-selecao");
    clientesDiv.innerHTML = "";

    for (const cliente of estabelecimento.clientes) {
        const checkboxClient = document.createElement("input");
        const checkboxLabel = document.createElement("label");
        checkboxClient.setAttribute("type", "checkbox");
        checkboxClient.setAttribute("id", cliente.nome);
        checkboxLabel.setAttribute("id", cliente.nome);
        checkboxLabel.textContent = cliente.nome;
        clientesDiv.appendChild(checkboxLabel);
        clientesDiv.appendChild(checkboxClient);
    }
}

function exibirProdutos() {
    const produtosDiv = document.getElementById("produtos");
    produtosDiv.innerHTML = "";

    for (const produto of estabelecimento.produtos) {
        const produtoDiv = document.createElement("div");
        produtoDiv.textContent = `${produto.nome}: R$ ${produto.preco}`;
        produtosDiv.appendChild(produtoDiv);
    }
}

function inicializar() {
    const formCliente = document.getElementById("form-clientes");
    formCliente.addEventListener("submit", adicionarCliente);

    const formProduto = document.getElementById("form-produtos");
    formProduto.addEventListener("submit", adicionarProduto);

    const formProdutoConsumido = document.getElementById("form-consumidos");
    formProdutoConsumido.addEventListener("submit", adicionarProdutoConsumido);

    const formDivisaoConta = document.getElementById("calcular");
    formDivisaoConta.addEventListener("click", calcularDivisaoDaConta);

    exibirClientes();
    exibirProdutos();
}

inicializar();
let listaAmigos = [];
let foiSorteado = false;

function adicionar()
{  
    if (foiSorteado)
    {
        alert('Clique em reiniciar primeiro.');
        return;
    }
    else if (validarEntrada(document.getElementById('nome-amigo')))
    {
        alert('O campo nome não foi preenchido ou é inválido.');
        return;
    }
    else if (listaAmigos.includes(document.getElementById('nome-amigo').value.toLowerCase()))
    {
        alert('O nome inserido já foi adicionado anteriormente.');
        return;
    }
    else
    {
        listaAmigos.push(document.getElementById('nome-amigo').value.toLowerCase());
        let elementoAncora = document.createElement('a');
        elementoAncora.textContent = capitular(listaAmigos[listaAmigos.length -1] + ' ');
        adicionarElemento(document.getElementById('lista-amigos'), adicionarAtributo('onClick', 'remover(this)', adicionarAtributo('href', '#', adicionarClasse('form__link', elementoAncora))));
        document.getElementById('nome-amigo').value = '';
    }
}

function sortear()
{
    if (foiSorteado)
    {
        alert('Clique em reiniciar primeiro.');
        return;
    }
    else if (listaAmigos.length < 4)
    {
        alert('É necessário adicionar quatro ou mais amigos para sortear.');
        return;
    }
    else if(listaAmigos.length % 2 == 1 && !confirm('A quantidade de amigos é ímpar!\nDeseja continuar mesmo assim?'))
    {
        return;
    }
    else
    {
        sortearPares(listaAmigos);
        foiSorteado = true;
    }
}

function reiniciar()
{
    document.getElementById('lista-amigos').textContent = document.getElementById('nome-amigo').value = document.getElementById('lista-sorteio').textContent = '';
    listaAmigos = [];
    foiSorteado = false;
}

function remover(elemento)
{
    listaAmigos.splice(listaAmigos.indexOf(elemento.textContent),1);
    elemento.remove();
}

function validarEntrada(entrada)
{
    return entrada.value.match(/[^a-z]/gi) || '' == entrada.value;
}

function capitular(entrada)
{
    return `${entrada.charAt(0).toUpperCase() + entrada.slice(1)}`;
}

function adicionarClasse(classe, elemento)
{
    elemento.classList.add(classe);    
    return elemento;
}

function adicionarAtributo(atributo, valor, elemento)
{
    elemento.setAttribute(atributo, valor);
    return elemento;
}

function adicionarElemento(elementoPai, elementoFilho)
{
    elementoPai.append(elementoFilho);
    return elementoPai;
}

function sortearIndice(tamanho)
{    
    return Math.floor(Math.random() * (tamanho - 2));
}

function listarSorteio(sorteador, sorteado)
{
    document.getElementById('lista-sorteio').textContent += `${capitular(sorteador)} ➜ ${capitular(sorteado)}\n`;
}

Array.prototype.embaralhar = function () {
    for (let indice = 0; indice < this.length; indice++) {
        let indiceSorteado = sortearIndice(this.length);
        let temporario = this[indiceSorteado];
        this[indiceSorteado] = this[indice]
        this[indice] = temporario;
    }
    return this;
};

function sortearPares(lista)
{
    lista.embaralhar();
    while (lista.length > 0)
    {
        if (lista.length == 1)
        {
            document.getElementById('lista-amigos').textContent = `${capitular(lista[0])} ficou de fora.`;
            return;
        }
        else
        {
            listarSorteio(lista[lista.length -1], lista[lista.length -2]);
            lista.splice(lista.length - 2, 2);
        }
    }
}
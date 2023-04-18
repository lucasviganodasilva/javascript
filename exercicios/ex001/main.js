function tocaSom (idElementoAudio) {
    document.querySelector(idElementoAudio).play();
}

function escolheSom (e) {
    tocaSom ('#' + e.id);
}

const listaDeTeclas = document.querySelectorAll('.tecla')

let contador = 0;

while (contador < listaDeTeclas.length) {
    listaDeTeclas[contador].onclick = escolheSom (listaDeTeclas[contador]);

    contador = contador + 1;
}


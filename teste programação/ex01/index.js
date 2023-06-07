let arabicoRomano = [
    {numero: 1000, romano: 'M'},
    {numero: 500, romano: 'D'},
    {numero: 900, romano: 'CM'},
    {numero: 400, romano: 'CD'},
    {numero: 100, romano: 'C'},
    {numero: 90, romano: 'XC'},
    {numero: 50, romano: 'L'},
    {numero: 40, romano: 'XL'},
    {numero: 10, romano: 'X'},
    {numero: 9, romano: 'IX'},
    {numero: 5, romano: 'V'},
    {numero: 4, romano: 'IV'},
    {numero: 1, romano: 'I'},
];

function convert(numeroArabico) {
    let numeroRomano = '';
    let numero = numeroArabico;

    for(let i = 0; i < arabicoRomano.length; i++) {
        if (arabicoRomano[i].numero <= numero) {
            numero = numero - arabicoRomano[i].numero
            numeroRomano = numeroRomano + arabicoRomano[i].romano;

            i--;
        }
    }

    document.getElementById('iromano').value = numeroRomano;
}

document.getElementById('conversor').addEventListener('click',function() {
    let numero = document.getElementById('inumero').value;

    convert(numero);
});
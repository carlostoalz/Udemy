function getNombre() {
    return "Fernando";
}
var nombre = "Carlos Andres";
var apellido = "Tobon Alzate";
var edad = 28;
var numero = 1020443492;
var booleano = true;
var hoy = new Date();
var cualquiera;
var texto = "Hola, \n" + nombre + " " + apellido + " \n(" + edad + ")";
// console.log(texto);
var texto2 = "" + getNombre();
// console.log(texto2);
cualquiera = nombre;
cualquiera = numero;
cualquiera = booleano;
cualquiera = hoy;
var spiderman = {
    nombre: "Peter",
    apellido: "Parker",
    edad: 20
};
spiderman = {
    nombre: "Miles",
    apellido: "Morales",
    edad: 16
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function activar(quien, objeto, momento) {
    if (objeto === void 0) { objeto = "Batiseñal"; }
    var mensaje;
    if (momento) {
        mensaje = quien + " activ\u00F3 la " + objeto + " en la " + momento;
    }
    else {
        mensaje = quien + " activ\u00F3 la " + objeto;
    }
    // console.log(mensaje);
}
activar("Gordon", "Batiseñal", "noche");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var miFuncion = function (a) {
    return a;
};
var miFuncionF = function (a) { return a; };
var miFuncion2 = function (a, b) {
    return a + b;
};
var miFuncionF2 = function (a, b) { return a + b; };
var miFuncion3 = function (nombre) {
    nombre = nombre.toUpperCase();
    return nombre;
};
var miFuncionF3 = function (nombre) {
    nombre = nombre.toUpperCase();
    return nombre;
};
// console.log(miFuncion("Normal"));
// console.log(miFuncionF("Flecha"));
var verde = {
    nombre: "Hulk",
    smash: function () {
        var _this = this;
        setTimeout(function () { return console.log(_this.nombre + " smash!!"); }, 1500);
    }
};
//verde.smash();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var avenger = {
    call: "Stive",
    clave: "Capitan America",
    poder: "Suero del super soldado"
};
var call = avenger.call, clave = avenger.clave, poder = avenger.poder;
//console.log(call,clave,poder);
var avengers = ["Thor", "Steve", "Tony"];
var thor = avengers[0], capi = avengers[1], ironman = avengers[2];
function enviarMision(xmen) {
    console.log("Enviando a: " + xmen.nombre);
}
var wolverine = {
    nombre: "Wolverine",
    poder: "Regeneracion"
};
enviarMision(wolverine);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Avenger = /** @class */ (function () {
    function Avenger() {
        console.log("Se ejecuto el constructor");
    }
    return Avenger;
}());
var antMan = new Avenger();
console.log(antMan);

function getNombre(){
    return "Fernando";
}

let nombre:string = "Carlos Andres";
let apellido:string = "Tobon Alzate";
let edad:number = 28;
let numero:number = 1020443492;
let booleano:boolean = true;
let hoy:Date = new Date();
let cualquiera:any;

let texto:string = `Hola, 
${nombre} ${apellido} 
(${edad})`;

// console.log(texto);

let texto2:string = `${getNombre()}`;

// console.log(texto2);


cualquiera = nombre;
cualquiera = numero;
cualquiera = booleano;
cualquiera = hoy;

let spiderman = {
    nombre: "Peter",
    apellido: "Parker",
    edad: 20
};

spiderman = {
    nombre: "Miles",
    apellido: "Morales",
    edad: 16
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function activar(quien:string, objeto:string = "Batiseñal", momento?:string){
    let mensaje:string;

    if (momento) {
        mensaje = `${quien} activó la ${objeto} en la ${momento}`;
    }else{
        mensaje = `${quien} activó la ${objeto}`;
    }

    // console.log(mensaje);
}

activar("Gordon", "Batiseñal", "noche");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let miFuncion = function (a) {
    return a;    
};

let miFuncionF = (a) => a;

let miFuncion2 = function (a:number,b:number) {
    return a + b;
};

let miFuncionF2 = (a:number,b:number) => a+b;

let miFuncion3 = function (nombre:string) {
    nombre = nombre.toUpperCase();
    return nombre;    
};

let miFuncionF3 = (nombre:string) => {
    nombre = nombre.toUpperCase();
    return nombre;   
}

// console.log(miFuncion("Normal"));
// console.log(miFuncionF("Flecha"));

let verde = {
    nombre: "Hulk",
    smash(){
        setTimeout(() => console.log(`${this.nombre} smash!!`), 1500);
    }
}

//verde.smash();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let avenger = {
    call : "Stive",
    clave : "Capitan America",
    poder : "Suero del super soldado"
};

let { call, clave, poder } = avenger;

//console.log(call,clave,poder);

let avengers:string[] = ["Thor","Steve","Tony"];

let [thor,capi,ironman] = avengers;

//console.log(thor,capi,ironman);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let prom1 = new Promise( function(resolve, reject){
//     setTimeout(()=>{
//         console.log("Promesa Tewrminada");
        
//         //termina bien
//         resolve();

//         //Termina mal
//         //reject();

//     }, 1500);
// });

// prom1.then(function(){
//     console.log("Ejecutarme cuando se termine bien");
// },
// function(){
//     console.error("Ejecutarme si todo sale mal");
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Xmen{
    nombre:string,
    poder:string
}

function enviarMision(xmen:Xmen) {
    console.log("Enviando a: " + xmen.nombre);
}

let wolverine:Xmen = {
    nombre: "Wolverine",
    poder: "Regeneracion"
};

enviarMision(wolverine);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Avenger {
    nombre:string;
    equipo:string;
    nombreReal:string;
    puedePelear:boolean;
    peleasGanadas:number;

    constructor(){
        console.log("Se ejecuto el constructor");
    }
}

let antMan:Avenger = new Avenger();
console.log(antMan);
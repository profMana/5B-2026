/* ###### 1 TIPI BASE ###### */
const results = document.getElementById("results")

let eta: number = 28;
let isOnline: boolean = true;
let nome: string = "Alice";

// Inferenza: Typescript capisce che messaggio è una stringa
let messaggio = "Introduzione a TS";

let varLibera: any = 123; 
varLibera = "Ora è una stringa";
varLibera = false;

// Funzione
function saluta(utente: string, anni: number): string{
    return `Ciao ${utente}, hai ${anni} anni!`;
}

let output: string = saluta(nome, eta);
results!.innerHTML = output + "<br>";
results!.innerHTML += "Messaggio: " + messaggio + "<br>";

/* ###### 2 ARRAY e JSON ###### */
// Array 1
let numeri: number[] = [10, 20, 30, 40, 50,]; 
// Array 2
let nomi: Array<string> = ["Alice", "Bruno", "Carla", "Davide"];

// Oggetto Tipizzato
let studenti: {nome: string; eta: number} = {
    nome: "Luca",
    eta: 16
}

function sommaNumeri(arr: number[]): number{
    let somma = 0;
    for(let i = 0; i < arr.length; i++)
        somma += arr[i]!;
    return somma;
    // return arr.reduce((acc, val) => acc + val, 0);
}
function filtraNomiLunghi(arr: string[]): string[]{
    return arr.filter(n => n.length > 5);
}
function descriviPersona(p: {nome: string; eta: number}): string{
    return `${p.nome} ha ${p.eta} anni.`;
}
results!.innerHTML += "Somma dei numeri: " + sommaNumeri(numeri) + "<br>";
results!.innerHTML += "Nomi (più 5 lettere): " + filtraNomiLunghi(nomi) + "<br>";
results!.innerHTML +=  descriviPersona(studenti) + "<br>";

/* ###### 3 Funzioni Tipizzate ###### */

/* ###### 4 Classi ###### */
/* ###### 5 Interfacce ###### */
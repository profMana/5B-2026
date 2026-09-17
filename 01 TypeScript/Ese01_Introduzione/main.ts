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
function saluta(utente: string, anni: number): string {
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
let studenti: { nome: string; eta: number } = {
    nome: "Luca",
    eta: 16
}

function sommaNumeri(arr: number[]): number {
    let somma = 0;
    for (let i = 0; i < arr.length; i++)
        somma += arr[i]!;
    return somma;
    // return arr.reduce((acc, val) => acc + val, 0);
}
function filtraNomiLunghi(arr: string[]): string[] {
    return arr.filter(n => n.length > 5);
}
function descriviPersona(p: { nome: string; eta: number }): string {
    return `${p.nome} ha ${p.eta} anni.`;
}
results!.innerHTML += "Somma dei numeri: " + sommaNumeri(numeri) + "<br>";
results!.innerHTML += "Nomi (più 5 lettere): " + filtraNomiLunghi(nomi) + "<br>";
results!.innerHTML += descriviPersona(studenti) + "<br>";

/* ###### 3 Funzioni Tipizzate ###### */
function primoElemento<T>(array: T[]): T | undefined {
    return array[0];
}
// Array numeri
let num = primoElemento<number>([10, 20, 30, 40]);
// Array string 
let str = primoElemento<string>(["uno", "due", "tre"]);
// Oggetti
let persona = primoElemento<{ nome: string; eta: number }>([
    { nome: "Alice", eta: 42 },
    { nome: "Bruno", eta: 23 }
]);
results!.innerHTML += "Primo numero " + num + "<br>";
results!.innerHTML += "Prima stringa " + str + "<br>";
results!.innerHTML += "Primo persona " + JSON.stringify(persona) + "<br>";

/* ###### 4 Classi ###### */
class Animale {
    constructor(public nome: string) { }

    parla(): void {
        results!.innerHTML += `${this.nome} fa un verso generico..` + "<br/>";
    }
}

class Cane extends Animale {
    parla(): void {
        results!.innerHTML += `${this.nome} abbia..` + "<br/>";
    }
}

class Gatto extends Animale {
    parla(): void{
        results!.innerHTML += `${this.nome} miagola..` + "<br/>";
    }
}
let animale = new Animale("Creatura misteriosa");
let cane = new Cane("Fido");
let gatto = new Gatto("Micio");

animale.parla();
cane.parla();
gatto.parla();

/* ###### 5 Interfacce ###### */
// Definizione di una interfaccia
interface Prodotto{
    readonly id: number;
    nome: string; 
    prezzo: number;
    quantita?: number; // opzionale
    categoria?: string;  // opzionale
}
// Creo array di prodotti
let carrello: Prodotto[] = [
    { id: 1, nome: "Mouse", prezzo: 20},
    { id: 2, nome: "Zaino", prezzo: 50, quantita: 2},
    { id: 3, nome: "Laptop", prezzo: 799, quantita: 1, categoria: "Elettronica"}
];

function calcolaTotale(carrello: Prodotto[]): number
{
    let totale = 0; 
    for(let p of carrello)
        totale += p.prezzo * (p.quantita ?? 1);
    return totale;
}

function stampaCarrello(carrello: Prodotto[]): void{
    results!.innerHTML += "Carrello:" + "<br>";
    for (let p of carrello){
        results!.innerHTML += `
            nome=${p.nome} - categoria=${p.categoria ?? "Generico"} -
            quantità=${p.quantita ?? 1} - prezzo=${p.prezzo}
        ` + "<br>";
    }
    results!.innerHTML += "Totale: Euro " + calcolaTotale(carrello) + "<br>";
}
stampaCarrello(carrello);
// carrello[0].id = 99;
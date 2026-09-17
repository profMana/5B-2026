/* ###### 1 TIPI BASE ###### */
const results = document.getElementById("results");
let eta = 28;
let isOnline = true;
let nome = "Alice";
// Inferenza: Typescript capisce che messaggio è una stringa
let messaggio = "Introduzione a TS";
let varLibera = 123;
varLibera = "Ora è una stringa";
varLibera = false;
// Funzione
function saluta(utente, anni) {
    return `Ciao ${utente}, hai ${anni} anni!`;
}
let output = saluta(nome, eta);
results.innerHTML = output + "<br>";
results.innerHTML += "Messaggio: " + messaggio + "<br>";
/* ###### 2 ARRAY e JSON ###### */
// Array 1
let numeri = [10, 20, 30, 40, 50,];
// Array 2
let nomi = ["Alice", "Bruno", "Carla", "Davide"];
// Oggetto Tipizzato
let studenti = {
    nome: "Luca",
    eta: 16
};
function sommaNumeri(arr) {
    let somma = 0;
    for (let i = 0; i < arr.length; i++)
        somma += arr[i];
    return somma;
    // return arr.reduce((acc, val) => acc + val, 0);
}
function filtraNomiLunghi(arr) {
    return arr.filter(n => n.length > 5);
}
function descriviPersona(p) {
    return `${p.nome} ha ${p.eta} anni.`;
}
results.innerHTML += "Somma dei numeri: " + sommaNumeri(numeri) + "<br>";
results.innerHTML += "Nomi (più 5 lettere): " + filtraNomiLunghi(nomi) + "<br>";
results.innerHTML += descriviPersona(studenti) + "<br>";
/* ###### 3 Funzioni Tipizzate ###### */
function primoElemento(array) {
    return array[0];
}
// Array numeri
let num = primoElemento([10, 20, 30, 40]);
// Array string 
let str = primoElemento(["uno", "due", "tre"]);
// Oggetti
let persona = primoElemento([
    { nome: "Alice", eta: 42 },
    { nome: "Bruno", eta: 23 }
]);
results.innerHTML += "Primo numero " + num + "<br>";
results.innerHTML += "Prima stringa " + str + "<br>";
results.innerHTML += "Primo persona " + JSON.stringify(persona) + "<br>";
/* ###### 4 Classi ###### */
class Animale {
    nome;
    constructor(nome) {
        this.nome = nome;
    }
    parla() {
        results.innerHTML += `${this.nome} fa un verso generico..` + "<br/>";
    }
}
class Cane extends Animale {
    parla() {
        results.innerHTML += `${this.nome} abbia..` + "<br/>";
    }
}
class Gatto extends Animale {
    parla() {
        results.innerHTML += `${this.nome} miagola..` + "<br/>";
    }
}
let animale = new Animale("Creatura misteriosa");
let cane = new Cane("Fido");
let gatto = new Gatto("Micio");
animale.parla();
cane.parla();
gatto.parla();
// Creo array di prodotti
let carrello = [
    { id: 1, nome: "Mouse", prezzo: 20 },
    { id: 2, nome: "Zaino", prezzo: 50, quantita: 2 },
    { id: 3, nome: "Laptop", prezzo: 799, quantita: 1, categoria: "Elettronica" }
];
function calcolaTotale(carrello) {
    let totale = 0;
    for (let p of carrello)
        totale += p.prezzo * (p.quantita ?? 1);
    return totale;
}
function stampaCarrello(carrello) {
    results.innerHTML += "Carrello:" + "<br>";
    for (let p of carrello) {
        results.innerHTML += `
            nome=${p.nome} - categoria=${p.categoria ?? "Generico"} -
            quantità=${p.quantita ?? 1} - prezzo=${p.prezzo}
        ` + "<br>";
    }
    results.innerHTML += "Totale: Euro " + calcolaTotale(carrello) + "<br>";
}
stampaCarrello(carrello);
carrello[0].id = 99;
export {};
//# sourceMappingURL=main.js.map
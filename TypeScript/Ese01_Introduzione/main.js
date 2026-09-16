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
export {};
/* ###### ###### */
/* ###### ###### */
/* ###### ###### */ 
//# sourceMappingURL=main.js.map
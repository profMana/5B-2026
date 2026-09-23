var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const results = document.getElementById("results");
results.innerHTML = "";
/*
Un decoratore è una funzione speciale che si può "agganciare" a:
 - Una classe
 - Un metodo
 - Getter/Setter
 - Proprietà
 - Parametri di un metodo

 Permettono la modifica di un comportamento originale
 Tutti i decoratori vengono eseguiti in fase di DEFINIZIONE della classe
 */
function stampaTitolo(titolo) {
    results.innerHTML += `<h3>${titolo}</h3>`;
}
function stampaMsg(messaggio) {
    console.log(messaggio);
    results.innerHTML += `${messaggio}<br>`;
}
/* ====== DECORATORE DI CLASSE SEMPLICE ===== */
stampaTitolo("DECORATORE DI CLASSE SEMPLICE");
function Logger(costruttore) {
    stampaMsg("Sono nel decoratore Logger (eseguito alla DEFINIZIONE della classe)");
}
let Persona1 = class Persona1 {
    constructor() {
        stampaMsg("Sono nel costruttore della classe Persona1");
    }
};
Persona1 = __decorate([
    Logger
], Persona1);
stampaMsg("Sto per creare un'istanza di Persona1...");
const persona1 = new Persona1();
/* ====== DECORATORE FACTORY ===== */
stampaTitolo("DECORATORE FACTORY PARAMETRIZZATO");
function LoggerConMessaggio(messaggio) {
    return function (costruttore) {
        stampaMsg(messaggio);
        stampaMsg("Costruttore ricevuto: " + costruttore);
    };
}
let Persona2 = class Persona2 {
    constructor() {
        stampaMsg("Sono nel costruttore della classe Persona2");
    }
};
Persona2 = __decorate([
    LoggerConMessaggio("Messaggio personalizzato passato alla factory")
], Persona2);
const persona2 = new Persona2();
/* ====== DECORATORE DI METODO ===== */
stampaTitolo("DECORATORE DI METODO");
function Log(target, nomeMetodo, descriptor) {
    const metodoOriginale = descriptor.value;
    descriptor.value = function (...argomenti) {
        stampaMsg(`Chiamato il metodo "${nomeMetodo}" con argomenti: [${argomenti.join(", ")}]`);
        const risultato = metodoOriginale.apply(this, argomenti);
        stampaMsg(`Il metodo "${nomeMetodo}" ha restituito: ${risultato}`);
        return risultato;
    };
}
class Calcolatrice {
    somma(a, b) {
        return a + b;
    }
}
__decorate([
    Log
], Calcolatrice.prototype, "somma", null);
const calcolatrice = new Calcolatrice();
calcolatrice.somma(4, 7);
/* ====== DECORATORE DI PROPRIETA' ===== */
stampaTitolo("DECORATORE DI PROPRIETA'");
function Richiesto(target, nomeProprieta) {
    // salvo l'elenco delle proprietà direttamente nel costruttore
    if (!target.constructor.proprietaRichieste)
        target.constructor.proprietaRichieste = [];
    target.constructor.proprietaRichieste.push(nomeProprieta);
}
function valida(oggetto) {
    const richieste = oggetto.constructor.proprietaRichieste || [];
    for (const proprieta of richieste) {
        if (!oggetto[proprieta]) {
            stampaMsg(`Validazione FALLITA: la proprietà "${proprieta}" è obbligatoria`);
            return false;
        }
    }
    return true;
}
class Utente {
    nome = "";
    email = "";
}
__decorate([
    Richiesto
], Utente.prototype, "nome", void 0);
__decorate([
    Richiesto
], Utente.prototype, "email", void 0);
const utenteValido = new Utente();
utenteValido.nome = "Anna";
utenteValido.email = "anna@email.com";
valida(utenteValido);
const utenteNonValido = new Utente();
utenteNonValido.nome = "Luca";
valida(utenteNonValido);
/* ====== ORDINE DI ESECUZIONE ===== */
stampaTitolo("ORDINE DI ESECUZIONE'");
function CreaDecoratoreClasse(nome) {
    stampaMsg(`Valutazione della factory: ${nome}`); // Dall'alto verso il basso
    return function (costruttore) {
        stampaMsg(`Esecuzione del decoratore: ${nome}`); // Dal basso verso l'alto
    };
}
let OrdineDecoratori = class OrdineDecoratori {
};
OrdineDecoratori = __decorate([
    CreaDecoratoreClasse("A primo"),
    CreaDecoratoreClasse("B secondo"),
    CreaDecoratoreClasse("C terzo")
], OrdineDecoratori);
export {};
//# sourceMappingURL=main.js.map
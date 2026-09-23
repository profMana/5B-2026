const results = document.getElementById("results");
results!.innerHTML = "";

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

function stampaTitolo(titolo: string) {
    results!.innerHTML += `<h3>${titolo}</h3>`;
}
function stampaMsg(messaggio: string) {
    console.log(messaggio);
    results!.innerHTML += `${messaggio}<br>`;
}

/* ====== DECORATORE DI CLASSE SEMPLICE ===== */

stampaTitolo("DECORATORE DI CLASSE SEMPLICE");

function Logger(costruttore: Function) {
    stampaMsg("Sono nel decoratore Logger (eseguito alla DEFINIZIONE della classe)");
}

@Logger
class Persona1 {
    constructor() {
        stampaMsg("Sono nel costruttore della classe Persona1");
    }
}
stampaMsg("Sto per creare un'istanza di Persona1...");
const persona1 = new Persona1();

/* ====== DECORATORE FACTORY ===== */
stampaTitolo("DECORATORE FACTORY PARAMETRIZZATO");

function LoggerConMessaggio(messaggio: string){
    return function (costruttore: Function){
        stampaMsg(messaggio);
        stampaMsg("Costruttore ricevuto: " + costruttore);
    }
}

@LoggerConMessaggio("Messaggio personalizzato passato alla factory")
class Persona2 {
    constructor() {
        stampaMsg("Sono nel costruttore della classe Persona2");
    }
}
const persona2 = new Persona2();

/* ====== DECORATORE DI METODO ===== */
stampaTitolo("DECORATORE DI METODO");

function Log(target: any, 
                nomeMetodo: string, descriptor: PropertyDescriptor){
    const metodoOriginale = descriptor.value;
    descriptor.value = function(...argomenti: any[]){
        stampaMsg(`Chiamato il metodo "${nomeMetodo}" con argomenti: [${argomenti.join(", ")}]`);
        const risultato = metodoOriginale.apply(this, argomenti);
        stampaMsg(`Il metodo "${nomeMetodo}" ha restituito: ${risultato}`);
        return risultato;
    }
}

class Calcolatrice{
    @Log
    somma(a: number, b: number){
        return a + b;
    }
}

const calcolatrice = new Calcolatrice();
calcolatrice.somma(4, 7);

/* ====== DECORATORE DI PROPRIETA' ===== */
stampaTitolo("DECORATORE DI PROPRIETA'");

function Richiesto(target: any, nomeProprieta: string){
    // salvo l'elenco delle proprietà direttamente nel costruttore
    if(!target.constructor.proprietaRichieste)
        target.constructor.proprietaRichieste = [];
    
    target.constructor.proprietaRichieste.push(nomeProprieta);
}
function valida(oggetto: any): boolean{
    const richieste: string[] = oggetto.constructor.proprietaRichieste || [];

    for(const proprieta of richieste)
    {
        if(!oggetto[proprieta])
        {
            stampaMsg(`Validazione FALLITA: la proprietà "${proprieta}" è obbligatoria`);
            return false;
        }
    }
    return true;
}
class Utente{
    @Richiesto
    nome: string = "";
    @Richiesto
    email: string = "";
}

const utenteValido = new Utente();
utenteValido.nome = "Anna";
utenteValido.email = "anna@email.com";
valida(utenteValido);
const utenteNonValido = new Utente();
utenteNonValido.nome = "Luca";
valida(utenteNonValido);


/* ====== ORDINE DI ESECUZIONE ===== */
stampaTitolo("ORDINE DI ESECUZIONE'");

function CreaDecoratoreClasse(nome: string)
{
    stampaMsg(`Valutazione della factory: ${nome}`); // Dall'alto verso il basso
    return function (costruttore: Function){
        stampaMsg(`Esecuzione del decoratore: ${nome}`); // Dal basso verso l'alto
    }    
}

@CreaDecoratoreClasse("A primo")
@CreaDecoratoreClasse("B secondo")
@CreaDecoratoreClasse("C terzo")
class OrdineDecoratori{}
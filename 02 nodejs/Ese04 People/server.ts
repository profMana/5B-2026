import http from "http";
import fs from "fs";
import express, {Request, Response, NextFunction} from "express";
// anche se dispatcher è un file ts,
// occorre importare il file js compilato
import dispatcher from "./dispatcher.js"

/* ====================== 1 CONFIGURAZIONE ================== */
const port = 3000
let paginaErrore = ""
const app = express()

/* =================== 2 MIDDLEWARE ========= */
// A - Request Log
app.use("/", function (req, res, next){
    console.log(`----> ${req.method} : ${req.url}`)
    next()
})

// B - Gestione delle risorse statiche
app.use("/", express.static("./static"))

// C - Lettura e Parsing dei parametri POST
// Restituiscono i parametri POST (parsificati) all'interno di request.body
app.use("/", express.json({ "limit": "50mb"}))
app.use("/", express.urlencoded({ "limit": "50mb", "extended": true }))

// D - Lettura e Parsing dei parametri GET
// I parametri GET sono disponibili come stringa dentro a request.query
app.use("/", function(req, res, next){
    if(req.query)
    {
        let parsedQuery: any = {}
        for(const key in req.query)
        {
            let value: any = req["query"][key]
            try{
                parsedQuery[key] = JSON.parse(value)
            }
            catch(err){
                // Le stringhe semplici rimangono come sono (non vengono parsificate)
                parsedQuery[key] = value
            }
        }
        // NON FUNZIONA perché non è possibile sovrascrivere req.query
        // req.query = parsedQuery 
        Object.defineProperty(req, 'query', {
            value: parsedQuery,
            writable: true,     // Permette modifiche future se necessario
            enumerable: true,   // Lo rende visibile nei cicli e nei log
            configurable: true  // Permette di sovrascriverlo di nuovo
        })
    }
    next()
})

// E - Log dei parametri
app.use("/", function(req, res, next){
    if(req.query && Object.keys(req.query).length > 0)
        console.log(`       ParamQuery: ${JSON.stringify(req.query)}`)

    if(req.body && Object.keys(req.body).length > 0)
        console.log(`       ParamBody: ${JSON.stringify(req.body)}`)
    next()
})

/* ========= 3 DISPATCHING (SMISTAMENTO DELLE RICHIESTE) ========= */
// quando richiamo un dispatcher di secondo livello,
// a questo dispatcher viene passata come risorsa req.url
// che è la differenza tra originalUrl impostata dal client
// e la baseUrl di ascolto.
// In pratica nella url passata a dispatcher viene eliminato /api
app.use("/api", dispatcher)

/* =========== 4 DEFAULT ROUTE E GESTIONE DEGLI ERRORI ========= */
// default route
app.use("/", function(req, res){
    res.status(404)
    // se è una risorsa dinamica
    if(req.url.startsWith("/api/"))
        res.send("Risorsa Dinamica non trovata: " + req.originalUrl)
    // se invece è una richiesta per una pagina html
    else if(req.accepts("html"))
        res.send(paginaErrore)
    // risolve un problema con le immagini
    else        
        res.send()
})

// gestione degli errori
app.use("/", function(err:any, req:Request, res:Response, next:NextFunction) {
    let status = err.status || 500
    if(status >= 500)
        console.log("********* CRITICAL SERVER ERROR ************\n", err.stack)
    else
        console.log("********* WARNING ************\n", err.message)

    res.status(status).send(err.message)
});


/* =============== 5 CREAZIONE ED AVVIO DEL SERVER ========= */
const server = http.createServer(app)
function startServer(){
    fs.readFile("./static/error.html", function(err, data){
        if(err)
            paginaErrore="<h2>Risorsa Statica non trovata</h2>"
        else
            paginaErrore = data.toString()
    })

    server.listen(port, function(){
        console.log("server in ascolto sulla porta " + port)
    })
}

startServer()

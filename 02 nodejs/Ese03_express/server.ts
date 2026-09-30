import http from "http";
import fs from "fs";
import express from "express";

/* ========= CONFIGURAZIONE ========= */
const port = 3000
let paginaErrore = ""
const app = express()

/* ========= MIDDLEWARE ========= */
// A - Request Log
app.use("/", function (req, res, next){
    console.log(`----> ${req.method} : ${req.originalUrl}`)
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

/* ========= DISPATCHING (SMISTAMENTO DELLE RICHIESTE) ========= */
// Route per servire /richiesta1
app.get("/api/richiesta1", function(req, res, next){
    const params = req.query
    console.log("OK")
    if (params)
        res.send(params) // Se params è un JSON viene automaticamente SERIALIZZATO, altrimenti no
    else
        res.status(400).send("Parametri mancanti")
})

/* ========= DEFAULT ROUTE E GESTIONE DEGLI ERRORI ========= */

/* ========= CREAZIONE ED AVVIO DEL SERVER ========= */
const server = http.createServer(app)
function startServer(){
    fs.readFile("./static/error.html", function(err, data){
        if(err)
            paginaErrore="<h2>Risorsa non trovata</h2>"
        else
            paginaErrore = data.toString()
    })

    server.listen(port, function(){
        console.log("server in ascolto sulla porta " + port)
    })
}

startServer()

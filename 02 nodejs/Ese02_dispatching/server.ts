import http from "http"
import url from "url"
import fs from "fs"
import mime from 'mime'
import HEADERS from "./headers.json" with {type: "json"}
import strict from "assert/strict"

// CONFIGURAZIONI
const port = 3000
let paginaErrore = ""

// la funzione di callback di createServer viene richiamata
// ogni volta che arriva una richiesta dal client
const server = http.createServer(function(req, res){
        let method = req.method
        let fullPath = url.parse(req.url!, true) // @ts-ignore
        let resource = fullPath.pathname
        let getParams = fullPath.query
        console.log(`Richiesta ricevuta : ${method}:${resource}, getParams:${JSON.stringify(getParams)}`)
 
        if(resource=="/")
            resource = "/index.html"

        if(! resource?.startsWith("/api/")){
            // risorsa statica
            const filename = "./static" + resource
            fs.readFile(filename, function(err, data){
                if(err){
                    res.writeHead(404, HEADERS.html)
                    res.write(paginaErrore)
                }
                else{
                    let header = { "Content-Type": mime.getType(resource!) as string}
                    res.writeHead(200, header)
                    res.write(data.toString("utf-8"));
                }
                res.end()
            })


        }
        else{
            // risorsa dinamica cioè richiesta dati 
            if(resource === "/api/servizio1"){
                res.writeHead(200, HEADERS.json);
                res.write(JSON.stringify(getParams));
                res.end();
            }
            else if(resource === "/api/servizio2"){
                res.writeHead(200, HEADERS.json);
                res.write(JSON.stringify(getParams));
                res.end();
            }
            else{
                // se non trova nessun listener disponibile
                // risponde con una stringa di errore
                // RISORSA NON STATICA --> RICHIESTA NON HTML
                res.writeHead(404, HEADERS.text);
                res.write(`Risorsa dinamica ${resource} non disponibile`);
                res.end(); 
            }
        }
        

})

// Avvio il server

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




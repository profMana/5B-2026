// in questo esercizio importiamo i moduli usando lo standard CommonJS
// basato sulla funzione require()

const http = require("http")
const url = require('url')
const port = 1337

// la function passata come parametro a createServer 
// verrà eseguita ogni volta che arriva una richiesta dal client
// e quindi dovrà rispondere al client
const server=http.createServer(function (req, res) {

    console.log("Richiesta Ricevuta : " + req.url);
    // fullPath sarà un json contentente tutte le informazioni della url
    let fullPath = url.parse(req.url, true);

    let risorsa = fullPath.pathname;
    let param = fullPath.query;
    let metodo = req.method;
    let dominio = req.headers.host

    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8" });
    res.write("<h1> Informazioni relative alla Richiesta ricevuta</h1>");
    res.write("<br>");
    res.write(`<p> Metodo : ${metodo}</p>`);
    res.write(`<p> Dominio richiesto : ${dominio}</p>`);
    res.write(`<p> Risorsa richiesta : ${risorsa} </p>`); // alt 96
    res.write(`<p> Parametri : ${JSON.stringify(param)}</p>`);
    //res.end(`<p> Fine Richiesta </p>`);
    res.write(`<p> Fine Richiesta </p>`);
    res.end()
})

server.listen(port, function(){
    console.log("Server avviato correttamente sulla porta " + port)
});


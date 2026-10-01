import { Router } from "express"

// questa variabile si può chiamare router o dispatcher o smistatore
// rappresenta un router di secondo livello rispetto al router di 1° livello
// che nel file .ts che si chiama app

// Rouer è un metodo ei express che restituisce un router di livello 
// più basso rispetto al router principale
const app = Router()

// Route per servire /richiesta2
app.get("/richiesta1", function(req, res, next){
    const get_params = req.query
     
    if (get_params)
        res.send(get_params)
    else
        res.status(400).send("Parametro get mancante")
})

// Route per servire /richiesta2
app.post("/richiesta2", function(req, res, next){
    const get_params = req.query
    const post_params = req.body
     
    if (get_params)
        res.send({...get_params, ...post_params})
    else
        res.status(400).send("Parametro get mancante")
})

// se nessuna route viene eseguita automaticamente il controllo
// ritorna al file principale

export default app
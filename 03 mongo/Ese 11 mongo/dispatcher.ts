import { Router } from "express"
import { models } from "./models.js"

// config
const app = Router()

// routes
/* app.get("/getCountries", function(req, res){
    const countries = people.map(function(person){
        return person.location.country
    })
    // trasformo il vettore in un Set eliminando tutti i duplicati
    const results = new Set (countries)
    const resultsArray = Array.from (results)
    resultsArray.sort()
    res.send(resultsArray)
}) */



// se nessuna route viene eseguita,
// automaticamente il controllo ritorna al file principale

export default app
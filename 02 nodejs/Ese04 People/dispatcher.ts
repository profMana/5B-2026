import { Router } from "express"
import peopleObject from "./people.json" with {type:"json"}

// config
const app = Router()
let people = peopleObject.results

// routes
app.get("/getCountries", function(req, res){
    const countries = people.map(function(person){
        return person.location.country
    })
    // trasformo il vettore in un Set eliminando tutti i duplicati
    const results = new Set (countries)
    const resultsArray = Array.from (results)
    resultsArray.sort()
    res.send(resultsArray)
})

app.get("/getPeople", function (req, res){
    const country = req.query.country
    const filteredPeople = people.filter(function(person){
        return person.location.country == country
    })
    const results = filteredPeople.map(function(person){
        return {
           "name": person.name,
           "city": person.location.city,
           "state": person.location.state,
           "cell" : person.cell
        }
    })
    res.send(results)
})




// se nessuna route viene eseguita,
// automaticamente il controllo ritorna al file principale

export default app
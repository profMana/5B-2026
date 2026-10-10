import { Router } from "express"
import peopleObject from "./people.json" with {type:"json"}
import fs from "fs/promises"
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

app.get("/getDetails", function (req, res){
    const name = req.query.nome
    const person = people.find(function(item){
        return JSON.stringify(item.name) == JSON.stringify(name)
    })
    res.send(person)
    // se una nazione non ha persone non è comunque un errore !
})

app.delete("/delete", async function (req, res){
    const name = req.body
    people = people.filter(function(item){ 
        return JSON.stringify(item.name) != JSON.stringify(name)
    })

    try{
        await savePeople()
        res.send({"ris": "ok"})
    }
    catch(err: any){
        const status = err.status || 500
        res.status(status).send("Errore nella cancellazione del record " + err.message)
    }
})

async function savePeople(){
    peopleObject.results = people
    await fs.writeFile("./people.json", JSON.stringify(peopleObject, null, 3))
}


app.post("/addPerson", async (req, res) => {
	let person = req.body
	console.log(person)
	if(Object.keys(person).length>0){
		people.push(person)
        try{
            await savePeople()
            res.send({"ris": "ok"})
        }
        catch(err: any){
            const status = err.status || 500
            res.status(status).send("Errore inserimento record " + err.message)
        }
	}
	else
        res.status(400).send(`Parametri mancanti`)
})



// se nessuna route viene eseguita,
// automaticamente il controllo ritorna al file principale

export default app
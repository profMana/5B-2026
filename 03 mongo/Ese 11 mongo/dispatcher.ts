import { Router } from "express"
import { models } from "./models.js"

// config
const app = Router()

// routes
app.get("/getUnicorns/:gender", async function(req, res, next){
    const gender = req.params.gender
    try{
        let data = await models.getData(gender)
        res.send(data)
    }
    catch(err)
    {
        next(err) // err contiene l'errore impostato dal models
    }
})

app.get("/getUnicorn/:id", async function(req, res, next){
    const id = req.params.id
    try{
        let data = await models.getDataById(id)
        res.send(data)
    }
    catch(err)
    {
        next(err) // err contiene l'errore impostato dal models
    }
})

app.post("/addUnicorn", async function(req, res, next){
    const unicorn = req.body
    try{
        const result = await models.addDocument(unicorn)
        res.send(result)
    }
    catch(err){
        next(err)
    }
})

app.patch("/updateUnicorn/:name", async function(req, res, next){
    const name = req.params.name
    const action = req.body
    try{
        const result = await models.updateDocumentByName(name, action)
        res.send(result)
    }
    catch(err){
        next(err)
    }
})
app.delete("/deleteUnicorn/:name", async function(req, res, next){
    const name = req.params.name
    try{
        const result = await models.deleteDocumentByName(name)
        res.send(result)
    }
    catch(err){
        next(err)
    }
})
// se nessuna route viene eseguita,
// automaticamente il controllo ritorna al file principale

export default app
import { Router } from "express"
import { models } from "./models.js"

// config
const app = Router()

// routes
app.get("/getCollections", async function(req, res, next){
    try{
        const data = await models.getCollections()
        res.send(data)
    }
    catch(err)
    {
        next(err) // err contiene l'errore impostato dal models
    }
})

app.get("/:collection", async function(req, res, next){
    const collectionName = req.params.collection;
    try{
        let data = await models.getData(collectionName)
        res.send(data)
    }
    catch(err)
    {
        next(err) // err contiene l'errore impostato dal models
    }
})

export default app
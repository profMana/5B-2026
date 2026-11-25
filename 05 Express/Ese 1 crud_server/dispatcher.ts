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

//servizio 1: inviaRichiesta("GET", "/unicorns", {filters})
app.get("/:collection", async function(req, res, next){
    const collectionName = req.params.collection;
    const filters = req.query;

    try{
        const data = await models.getData(collectionName,filters)
        res.send(data)
    }
    catch(err)
    {
        next(err) // err contiene l'errore impostato dal models
    }
})

//servizio 2: inviaRichiesta("GET", "/unicorns/id"})
app.get("/:collection/:id", async function(req,res,next) {
    const collectionName = req.params.collection;
    const id = req.params.id;

    try
    {
        const data = await models.getDataById(collectionName,id);
        res.send(data);
    }
    catch(err)
    {
        next(err);
    }
})

export default app
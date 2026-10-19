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



// se nessuna route viene eseguita,
// automaticamente il controllo ritorna al file principale

export default app
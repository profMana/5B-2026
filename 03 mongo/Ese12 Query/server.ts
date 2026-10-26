import { MongoClient, Db, ObjectId, MongoError } from "mongodb";
import dotenv from "dotenv"

dotenv.config({path:".env"})

const DBNAME = process.env.DBNAME
const CONNECTION_STRING = process.env.CONNECTION_STRING_LOCAL!

export interface CustomError extends Error{
        status: number
}

class Models{
    private client: MongoClient | undefined // oggetto che gestisce la comunicazione con il db

    private async openConnection(){
        if(! this.client)
        {
            console.log("Connecting to " + CONNECTION_STRING + "...")
            this.client = new MongoClient(CONNECTION_STRING)
            try{
                await this.client.connect()
                console.log("Connection to mongodb established")
            }
            catch(err){
                this.client = undefined
                this.emitError(503, "MongoDB connection failed: " + err)
            }
        }
    }
    
    public async getDB(): Promise<Db>{
        /*Se openCollection fallisce, essendoci l'await, 
          la procedura si interrompe immediatamente 
          rimandando l'errore al chiamante.
          Se il chiamante riceve una promise 'fallita',
          anche lui termina immediatamente rimandando l'errore al chiamante 
          (a meno che non ci sia un try and catch ) */  
        await this.openConnection()
        // .db accede ai database memorizzati sul DBMS
        // mongodb si salva un riferiemnto al database 
        // e non effettua nessuna operazione di rete
        // per cui anche se il db non esiste NON VA in errore
        return this.client!.db(DBNAME)
    }

    public async closeConnection(){
        if(this.client){
            await this.client.close()
            this.client = undefined
        }
    }
    
    private emitError(status: number, msg: string){
        const err = new Error(msg) as CustomError
        err.status = status
        throw err
    }

    private getObjectId(id:string) : ObjectId | string{
        return ObjectId.isValid(id) ? new ObjectId(id) : id
    }
}

const models = new Models()

const collectionName = "unicorns"
executeQuery(3)

async function executeQuery(queryNumber: number)
{
    try{
        const db = await models.getDB()
        const collection = db.collection(collectionName)
        let result: any

        switch(queryNumber)
        {
            case 1:
                result = await collection.find({"weight": {"$gt": 700, "$lt": 800 }}).toArray()
                break;
            case 2: 
                result = await collection.find({"gender": "m", "loves": "grape", "vampires": {"$gt": 60}}).toArray()
                break;
            case 3:
                result = await collection.find({"$or": [{"gender": "f"}, {"weight": {"$lt": 700}}]}).toArray()
                break;
        }
        console.log(result)
        // instanceof verifica il tipo di un object
        if(result instanceof Array) 
            console.log("Numero di record trovati: " + result.length)
    }
    catch(err: any){
        console.log("Errore esecuzione query: " + err.stack)
    }
    finally{
        await models.closeConnection()
    }
}
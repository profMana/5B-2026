import { MongoClient, Db, ObjectId } from "mongodb";
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
    
    private async getDB(): Promise<Db>{
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

    private getObjectId(id:string) : any{
        return ObjectId.isValid(id) ? new ObjectId(id) : id
    }

    /* ********** USER METHODS ******** */

    async getCollections(){
        const db = await this.getDB()
        const collections = await db.listCollections().toArray()
        return collections
    }
   
    async getData(collectionName: string, filters: any)
    {
        const db = await this.getDB();
        const collection = db.collection(collectionName);
        const data = await collection.find(filters).toArray();
        return data; 
    }

    async getDataById(collectionName:string, idValue:string)
    {
        const db = await this.getDB();
        const collection = db.collection(collectionName);
        const data = await collection.findOne({"_id": this.getObjectId(idValue)});

        if(data)
        {
            return data;
        }
        else
        {
            this.emitError(404,"Documento non trovato!");
        }
    }
}



const models = new Models()

process.on("SIGINT", async() => {
    await models.closeConnection();
    console.log("Connessione al database terminata correttamente");
    process.exit(0)
})

export { models }
//export default models

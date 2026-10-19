import { MongoClient, Db, ObjectId } from "mongodb";

const DBNAME = "dbUnicorns"
const CONNECTION_STRING = "mongodb://127.0.0.1:27017"
export interface CustomError extends Error{
        status: number
}
class Models{
    private client: MongoClient | undefined // oggetto che gestisce la comunicazione con il db

    async connectDB(){
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
    
    async getDB(): Promise<Db>{
        await this.connectDB()
        return this.client!.db(DBNAME)
    }
    
    emitError(status: number, msg: string){
        const err = new Error(msg) as CustomError
        err.status = status
        throw err
    }
}

const models = new Models()

export { models }
//export default models

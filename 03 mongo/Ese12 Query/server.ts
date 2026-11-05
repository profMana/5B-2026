import { MongoClient, Db, ObjectId, MongoError } from "mongodb";
import dotenv from "dotenv"

dotenv.config({ path: ".env" })
const DBNAME = process.env.DBNAME
const CONNECTION_STRING = process.env.CONNECTION_STRING_LOCAL!


const queryIndex = 39
let collectionName = ""
if (queryIndex <= 23)
    collectionName = "unicorns"
else if (queryIndex <= 30)
    collectionName = "biblioteca"
else if (queryIndex <= 32)
    collectionName = "orders"
else if (queryIndex <= 36)
    collectionName = "unicorns"
else if (queryIndex <= 37)
    collectionName = "quizzes"
else if (queryIndex <= 38)
    collectionName = "students"
else 
    collectionName = "orders"

export interface CustomError extends Error {
    status: number
}

class Models {
    private client: MongoClient | undefined // oggetto che gestisce la comunicazione con il db

    private async openConnection() {
        if (!this.client) {
            console.log("Connecting to " + CONNECTION_STRING + "...")
            this.client = new MongoClient(CONNECTION_STRING)
            try {
                await this.client.connect()
                console.log("Connection to mongodb established")
            }
            catch (err) {
                this.client = undefined
                this.emitError(503, "MongoDB connection failed: " + err)
            }
        }
    }

    public async getDB(): Promise<Db> {
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

    public async closeConnection() {
        if (this.client) {
            await this.client.close()
            this.client = undefined
        }
    }

    private emitError(status: number, msg: string) {
        const err = new Error(msg) as CustomError
        err.status = status
        throw err
    }

    private getObjectId(id: string): ObjectId | string {
        return ObjectId.isValid(id) ? new ObjectId(id) : id
    }
}

const models = new Models()

executeQuery(queryIndex)

async function executeQuery(queryNumber: number) {
    try {
        const db = await models.getDB()
        const collection = db.collection(collectionName)
        let result: any
        let regex: any
        switch (queryNumber) {
            case 1:
                result = await collection.find({ "weight": { "$gt": 700, "$lt": 800 } }).toArray()
                break;
            case 2:
                result = await collection.find({ "gender": "m", "loves": "grape", "vampires": { "$gt": 60 } }).toArray()
                break;
            case 3:
                result = await collection.find({
                    "$or": [{ "gender": "f" },
                    { "weight": { "$lt": 700 } }]
                }).toArray()
                break;
            case 4:
                result = await collection.find({
                    "vampires": { "$gt": 60 },
                    "$or": [{ "loves": "grape" }, { "loves": "apple" }]
                }).toArray();
                break;
            case 5:
                result = await collection.find({
                    "vampires": { "$gt": 60 },
                    "loves": { "$all": ["grape", "watermelon"] }
                }).toArray();
                break;
            case 6:
                result = await collection.find({ "hair": { "$in": ["brown", "grey"] } }).toArray();
                break;
            case 7:
                // result = await collection.find({"vaccinated": {"$ne": true}}).toArray(); 
                result = await collection.find({
                    "$or": [{ "vaccinated": false },
                    { "vaccinated": { "$exists": false } }]
                }).toArray();
                break;

            case 8:
                // result = await collection.find({"gender": "m", "loves": {"$nin": ["apple"]}}).toArray();
                result = await collection.find({ "gender": "m", "loves": { "$ne": "apple" } }).toArray();
                break;

            case 9:
                regex = new RegExp("^a", "i")
                result = await collection.find({ "name": regex, "gender": "f" }).toArray();
                break;

            case 10:
                const id = new ObjectId("6adf18ac58df71e84d523d87")
                result = await collection.find({ "_id": id }).toArray();
                break;

            case 11:
                // result = await collection.find({"gender": "m"},
                //     {"projection":{"name": 1, "vampires": 1}}).toArray();

                result = await collection.find({ "gender": "m" })
                    .project({ "name": 1, "vampires": 1 })
                    .sort({ "vampires": "desc", "weight": "asc" })
                    .skip(1).limit(3).toArray();
                break;

            case 12:
                result = await collection.countDocuments({ "weight": { "$gt": 500 } })
                break;

            case 13:
                result = await collection.findOne({ "name": "Aurora" },
                    { "projection": { "name": 1, "vampires": 1, "weight": 1, "_id": 0 } });
                break;

            case 14:
                result = await collection.distinct("loves", { "gender": "f" });
                break;

            case 15:
                const unicorn = {
                    "name": "Minnie",
                    "dob": "1999-11-20",
                    "loves": [
                        "grape",
                        "energon"
                    ],
                    "weight": 540,
                    "gender": "f",
                    "hair": "blonde",
                    "vaccinated": true
                }
                result = await collection.insertOne(unicorn)
                break;

            case 16:
                regex = new RegExp("^minnie$", "i")
                result = await collection.deleteOne({ "name": regex })
                break;

            case 17: // Incrementare di 1 il numero dei vampiri uccisi da Pilot
                result = await collection.updateOne({ "name": "Pilot" }, { "$inc": { "vampires": 1 } })
                break;

            case 18:
                //Aggiungere che l’unicorno Aurora ama anche carrot 
                //and sugar e che il suo peso è aumentato di 10kg
                //Impostare vaccinated a true 
                result = await collection.updateOne(
                    { "name": "Aurora" },
                    {
                        "$addToSet": { "loves": { "$each": ["carrot", "sugar"] } },
                        "$inc": { "weight": 10 },
                        "$set": { "vaccinated": true }
                    }
                )
                break;
            case 19:
                //Incrementare di 1 il numero di vampiri uccisi 
                // dall’unicorno Pluto. Se il record non esiste crearlo
                result = await collection.updateOne(
                    { "name": "Pluto" },
                    {
                        "$inc": { "vampires": 1 }
                    },
                    { "upsert": true }
                )
                break;
            case 20:
                //Aggiungere il campo vaccinated=false a tutti gli unicorni 
                // che non dispongono del campo vaccinated
                result = await collection.updateMany(
                    { "vaccinated": { "$exists": false } },
                    { "$set": { "vaccinated": false } }
                )
                break;
            case 21:
                // Rimuovere gli unicorni che amano carrot and grape 
                result = await collection.deleteMany(
                    { "loves": { "$all": ["carrot", "grape"] } }
                )
                break;
            case 22:
                // Trovare l’unicorno femmina che ha ucciso il maggior 
                // numero di vampiri. Restituire nome e numero di vampiri uccisi
                result = await collection.find(
                    { "gender": "f" },
                    { "projection": { "name": 1, "vampires": 1 } }
                ).sort(
                    { "vampires": -1 } // -1: desc
                ).limit(1).toArray()
                break;
            case 23:
                //Sostituire l'unicorno Pluto con un nuovo record (replaceOne)
                result = await collection.replaceOne(
                    { "name": "Pluto" },
                    {
                        "name": "Pluto",
                        "gender": "m",
                        "weight": 250,
                        "hair": "blonde"
                    }
                )
                break;
            case 24:
                //Trovare tutti i libri posizionati nella stanza 2, scaffale 3.
                //Visualizzare titolo, autore, posizione ed elenco di TUTTE le pubblicazioni
                result = await collection.find(
                    {
                        "posizione.stanza": 2,
                        "posizione.scaffale": 3
                    },
                    {
                        "projection": { "_id": 0, "titolo": 1, "autore": 1, "posizione": 1, "pubblicazioni": 1 }
                    }
                ).toArray()
                break;
            case 25:
                //Elenco della case editrici presenti nella biblioteca, ognuna ripetuta una sola volta
                result = await collection.distinct("pubblicazioni.editore")
                break;
            case 26:
                /*
                Elenco di tutti i libri pubblicati dalla einaudi 
                (scritto in formato case insensitive).
                Visualizzare titolo, autore ed elenco di TUTTE le pubblicazioni 
                ognuna con il solo campo editore
                */
                regex = new RegExp("^einaudi$", "i")
                result = await collection.find(
                    {
                        "pubblicazioni.editore": regex
                    },
                    {
                        "projection": { "_id": 0, "titolo": 1, "autore": 1, "pubblicazioni.editore": 1 }
                    }
                ).toArray()
                break;
            case 27:
                /*Elenco di tutti i libri pubblicati dalla einaudi 
                (scritto in formato case insensitive) nel 2010
                Visualizzare titolo, autore e la sola pubblicazione
                 che ha dato match con tutti i campi */
                regex = new RegExp("^einaudi$", "i")
                result = await collection.find(
                    {
                        "pubblicazioni": {
                            "$elemMatch": { "editore": regex, "anno": 2010 }
                        }
                    },
                    {
                        "projection": {
                            "_id": 0, "titolo": 1, "autore": 1,
                            "pubblicazioni.$": 1
                        }
                    }
                ).toArray()
                break;
            case 28:
                /*Elenco di tutti i libri pubblicati dalla einaudi 
                (scritto in formato case insensitive) nel 2010
                Visualizzare titolo, autore e la sola pubblicazione
                 che ha dato match con i soli campi editore e anno */
                regex = new RegExp("^einaudi$", "i")
                result = await collection.find(
                    {
                        "pubblicazioni": {
                            "$elemMatch": { "editore": regex, "anno": 2010 }
                        }
                    },
                    {
                        "projection": {
                            "_id": 0, "titolo": 1, "autore": 1,
                            "pubblicazioni.editore.$": 1,
                            "pubblicazioni.anno": 1
                        }
                    }
                ).toArray()
                break;
            case 29:
                regex = new RegExp("^mondadori$", "i")
                result = await collection.updateOne({
                    "titolo": "Promessi Sposi",
                    "pubblicazioni.editore": regex
                },
                    { "$inc": { "pubblicazioni.$.nPagine": 1 } })
                break;
            case 30:
                result = await collection.updateOne(
                    { "titolo": "Promessi Sposi" },
                    { "$inc": { "pubblicazioni.$[].nPagine": 1 } })
                break;
            case 31:
                //NOTA: Desc non è riconosciuto nell'aggregate, ma solo nel file. Usare -1 per ordine decrescente e 1 per crescente.
                result = await collection.aggregate([
                    { "$match": { "status": "A" } },
                    { "$group": { "_id": "$cust_id", "totale": { "$sum": "$amount" } } },
                    { "$sort": { "totale": -1 } }
                ]).toArray();
                break;
            case 32:
                result = await collection.aggregate([
                    { "$match": { "status": "A" } },
                    {
                        "$group":
                        {
                            "_id": "$cust_id",
                            "media": { "$avg": "$amount" },
                            "mediaTotali": { "$avg": { "$multiply": ["$amount", "$qta"] } }
                        }
                    },
                    { "$sort": { "media": -1 } }
                ]).toArray();
                break;
            case 33:
                result = await collection.aggregate([
                    {
                        "$group": {
                            "_id": "$gender",
                            "nEsemplari": { "$sum": 1 }
                        }
                    },
                    { "$sort": { "nEsemplari": -1 } }
                ]).toArray();

                break;
            case 34:
                result = await collection.aggregate([
                    {
                        "$group":
                        {
                            "_id": "$gender",
                            "vampiriUccisi": { "$avg": "$vampires" }
                        }
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "gender": "$_id",
                            "vampiriUccisi": { "$round": ["$vampiriUccisi", 1] }
                        }
                    }
                ]).toArray();
                break;
            case 35:
                result = await collection.aggregate([
                    {
                        "$group":
                        {
                            "_id": { "gender": "$gender", "hair": "$hair" },
                            "nEsemplari": { "$sum": 1 }
                        }
                    },
                    {
                        "$project":
                        {
                            "genere": "$_id.gender",
                            "pelo": "$_id.hair",
                            "nEsemplari": 1,
                            "_id": 0
                        }
                    }]).toArray();
                break;

            case 36:
                result = await collection.aggregate(
                    [
                        { "$group": { "_id": {}, "vampiriUccisi": { "$avg": "$vampires" } } },
                        { "$project": { "_id": 0, "mediaVampiriUccisi": { "$round": ["$vampiriUccisi", 0] } } }
                    ]
                ).toArray()
                break;
            case 37:
                result = await collection.aggregate(
                    [
                        {
                            "$project": {
                                "avgQuiz": { "$round": [{ "$avg": "$quizzes" }, 1] },
                                "avgLab": { "$avg": "$labs" },
                                "avgExam": {
                                    "$avg": ["$midterm", "$final"]
                                }
                            }
                        },
                        {
                            "$group":{
                                "_id": {},
                                "mediaQuiz":  {"$avg": "$avgQuiz"},
                                "mediaLabs": {"$avg": "$avgLab"},
                                "mediaExams": {"$avg": "$avgExam"}
                            }
                        },
                        {
                            "$project": {
                                "_id": 0, 
                                "mediaQuiz": {"$round": ["$mediaQuiz", 1] },
                                "mediaLabs": {"$round": ["$mediaLabs", 1] },
                                "mediaExams": {"$round": ["$mediaExams", 1] }
                            }
                        }
                    ]
                ).toArray()
                break;
            case 38:
                result = await collection.aggregate(
                    [
                        { "$match": { "genere": "f"}},
                        {
                            "$project":{
                                "MediaVoti": {"$round": [{"$avg": "$voti"}, 1]},
                                "nome": 1,
                                "_id": 0
                            }
                        },
                        { "$sort": {"MediaVoti": -1}},
                        { "$limit": 2},
                        { "$skip": 1}
                    ]
                ).toArray()
                break;
            case 39:
                result = await collection.aggregate(
                    [
                        {
                            "$project": { "status": 1, "nDettagli": 1 }
                        },
                        {
                            "$unwind": "$nDettagli"
                        },
                        {
                            "$group":{
                                "_id": "$status",
                                "sommaDettagli": { "$sum": "$nDettagli"}
                            }
                        }
                    ]
                ).toArray()
                break;
        }
        console.table(JSON.stringify(result, null, 3))
        // instanceof verifica il tipo di un object
        if (result instanceof Array)
            console.log("Numero di record trovati: " + result.length)
    }

    catch (err: any) {
        console.log("Errore esecuzione query: " + err.stack)
    }
    finally {
        await models.closeConnection()
    }
}
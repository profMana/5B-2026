import fs from "fs"

import states from "./states.json" with {type:"json"}
import radios from "./radios.json" with {type:"json"}

states.forEach(function(state){
    let stateRadios = radios.filter(function(radio){
        return radio.state == state.name
    })
    state.stationcount = stateRadios.length.toString()
})

/* versione promises
try{
    fs.writeFile("./states.json", JSON.stringify(states) )
    console.log("file salvato correttamente")
}
catch(err: any){
    console.log("Errore nel salvataggio del file")
}*/

// versione tradizionale
fs.writeFile("./states.json", JSON.stringify(states, null, 2), function(err) {
   if (err)
      console.log("Errore nel salvataggio del file")
   else
     console.log("file salvato correttamente")
})
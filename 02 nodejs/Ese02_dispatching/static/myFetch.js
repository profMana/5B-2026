"use strict";
const _URL =  "/api/"

class MyFetch {
async sendRequest(method, url="", params={}) {
	if(url.startsWith("/"))  url = url.substring(1);
	method = method.toUpperCase()	
	
	let options = {
		"method": method,
		"headers":{},
		"mode": "cors",                  // default
		"cache": "no-cache",             // default
		"credentials": "same-origin",    // default
		"redirect": "follow",            // default
		"referrerPolicy": "no-referrer", // default no-referrer-when-downgrade
    }
	
	if (method=="GET"){
		// oggetto che serve a creare una url-encoded
		const queryParams = new URLSearchParams()
		for (let key in params){
			let value = params[key]
			if(value!=undefined && value != null){
				if(typeof value === "object")
					// nel casop degli object la serializzazione automatica restituirebbe 'Object object'
					queryParams.append(key, JSON.stringify(value))
				else
					//  value viene comunque serializzato
					queryParams.append(key, value)
			}
		}
		if(url.includes("?"))
			url +="&"
		else
			url+="?"
		url += queryParams.toString()
	}
    else{
		if(params instanceof FormData)
			options["body"]= params
		else{
			// se la chiamata non è get e i parametri non sono formnData
			// cioè passa diq ui per le chiamate POST, PUT,PATCH, DELETE
			options["body"]= JSON.stringify(params)
			options.headers["Content-Type"]="application/json"
		}
	}


	// INVIO DELLA RICHIESTA
	try{
		const response = await fetch(_URL + url, options)
		const text = await response.text()

		// se il server restituisce un codice di errore
		if(!response.ok){
			return{
				"ok":false,
				"status" : response.status,
				"err": text
			}
		}

		// se il server restituisce un body vuoto
		if(!text){
			return{
				"ok":true,
				"status" : response.status,
				"data": {}
			}			
		}

		// in caso di ok controllo se il json ricevuto è valido
		try{
			let data = JSON.parse(text)
				return{
					"ok":true,
					"status" : response.status,
					"data": data
				}	
		}
		catch(err){
			return{
				"ok":false,
				"status" : 502, // JSON non valido
				"err": "Response contains invalid JSON"
			}				
		}

	}
	// Se la chiamata va in errore
	// fetch va in errore SOLO nel caso in cui il server non risponda
	catch(err){
		return{
			"ok":false,
			"status" : 0,
			"err": "Connection refused or server timeout"
		}	
	}

}
}

let myFetch = new MyFetch()
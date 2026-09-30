"use strict"

let params =  {
	"name":"Aurora" , 
	"vet":[1,2,3], 
	"obj":{x:5, y:7},
	"eta": 16, 
	"presente": true
}

let div = document.querySelector("div")

btnGet.addEventListener("click", async function() {
	let response = await myFetch.sendRequest("GET", "/richiesta1?id=3", params)

	if(response.ok) {
	   // Notare che VET e OBJ sono STRINGHE (e anche ID !)
	   div.innerHTML=JSON.stringify(response.data)
	}
	else
		alert(response.status + " : " + response.err)		
});


btnPost.addEventListener("click", async function() {
	let response = await myFetch.sendRequest("POST", "/richiesta2?id=3", params)
	    
	if(response.ok) {
	   // Notare che, a differenza di prima, VET e OBJ sono ora oggetti
	   div.innerHTML=JSON.stringify(response.data)
	}
	else
		alert(response.status + " : " + response.err)		
});


btnParams.addEventListener("click", async function() {
	// passo gender e id come risorsa
	let response = await myFetch.sendRequest("GET", "/richiestaParams/m/72");
	if(response.ok) {
	   div.innerHTML=JSON.stringify(response.data)
	}
	else
		alert(response.status + " : " + response.err)		
});

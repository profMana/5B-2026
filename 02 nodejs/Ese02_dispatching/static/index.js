"use strict"

let params = {
   "name":"pippo",
   "vet":[1,2,3],
   "obj":{"x":true, "y":false},
   "età": 16
}
 // get
btnInvia1.addEventListener("click", async function() {
   let response = await myFetch.sendRequest("gEt", "/servizio1", params)
     console.log(response)
     if(response.ok)
        alert(JSON.stringify(response.data))
      else
         alert(response.status + " : " + response.err)
})

 // post
btnInvia2.addEventListener("click", async function() {
   let response = await myFetch.sendRequest("POST", "/servizio2?nome=pluto&eta=16", params)
     console.log(response)
     if(response.ok)
        alert(JSON.stringify(response.data))
      else
         alert(response.status + " : " + response.err)
})

 // not found
btnInvia3.addEventListener("click", async function() {
   let response = await myFetch.sendRequest("gEt", "/servizio3", params)
     console.log(response)
     if(response.ok)
        alert(JSON.stringify(response.data))
      else
         alert(response.status + " : " + response.err)
})


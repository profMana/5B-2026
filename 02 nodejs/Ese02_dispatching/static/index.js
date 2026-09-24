"use strict"

let params = {
   "name":"pippo",
   "vet":[1,2,3],
   "obj":{"x":true, "y":false}
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
btnInvia1.addEventListener("click", async function() {
   let response = await myFetch.sendRequest("POST", "/servizio2", params)
     console.log(response)
     if(response.ok)
        alert(JSON.stringify(response.data))
      else
         alert(response.status + " : " + response.err)
})

 // not found
btnInvia1.addEventListener("click", async function() {
   let response = await myFetch.sendRequest("gEt", "/servizio3", params)
     console.log(response)
     if(response.ok)
        alert(JSON.stringify(response.data))
      else
         alert(response.status + " : " + response.err)
})


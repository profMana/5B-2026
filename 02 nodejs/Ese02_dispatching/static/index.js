"use strict"

btnInvia1.addEventListener("click", async function() {
   let response = await myFetch.sendRequest("gEt", "/servizio1",
    {element:{"a":1, "b":2}, vet:["a", "b", "c"] }
   )

})


btnInvia2.addEventListener("click", async function() {


})
	

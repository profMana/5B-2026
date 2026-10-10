"use strict";

// i seguenti puntatori sono tutti definiti tramite ID
// let btnSalva  
// let btnAnnulla  
// let lstCountries  


getCountries()

async function getCountries(){
   let response = await myFetch.sendRequest("GET", "/getCountries");
    if(response.ok) {
		let countries = response.data
        for (let country of countries) {
			// console.log(country)
            let option= document.createElement("option")
			lstCountries.append(option)
			option.textContent = country
        }	
        lstCountries.selectedIndex=-1	
    }
	else
		alert(response.status + " : " + response.err)	
}
	
	btnAnnulla.addEventListener("click", function(){
		window.location.href = "index.html"
	})
	
	btnSalva.addEventListener("click", async function(){
		// leggo i valori inseriti
		let title = txtTitle.value
		let first = txtFirst.value
		let last = txtLast.value
		let genderCheck = document.querySelector
		                           ("input[type=radio][name=gender]:checked")
        let gender = ""
        // senza questo test andrebbe in errore se nessun radio è selezionato
        if (genderCheck)
              gender = genderCheck.value

		let country = lstCountries.value
		let city = txtCity.value
		let state = txtState.value

		let cell = txtCell.value
		let email = txtMail.value
 		
		let person= {
			gender, 
			"name":{title, first, last},
			"location":{country, city, state},
			cell, 
			email
		}

		let response = await myFetch.sendRequest("POST", "/addPerson", person)
		if(response.ok) {
			console.log(response.data) // {"ris":"ok"}
			alert("Record aggiunto correttamente ")
			window.location.href = "index.html"
		}
		else
			alert(response.status + " : " + response.err)	
	})

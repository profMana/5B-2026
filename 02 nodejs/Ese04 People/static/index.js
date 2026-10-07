"use strict"

let people;      // vettore enumerativo delle Persone attualmente visualizzate
                 // comodo per gestire i pulsanti di navigazione
let currentPos;   

// i seguenti puntatori sono tutti definiti tramite ID
// let lstCountries 
// let tabStudenti  
// let divDettagli 

// listeners di evento
btnAdd.addEventListener("click", function(){
	window.location.href = "./inserisci.html"
})

// avvio 
divDettagli.style.display="none"
getCountries()


async function getCountries(){
    let response = await myFetch.sendRequest("GET", "/getCountries" )
    if(response.ok){
        // console.log(response.data)
        for (const country of response.data){
           // <a class="dropdown-item" href="#">Country</a>
           const a = document.createElement("a")
           a.classList.add("dropdown-item")
           a.href="#"
           a.textContent = country
           lstCountries.append(a)
           a.addEventListener("click", function(){
              this.parentElement.parentElement.firstElementChild.textContent=this.textContent
              visualizzaTabella()
           })
        }
    }
    else
        alert(response.status + " : " + response.err)
}

async function visualizzaTabella(){
    const country = lstCountries.parentElement.firstElementChild.textContent
    const response = await myFetch.sendRequest("GET", "/getPeople", {country})
    if(response.ok){
        // console.log(response.data)
        people = response.data
        tabStudenti.innerHTML = ""
        people.forEach(person => {
            let tr = document.createElement("tr")
            tabStudenti.append(tr)
            for (const key in person){
                const td = document.createElement("td")
                tr.append(td)
                if(key != "name")
                    td.textContent = person[key]
                else
                    td.textContent = convertName(person["name"])
            }
            
            let td = document.createElement("td")
            tr.append(td)
            let btn =  document.createElement("button")
            td.append(btn)
            btn.textContent = "Dettagli"

            td = document.createElement("td")
            tr.append(td)
            btn =  document.createElement("button")
            td.append(btn)
            btn.textContent = "Elimina"
        });
    }
    else
        alert(response.status + " : " + response.err)
}

function convertName(name){
    return `${name.title} ${name.first} ${name.last}`
}


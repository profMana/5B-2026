"use strict"

let people;      // vettore enumerativo delle Persone attualmente visualizzate
// comodo per gestire i pulsanti di navigazione
let currentPos;

// i seguenti puntatori sono tutti definiti tramite ID
// let lstCountries 
// let tabStudenti  
// let divDettagli 

const dettagliImg = divDettagli.querySelector("img")
const dettagliTitle = divDettagli.querySelector(".card-title")
const dettagliText = divDettagli.querySelector(".card-text")

const btnNavigazione = divDettagli.querySelectorAll("a")

// listeners di evento
btnAdd.addEventListener("click", function () {
    window.location.href = "./inserisci.html"
})

// avvio 
divDettagli.style.display = "none"
getCountries()


async function getCountries() {
    let response = await myFetch.sendRequest("GET", "/getCountries")
    if (response.ok) {
        // console.log(response.data)
        for (const country of response.data) {
            // <a class="dropdown-item" href="#">Country</a>
            const a = document.createElement("a")
            a.classList.add("dropdown-item")
            a.href = "#"
            a.textContent = country
            lstCountries.append(a)
            a.addEventListener("click", function () {
                this.parentElement.parentElement.firstElementChild.textContent = this.textContent
                visualizzaTabella()
				divDettagli.style.display = "none"
            })
        }
    }
    else
        alert(response.status + " : " + response.err)
}

async function visualizzaTabella() {
    const country = lstCountries.parentElement.firstElementChild.textContent
    const response = await myFetch.sendRequest("GET", "/getPeople", { country })
    if (response.ok) {
        // console.log(response.data)
        people = response.data
        tabStudenti.innerHTML = ""
        people.forEach((person, index) => {
            let tr = document.createElement("tr")
            tabStudenti.append(tr)
            for (const key in person) {
                const td = document.createElement("td")
                tr.append(td)
                if (key != "name")
                    td.textContent = person[key]
                else
                    td.textContent = convertName(person["name"])
            }

            let td = document.createElement("td")
            tr.append(td)
            let btn = document.createElement("button")
            td.append(btn)
            btn.textContent = "Dettagli"
            btn.addEventListener("click", function () {
                currentPos = index
                visualizzaDettagli(person.name)
            })

            td = document.createElement("td")
            tr.append(td)
            btn = document.createElement("button")
            td.append(btn)
            btn.textContent = "Elimina"
            btn.addEventListener("click", function () {
                elimina(person.name)
            })
        });
    }
    else
        alert(response.status + " : " + response.err)
}

function convertName(name) {
    return `${name.title} ${name.first} ${name.last}`
}

async function visualizzaDettagli(nome) {
    const response = await myFetch.sendRequest("GET", "/getDetails", { nome })
    if (response.ok) {
        console.log(response.data)
        const personDetails = response.data
        divDettagli.style.display = "";

        if (personDetails.picture && personDetails.picture.large)
            dettagliImg.src = personDetails.picture.large
        else
            dettagliImg.src = "./img/user.png" // img di default

        dettagliTitle.textContent = convertName(personDetails.name)

        dettagliText.innerHTML = `<b>gender</b>: ${personDetails.gender} <br/>
                   <b>address</b>: ${JSON.stringify(personDetails.location)} <br/>
                   <b>email</b>: ${personDetails.email} <br/>
                   <b>dob</b>: ${JSON.stringify(personDetails.dob)} `
    }
    else
        alert(response.status + " : " + response.err)
}

async function elimina(nome) {
    if (confirm("Sei sicuro di voler rimuovere questa persona?")) {
        const response = await myFetch.sendRequest("DELETE", "/delete", nome)
        if (response.ok) {
            console.log(response.data)
            visualizzaTabella()
            divDettagli.style.display = "none"
            alert("Record rimosso correttamente")
        }
        else
            alert(response.status + " : " + response.err)
    }
}

/* pulsanti di navigazione dei dettagli */
btnNavigazione[0].addEventListener("click", function(){
    if (currentPos != 0)
    {
        currentPos = 0
        visualizzaDettagli(people[currentPos].name)
    }   
})
btnNavigazione[1].addEventListener("click", function(){
    if (currentPos > 0)
    {
        currentPos--
        visualizzaDettagli(people[currentPos].name)
    } 
})
btnNavigazione[2].addEventListener("click", function(){
    if (currentPos < people.length-1)
    {
        currentPos++
        visualizzaDettagli(people[currentPos].name)
    } 
})
btnNavigazione[3].addEventListener("click", function(){
    if (currentPos != people.length-1)
    {
        currentPos = people.length-1
        visualizzaDettagli(people[currentPos].name)
    } 
})

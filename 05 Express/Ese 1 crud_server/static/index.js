"use strict"

const divFilters = document.querySelector(".card")
const table = document.getElementById("mainTable")
const thead = table.querySelector("thead")
const tbody = table.querySelector("tbody")
const divDettagli = document.getElementById("divDettagli")

// avvio
let currentCollection = "";
divFilters.style.display="none"
btnAdd.disabled = true
btnUpdate.disabled = true

getCollections()

async function getCollections(){
    const httpResponse = await myFetch.sendRequest("GET", "/getCollections")
    if(httpResponse.ok){
        console.log(httpResponse.data)
        const collections = httpResponse.data
        const label = divCollections.querySelector("label")
        for (const collection of collections){
            // senza true non verrebbero copiati gli elementi interni
            const clonedLabel = label.cloneNode(true)
            divCollections.append(clonedLabel)
            clonedLabel.querySelector("span").textContent = collection.name
            clonedLabel.querySelector("input").addEventListener("click",function(){
                let txt = divIntestazione.querySelector("strong")
                txt.textContent = collection.name
                btnAdd.disabled = false;
                btnUpdate.disabled = false;
                currentCollection = collection.name;
                getData();
            })
        }
        label.remove()
    }
    else
        alert(httpResponse.status + " : " + httpResponse.err)
}

//Servizio n.1 --> Ottiene tutti i data di una collezione
async function getData(filters = {})
{
    const httpResponse = await myFetch.sendRequest("GET", `/${currentCollection}`,filters);
    if(httpResponse.ok)
    {
        console.log(httpResponse.data);   
        const data = httpResponse.data; 
        let txt = divIntestazione.querySelectorAll("strong")[1];
        txt.textContent = data.length;

        tbody.innerHTML = "";
        data.forEach(function(item,i)
        {
            const tr = document.createElement("tr");
            tbody.append(tr);
            //Object.keys() --> restituisce il vettore enumerativo
            //delle chiavi!
            const keys = Object.keys(item);
            if(i == 0)
            {
                thead.querySelectorAll("th")[0].textContent = keys[0];
                thead.querySelectorAll("th")[1].textContent = keys[1];
            }

            //primo campo
            let td = document.createElement("td");
            tr.append(td);
            td.textContent = item[keys[0]];
            td.addEventListener("click", function()
            {
                getCurrent(item._id);
            })
            
            //secondo campo
            td = document.createElement("td");
            tr.append(td);
            td.textContent = item[keys[1]];
            td.addEventListener("click", function()
            {
                getCurrent(item._id);
            })

            //campo bottoni
            td = document.createElement("td");
            tr.append(td);

            //modifica(patch)
            let div = document.createElement("div");
            td.append(div);

            //modifica(put)
            div = document.createElement("div");
            td.append(div);

            //delete
            div = document.createElement("div");
            td.append(div);

            //Abilitazione e disabilitazione filtri
            if(currentCollection == "unicorns")
            {
                divFilters.style.display = "";
            }
            else
                divFilters.style.display = "none";
            
            divDettagli.innerHTML = "";
        });
            
    }
    else
        alert(httpResponse.status + " : " + httpResponse.err)
}

//Filtri(solo per unicorns)
btnFind.addEventListener("click", function()
{
    const hair = lstHair.value;
    let gender = "";
    const chks = divFilters.querySelectorAll("input[type=checkbox]:checked");

    if(chks.length == 1)
    {
        gender = chks[0].value;
    }

    const filters = {};

    if(hair != "All")
    {
        filters.hair = hair.toLowerCase();
    }
    if(gender != "")
    {
        filters.gender = gender.toLowerCase();
    }
    
    getData(filters);
})

//Servizio n.2 --> Ottiene i dettagli di un singolo record in base all'id
async function getCurrent(id) {
    const httpResponse = await myFetch.sendRequest("GET", `${currentCollection}/${id}`);

    if(httpResponse.ok)
    {
        const data = httpResponse.data;
        console.log(data);

        divDettagli.innerHTML = "";
        for(let key in data)
        {
            const strong = document.createElement("strong");
            divDettagli.appendChild(strong);
            strong.textContent = key + ' : ';

            const span = document.createElement("span");
            divDettagli.appendChild(span);
            if(typeof(data[key]) == "object")
                span.textContent = JSON.stringify(data[key]);
            else
                span.textContent = data[key];

            divDettagli.append(document.createElement("br"));
        }
    }
    else
        alert(httpResponse.status + " : " + httpResponse.err)
}

//Servizio n.3 --> Aggiungi record
btnAdd.addEventListener("click", function()
{
    divDettagli.innerHTML = "";
    const textArea = document.createElement("textArea");
    divDettagli.append(textArea);
    textArea.style.height = `100px`;
    
    textArea.value = `{\n"name": "pippo",\n"example": "modify this!"\n}`;

    addButtons("POST");
});

function addButtons(method)
{
    let btn = document.createElement("button");
    divDettagli.append(btn);
    btn.textContent = "Invia";
    btn.classList.add("btn","btn-success","btn-sm");
    btn.style.margin = "10px";
    btn.addEventListener("click", async function()
    {
        let newRecord = divDettagli.firstChild.value;
        try
        {
            newRecord = JSON.parse(newRecord);
        }catch(err)
        {
            alert(`JSON non valido!\n${err}`);
            return;
        }

        const httpResponse = await myFetch.sendRequest(method, `/${currentCollection}`, newRecord);
        if(httpResponse.ok)
        {
            const data = httpResponse.data;
            console.log(data);
            alert(`Operazione eseguita correttamente!`);
            getData();
        }
        else
            alert(httpResponse.status + " : " + httpResponse.err)
    });

    btn = document.createElement("button");
    divDettagli.append(btn);
    btn.textContent = "Annulla";
    btn.classList.add("btn","btn-secondary","btn-sm");
    btn.style.margin = "10px";
    btn.addEventListener("click", function()
    {
        divDettagli.innerHTML = "";
    });
}


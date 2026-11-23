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

async function getData()
{
    const httpResponse = await myFetch.sendRequest("GET", `/${currentCollection}`);
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
            
            //secondo campo
            td = document.createElement("td");
            tr.append(td);
            td.textContent = item[keys[1]];

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



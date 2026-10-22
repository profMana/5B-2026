const btns = document.querySelectorAll("button")
const tbody = document.getElementsByTagName("tbody")[0]

// Visualizza unicorni
btns[0].addEventListener("click", visualizza)
btns[1].addEventListener("click", aggiungi)
btns[2].addEventListener("click", aggiorna)
btns[3].addEventListener("click", elimina)

async function visualizza(){
    const gender = document.querySelector("input[type=radio]:checked").value
    const response = await myFetch.sendRequest("GET", "/getUnicorns/" + gender)
    if(response.ok){
        console.log(response.data);
        tbody.innerHTML=""
        for (const unicorn of response.data){
            const tr = document.createElement("tr")
            tbody.append(tr)
            for (const key in unicorn){
                const td = document.createElement("td")
                td.textContent= unicorn[key]
                tr.append(td)
                if(key=="_id"){
                    td.style.cursor="pointer"
                    td.addEventListener("click", getUnicorn)
                }
            }
        }
    }
    else
        alert(response.status + ": " + response.err)
}

async function getUnicorn(){
    const id = this.textContent
    const response = await myFetch.sendRequest("GET", "getUnicorn/"+id)
    if(response.ok)
        alert(JSON.stringify(response.data))
    else
        alert(response.status + ": " + response.err)
}

async function aggiungi(){
    const unicorn = { 
        "name": txtName.value,
        "dob": (new Date()).toLocaleDateString().replaceAll("/", "-"),
        "loves": ["watermelon", "grapes"],
        "weight": 100,
        "gender": document.querySelector("input[name=gender]:checked").value
    }
    const response = await myFetch.sendRequest("POST", "addUnicorn", unicorn)
    if(response.ok)
    {
        console.log(response.data)
        alert("Record aggiunto correttamente")
        visualizza()
    }
    else 
        alert(response.status + ": " + response.err)
}

async function aggiorna(){
    let name = txtName.value
    const response = await myFetch.sendRequest("PATCH", "updateUnicorn/" + name, {"hair": "blonde"})
    if (response.ok)
    {
        console.log(response.data)
        alert("Record aggiornato correttamente")
        visualizza()
    }
    else 
        alert(response.status + ": " + response.err)
}

async function elimina(){
    let name = txtName.value
    const response = await myFetch.sendRequest("DELETE", "deleteUnicorn/" + name)
    if (response.ok)
    {
        console.log(response.data)
        alert("Record eliminato correttamente")
        visualizza()
    }
    else 
        alert(response.status + ": " + response.err)
}
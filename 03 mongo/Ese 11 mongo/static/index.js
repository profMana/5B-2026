const btns = document.querySelectorAll("button")
const tbody = document.getElementsByTagName("tbody")[0]

// Visualizza unicorni
btns[0].addEventListener("click", visualizza)

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
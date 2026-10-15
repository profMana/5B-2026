const btns = document.querySelectorAll("button")

// Visualizza unicorni
btns[0].addEventListener("click", visualizza)

async function visualizza(){
    const gender = document.querySelector("input[type=radio]:checked").value
    const response = await myFetch.sendRequest("GET", "/getUnicorns/" + gender)
    if(response.ok)
        console.log(response.data);
    else
        alert(response.status + ": " + response.err)
}
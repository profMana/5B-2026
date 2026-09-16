"use strict";
const _URL =  "/api/"

async function inviaRichiesta(method, url="", params={}) {
	if(url.startsWith("/"))  url = url.substring(1);
	method = method.toUpperCase()	
	
	let options = {
		"method": method,
		"headers":{},
		"mode": "cors",                  // default
		"cache": "no-cache",             // default
		"credentials": "same-origin",    // default
		"redirect": "follow",            // default
		"referrerPolicy": "no-referrer", // default no-referrer-when-downgrade
    }
	










}
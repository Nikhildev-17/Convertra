import {URL} from "./config.js"
import { countryList } from "./list.js";

let input = document.querySelector(".input input");
const fromCurrency = document.querySelector(".select #fromCurrency");
const toCurrency = document.querySelector(".select #toCurrency");
let message = document.querySelector(".message p");
const convert = document.querySelector(".btn");
const list = document.querySelectorAll(".select select");


for(let select of list){
    for(let countryCode in countryList){
        let newCountry = document.createElement("option");
        newCountry.innerText = countryCode;
        newCountry.value = countryCode;
        select.append(newCountry);
    }
}

fromCurrency.value = "USD";
toCurrency.value = "INR";

const FetchApi = async () => {
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;
    const amount = Number(input.value);
    if(amount <= 0){
        message.classList.add("error");
        message.innerText = "Please Enter a Valid Amount";
        return;
    }

    let url = `${URL}/${fromValue}/${toValue}/${amount}`;
    
    try{
    let respond = await fetch(url);
    if(!respond.ok){
        throw new Error("API response is not Clear, please try again!");
    }
    let data = await respond.json();
    let finalAmount =  data.conversion_result;
    message.classList.remove("error")
    message.innerText = `${amount} ${fromValue} is equal to ${finalAmount} ${toValue}`;
    } catch(error){
        message.classList.add("error");
        message.innerText = error.message;
    }
}

convert.addEventListener("click", () => {
    FetchApi();
})
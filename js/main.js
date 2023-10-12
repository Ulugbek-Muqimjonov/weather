const API = "05178d33732ec8d2873cd0421415c812";
const elform = document.querySelector(".hero__form");
const elinput = elform.querySelector(".hero__form-cuntry");
const country = document.querySelector(".hero__result-region");
const template = document.querySelector(".hero__template").content;
const node = document.querySelector(".hero__result");

async function getdata(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();     
        // console.log(data);
        
        const templateClone = template.cloneNode(true);
        node.innerHTML = "";

        templateClone.querySelector(".hero__result-img");
        // bu yerda switch case orqali ob xavo turiga qarab rasmlarni joyladim
        console.log(data);
        switch (data.weather[0].main) {
        case "Clear":
            templateClone.querySelector(".hero__result-img").   src = "../images/clear.png";
            break;
            
        case "Clouds":
            templateClone.querySelector(".hero__result-img").src = "../images/cloudy.png";
            break;
            case "Rain":
            templateClone.querySelector(".hero__result-img").src = "../images/rain.png";
            break;
        case "Drizzle":
            templateClone.querySelector(".hero__result-img").src = "../images/rain.png";
            break;
        case "Snow":
            templateClone.querySelector(".hero__result-img").src = "../images/snow.png";
            break;
        case "Mist":
            templateClone.querySelector(".hero__result-img").src = "../images/tuman.png";
            break;
        case "Smoke":
            templateClone.querySelector(".hero__result-img").src = "../images/tuman.png";
            break;
            default:
            templateClone.querySelector(".hero__result-img").src = "";
        }

        // bu joyda tempera turani textContentga tenglaidim lekin temperatura KELVIN birligida kelgani uchun uni selciyga otgazdim

        templateClone.querySelector(".hero__result-temp").textContent = `${Math.round(data.main.temp - 273)} °C `;
        
        // bu yerda agar shahar o'rniga davlat kirgazib qo'ysa davlatni uzni name ini oladi
        if(data.sys.country) {
            templateClone.querySelector(".hero__result-region").textContent = `${data.name} , ${data.sys.country}`;
        }else {
            templateClone.querySelector(".hero__result-region").textContent = `${data.name}`;
        }

        // bu joyda nisbiy namlikni foizlardagi qiymati
        templateClone.querySelector(".hero__result-wather").textContent = `${data.main.humidity} %`;

        // bu joyda shamol qanday tezlikda esishi
        templateClone.querySelector(".hero__result-wind").innerHTML = `<span class ="big">${data.wind.speed}</span> <small class = "small">km/h</small>`;
        
        node.appendChild(templateClone)
        
    } catch (error) {
        console.log(error);
        node.innerHTML = `<p class ="error">Kechirasiz bizda bu shahar xaqida malumot yo'q !</p>`
    }
}


elform.addEventListener("submit",evt => {
    evt.preventDefault();
    const elinputValue = elinput.value.trim();
    getdata(`https://api.openweathermap.org/data/2.5/weather?q=${elinputValue}&appid=${API}`)
    
    elinput.value = "";
})
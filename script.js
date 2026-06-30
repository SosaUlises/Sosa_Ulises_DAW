let button = document.getElementById("btnClima");
let input = document.getElementById("ciudad");
let estado = document.getElementById("estado");
let contenedor = document.getElementById("contenedor");

button.addEventListener("click", async function() {
    
    try{
        let firsturl = "https://geocoding-api.open-meteo.com/v1/search?name=CIUDAD&count=1";
        let secondurl = "https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current_weather=true";

        estado.textContent = "Cargando...";
        contenedor.innerHTML = "";
        let ciudadValue = input.value;
        let urlFinal = firsturl.replace("CIUDAD", ciudadValue);

        console.log(urlFinal);

        let respuesta = await fetch(urlFinal);
        if(!respuesta.ok){
            throw new Error("Ciudad no encontrada");
        }

        let ciudad = await respuesta.json();
        let longitud = "";
        let latitud = "";
        let nombre = "";

        for(let i = 0; i < ciudad.results.length; i++){
                nombre = ciudad.results[i].name;
                longitud = ciudad.results[i].longitude;
                latitud = ciudad.results[i].latitude;
                break;
        }

        let urlFinal2 = secondurl.replace("LAT", latitud).replace("LON", longitud);
        console.log(urlFinal2);

        let respuesta2 = await fetch(urlFinal2);
        if(!respuesta2.ok){
            throw new Error("Error en la solicitud");
        }

        let clima = await respuesta2.json();
        contenedor.innerHTML += `
            <p>Nombre: ${nombre}</p>
            <p>Temperatura: ${clima.current_weather.temperature}</p>
            <p>Viento: ${clima.current_weather.windspeed}</p>
            <p>Codigo del clima: ${clima.current_weather.weathercode}</p>
        `;

        estado.textContent = "Clima obtenido correctamente";

    }catch(error){
        console.log(error);
        estado.textContent = "Error al obtener el clima";
    }
});
let firsturl = " https://geocoding-api.open-meteo.com/v1/search?name=CIUDAD&count=1";
let secondurl = "https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current_weather=true}";
let button = document.getElementById("btnClima");
let ciudad = document.getElementById("ciudad");
let estado = document.getElementById("estado");
let contenedor = document.getElementById("contenedor");

button.addEventListener("click", function() {

    try{
        estado.textContent = "Cargando...";
        contenedor.innerHTML = "";
        let ciudadValue = ciudad.value;
        let urlFinal = firsturl.replace("CIUDAD", ciudadValue);

        let respuesta = fetch(urlFinal);
        if(!respuesta.ok){
            throw new Error("Ciudad no encontrada");
        }

        let ciudad = respuesta.json();
        var longitud = ciudad.longitude;
        var latitud = ciudad.latitude;

        let urlFinal2 = secondurl.replace("LAT", latitud).replace("LON", longitud);

        let respuesta2 = fetch(urlFinal2);
        if(!respuesta2.ok){
            throw new Error("Error en la solicitud");
        }

        let clima = respuesta2.json();
        contenedor.innerHTML += `
            <p>Nombre: ${ciudad.name}</p>
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
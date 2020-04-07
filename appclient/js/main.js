// fichero javascript para app

window.addEventListener('load', init());
let retornoJson;
function init() {
    cargarJSON();
}

function cargarJSON() {
    url = "http://localhost:8080/apprest/api/personas/";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Json
            const jsonData = JSON.parse(this.responseText);

            retornoJson = jsonData;

            console.debug('Document Load and Ready');
            let selectorSexo = document.getElementById("selectorSexo");
            pintarLista(jsonData);
            selectorSexo.addEventListener('change', filtrarSexo(jsonData), false);
        }

    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function pintarLista(alumnosJSON) {
    let lista = document.getElementById('alumnos');
    lista.innerHTML = '';
    for (let i = 0; i < alumnosJSON.length; i++) {
        lista.innerHTML += '<li class="list-item"><img src="img/' + alumnosJSON[i].avatar + '" alt="avatar">' + alumnosJSON[i].nombre + '</li>';
    }
};

function filtrarSexo(alumnosJSON) {
    let selector = document.getElementById('selectorSexo').value;
    alert(selector);
    let personasFiltradas;
    if (selector == 't') {
        personasFiltradas = alumnosJSON;
    } else {
        personasFiltradas = alumnosJSON.filter(el => el.sexo == selector);
    };

    console.debug(personasFiltradas);
    //pintar la lista filtrada
    let lista = document.getElementById('alumnos');
    lista.innerHTML = '';
    for (let i = 0; i < personasFiltradas.length; i++) {
        lista.innerHTML += '<li class="list-item"><img src="img/' + personasFiltradas[i].avatar + '" alt="avatar">' + personasFiltradas[i].nombre + '</li>';
    }

};
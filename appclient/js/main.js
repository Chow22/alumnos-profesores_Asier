// fichero javascript para app
let personas=[];
window.addEventListener('load', init());

function init() {
    cargarJSON();

    console.debug('Document Load and Ready');
    let selectorSexo = document.getElementById("selectorSexo");
    
    selectorSexo.addEventListener('change', filtrarSexo);
    
}

function cargarJSON() {
    url = "http://localhost:8080/apprest/api/personas/";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Json
            const jsonData = JSON.parse(this.responseText);

            personas = jsonData;
            pintarLista(personas);
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

function filtrarSexo() {
    let selector = document.getElementById('selectorSexo').value;
    alert(selector);
    let personasFiltradas;
    if (selector == 't') {
        personasFiltradas = personas;
    } else {
        personasFiltradas = personas.filter(el => el.sexo == selector);
    };

    console.debug(personasFiltradas);
    //pintar la lista filtrada
    let lista = document.getElementById('alumnos');
    lista.innerHTML = '';
    for (let i = 0; i < personasFiltradas.length; i++) {
        lista.innerHTML += '<li class="list-item"><img src="img/' + personasFiltradas[i].avatar + '" alt="avatar">' + personasFiltradas[i].nombre + '</li>';
    }

};
// fichero javascript para app
const alumnosJSON = [{
    "avatar": "img/avatar1.png",
    "nombre": "Oconnor",
    "sexo": "h"

},
{
    "avatar": "img/avatar2.png",
    "nombre": "Pepa",
    "sexo": "m"

},
{
    "avatar": "img/avatar3.png",
    "nombre": "JoseMAri",
    "sexo": "h"

},
{
    "avatar": "img/avatar4.png",
    "nombre": "JuanCar",
    "sexo": "h"

},
{
    "avatar": "img/avatar5.png",
    "nombre": "Gustavo",
    "sexo": "h"

},
{
    "avatar": "img/avatar6.png",
    "nombre": "Enrique",
    "sexo": "h"

},
{
    "avatar": "img/avatar7.png",
    "nombre": "Maria",
    "sexo": "m"

}];

window.addEventListener('load', init());

function init() {
    console.debug('Document Load and Ready');
    pintarLista();

    function pintarLista() {
        let lista = document.getElementById('alumnos');
        lista.innerHTML = '';
        for (let i = 0; i < alumnosJSON.length; i++) {
            lista.innerHTML += '<li class="list-item"><img src="' + alumnosJSON[i].avatar + '" alt="avatar">' + alumnosJSON[i].nombre + '</li>';
        }
    }
}

function filtrarSexo() {
    let selector=document.getElementById('selectorSexo').value;
    alert(selector);
    let personasFiltradas;
    if(selector=='t'){
        personasFiltradas=alumnosJSON;
    }else{
        personasFiltradas = alumnosJSON.filter(el => el.sexo == selector);
    };
    
console.debug(personasFiltradas);
    //pintar la lista filtrada
    let lista = document.getElementById('alumnos');
    lista.innerHTML = '';
    for (let i = 0; i < personasFiltradas.length; i++) {
        lista.innerHTML += '<li class="list-item"><img src="' + personasFiltradas[i].avatar + '" alt="avatar">' + personasFiltradas[i].nombre + '</li>';
    }

};


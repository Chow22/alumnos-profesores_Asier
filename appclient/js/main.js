// fichero javascript para app
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];

window.addEventListener('load', init());

function init() {
    console.debug('Document Load and Ready');
    listener();


    const promesa = ajax("GET", endpoint, undefined);
    promesa
        .then(data => {
            console.trace('promesa resolve');
            personas = data;
            pintarLista(personas);

        }).catch(error => {
            console.warn('promesa rejectada');
            alert(error);
        });

    console.debug('continua la ejecuion del script de forma sincrona');


}

function listener() {

    let selectorSexo = document.getElementById('selectorSexo');
    let inputNombre = document.getElementById('nombre');

    selectorSexo.addEventListener('change', filtrarSexo);

    inputNombre.addEventListener('keyup', function () {
        const busqueda = inputNombre.value.toLowerCase();
        console.debug('tecla pulsada, valor input ' + busqueda);
        if (busqueda) {
            const personasFiltradas = personas.filter(el => el.nombre.toLowerCase().includes(busqueda));
            pintarLista(personasFiltradas);
        } else {
            pintarLista(personas);
        }
    });


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
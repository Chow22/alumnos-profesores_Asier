// fichero javascript para app
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];

window.addEventListener('load', init());

function init() {
    console.debug('Document Load and Ready');
    listener();
    initGallery();
    conseguirAlumnos();

    console.debug('continua la ejecuion del script de forma sincrona');


}

function conseguirAlumnos() {
    document.getElementById("selectorSexo").selectedIndex = 0;

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
    alumnosJSON.forEach((p, i) => lista.innerHTML += `<li>
                                                            <img src="img/${p.avatar}" alt="avatar">${p.nombre}
                                                            <i class="fas fa-pencil-ruler" onclick="seleccionar(${i})"></i>
                                                            <i class="fas fa-trash" onclick="eliminar(${i})"></i>
                                                        </li>` );
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
    personasFiltradas.forEach((p, i) => lista.innerHTML += `<li>
                                                            <img src="img/${p.avatar}" alt="avatar">${p.nombre}
                                                            <i class="fas fa-pencil-ruler" onclick="seleccionar(${i})"></i>
                                                            <i class="fas fa-trash" onclick="eliminar(${i})"></i>
                                                        </li>` );
}

function eliminar(indice) {
    let personaSeleccionada = personas[indice];
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada.nombre} ?`;
    if (confirm(mensaje)) {

        const url = endpoint + personaSeleccionada.id;
        ajax('DELETE', url, undefined)
            .then(data => {

                // conseguir de nuevo todos los alumnos
                conseguirAlumnos();

            })
            .catch(error => {
                console.warn('promesa rejectada');
                alert(error);
            });

    }

}

function seleccionar(indice) {

    let personaSeleccionada = { "id": 0, "nombre": "sin nombre" };

    if (indice >= 0) {
        personaSeleccionada = personas[indice];
    }

    console.debug('click guardar persona %o', personaSeleccionada);

    //rellernar formulario
    document.getElementById('inputId').value = personaSeleccionada.id;
    document.getElementById('inputNombre').value = personaSeleccionada.nombre;
    document.getElementById('inputAvatar').value = personaSeleccionada.avatar;

    const sexo = personaSeleccionada.sexo;
    let checkHombre = document.getElementById('sexoh');
    let checkMujer = document.getElementById('sexom');

    if (sexo == "h") {
        checkHombre.checked = 'checked';
        checkMujer.checked = '';

    } else {
        checkHombre.checked = '';
        checkMujer.checked = 'checked';
    }


}

function guardar() {

    console.trace('click guardar');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;
    const avatar = document.getElementById('inputAvatar').value;

    var ele = document.getElementsByName('sexo');


    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            sexoelegido = ele[i].value;
    }

    //arregla en fallo de mandar con img/ o sin ello
    if (avatar.includes("img/")) {
        personaSeleccionada = {
            "id": id,
            "nombre": nombre,
            "avatar": avatar.substring(4, 20),
            "sexo": sexoelegido
        }
    } else {
        personaSeleccionada = {
            "id": id,
            "nombre": nombre,
            "avatar": avatar,
            "sexo": sexoelegido
        }
    };

    console.debug('persona a guardar %o', personaSeleccionada);

    //TODO llamar servicio rest

    //CREAR
    if (id == 0) {
        console.trace('Crear nueva persona');
        //persona.id = ++personas.length;
        //personas.push(persona);

        ajax('POST', endpoint, personaSeleccionada)
            .then(data => {

                // conseguir de nuevo todos los alumnos
                conseguirAlumnos();


            })
            .catch(error => {
                console.warn('promesa rejectada');
                alert(error);
            });


        // MODIFICAR
    } else {
        console.trace('Modificar persona');

        const url = endpoint + personaSeleccionada.id;
        ajax('PUT', url, personaSeleccionada)
            .then(data => {

                // conseguir de nuevo todos los alumnos
                conseguirAlumnos();


            })
            .catch(error => {
                console.warn('No se pudo actualizar');
                alert(error);
            });

    }




}


function initGallery() {
    let divGallery = document.getElementById('gallery');
    for (let i = 1; i <= 7; i++) {
        divGallery.innerHTML += `<img onclick="selectAvatar(event)" 
                                      class="avatar" 
                                      data-path="img/avatar${i}.png"
                                      src="img/avatar${i}.png">`;
    }
}

function selectAvatar(evento) {
    console.trace('click avatar');
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach(el => el.classList.remove('selected'));
    evento.target.classList.add('selected');

    let iAvatar = document.getElementById('inputAvatar');
    iAvatar.value = evento.target.dataset.path;

}

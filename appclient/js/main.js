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

        //TODO mirar como remover de una posicion
        //personas = personas.splice(indice,1);
        personas = personas.filter(el => el.id != personaSeleccionada.id)
        pintarLista(personas);
        //TODO llamada al servicio rest

    }

}

function seleccionar(indice) {

    let personaSeleccionada = { "id": personas.length+1, "nombre": "sin nombre" };

    if (indice != '*') {
        personaSeleccionada = personas[indice];
    }

    console.debug('click guardar persona %o', personaSeleccionada);

    //rellernar formulario
    document.getElementById('inputId').value = personaSeleccionada.id;
    document.getElementById('inputNombre').value = personaSeleccionada.nombre;

}

function guardar() {

    console.trace('click guardar');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;

    personaSeleccionada = {
        "id": id,
        "nombre": nombre,
        "avatar": "avatar7.png"
    };
    console.info( personas.some(el => el.id == 2 ));

    if (personas.some(el => el.id == id )){
        personas.map(function (dato) {
            if (dato.id == id) {
                dato.nombre = nombre;
            }
        })
    }else{
        personas.push(personaSeleccionada);
    }
    console.debug('persona a guardar %o', personaSeleccionada);

    //TODO llamar servicio rest

  
    pintarLista(personas);

}
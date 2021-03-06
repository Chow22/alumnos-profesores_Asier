/**
 * Variables globales
 */
const endpoint = 'http://localhost:8080/apprest/api/personas/';
let personas = [];
let personaSeleccionada = { "id": 0, "nombre": "sin nombre" };

window.addEventListener('load', init());

/**
 * funcion de carga pagina
 */

function init() {
    console.debug('Document Load and Ready');
    listener();
    initGallery();
    conseguirAlumnos();
    console.debug('continua la ejecuion del script de forma sincrona');

}


/**
 * Eventos click
 */
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

    let filtroCursos = document.getElementById('filtroCurso');
    filtroCursos.addEventListener('keyup', function (event) {
        let filtro = filtroCursos.value.trim();
        if (filtro.length >= 3) {
            console.debug('filtroCursos keyup ' + filtro);
            cargarCursosTodos(filtro);
        } else {
            cargarCursosTodos();
        }

    });



    // buscar si existe nombre
    let iNombre = document.getElementById('inputNombre');
    let nombreMensaje = document.getElementById('nombreMensaje');

    iNombre.addEventListener('keyup',  () =>{
        console.debug('tecla pulsada ' + iNombre.value);

        if ( personaSeleccionada.nombre != iNombre.value ){

            const url = endpoint + iNombre.value;
            ajax('GET', url, undefined)
                .then( ( data ) => {
                    console.debug('Nombre NO disponible');
                    nombreMensaje.textContent = 'Nombre NO disponible';
                    iNombre.classList.add('is-invalid');
                    iNombre.classList.remove('is-invalid');
                })
                .catch( ( error ) => {
                    console.debug('Nombre disponible');
                    nombreMensaje.textContent = 'Nombre disponible';
                    nombreMensaje.classList.add('valid');
                    nombreMensaje.classList.remove('invalid');
                });
        }     

    

    });

}


/**
 * Pintar lista personas 
 */

function pintarLista(alumnosJSON) {


    let lista = document.getElementById('alumnos');
    lista.innerHTML = '';
    alumnosJSON.forEach((p, i) => lista.innerHTML += `<div class="well well-sm">
                                            <div class="row">
                                            <div class="col-xs-3 col-md-3 text-center">
                                                <img src="img/${p.avatar}" alt=""
                                                    class="img-rounded img-responsive" />
                                            </div>
                                            <div class="col-xs-9 col-md-9 section-box">
                                                <h2>
                                                ${p.nombre}  <div class="iconos">  <span class="icono glyphicon glyphicon-pencil" onclick="seleccionar(${p.id})"></span>
                                                <span class="icono glyphicon glyphicon-trash icono" onclick="eliminar(${p.id})"></span></div>
                                                </h2>
                                                <h4>Numero de cursos: ${p.cursos.length}</h4>
                                            </div>
                                        </div>
                                        </div> 
    
    ` );
};


/**
 * filtro sexo
 */

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
    personasFiltradas.forEach((p, i) => lista.innerHTML += `<div class="well well-sm">
                                                        <div class="row">
                                                                <div class="col-xs-3 col-md-3 text-center">
                                                                    <img src="img/${p.avatar}" alt=""
                                                                        class="img-rounded img-responsive" />
                                                                </div>
                                                                <div class="col-xs-9 col-md-9 section-box">
                                                                <h2>
                                                                ${p.nombre}    <div class="iconos"> <span class="icono glyphicon glyphicon-pencil" onclick="seleccionar(${p.id})"></span>
                                                                <span class="icono glyphicon glyphicon-trash icono" onclick="eliminar(${p.id})"></span></div>
                                                                </h2>
                                                                <h4>Numero de cursos: ${p.cursos.length}</h4>
                                                                </div>
                                                            </div>
                                                        </div>   
` );
}

/**
 * Eliminar persona
 */

function eliminar(id) {
    let personaSeleccionada = personas.find(persona => persona.id == id);
    console.debug('click eliminar persona %o', personaSeleccionada);
    const mensaje = `¿Estas seguro que quieres eliminar  a ${personaSeleccionada.nombre} ?`;
    if (confirm(mensaje)) {

        const url = endpoint + personaSeleccionada.id;
        ajax('DELETE', url, undefined)
            .then(data => {
                conseguirAlumnos();

            })
            .catch(error => {
                console.warn('promesa rejectada %o', error);
                console.debug(error);
                alert(error.informacion);
            });

    }

}

/**
 * Seleccionar persona
 */

function seleccionar(id) {

    personaSeleccionada = { "id": 0, "nombre": "sin nombre"};
    let detalle = document.getElementById("detalle");
    detalle.classList.add('magictime', 'slideRightReturn');
    detalle.style.display = "block";

    if (id >= 0) {
        personaSeleccionada = personas.find(persona => persona.id == id);
    }

    console.debug('click sleccionsr persona %o', personaSeleccionada);

    //rellernar formulario
    document.getElementById('inputId').value = personaSeleccionada.id;
    document.getElementById('inputNombre').value = personaSeleccionada.nombre;
    document.getElementById('inputAvatar').value = personaSeleccionada.avatar;
    cargarCursosComprados(personaSeleccionada.cursos);

    //seleccionar Avatar
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach(el => {
        el.classList.remove('selected');
        if ("img/" + personaSeleccionada.avatar == el.dataset.path) {
            el.classList.add('selected');
        }
    });

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

    //seleccionar rol

    const rol = personaSeleccionada.rol;
    let checkAlumno = document.getElementById('rol1');
    let checkProfesor = document.getElementById('rol2');

    if (rol == "1") {
        checkAlumno.checked = 'checked';
        checkProfesor.checked = '';

    } else {
        checkAlumno.checked = '';
        checkProfesor.checked = 'checked';
    }

}
/**
 * Guardar persona
 */
function guardar() {

    console.trace('click guardar');
    let id = document.getElementById('inputId').value;
    let nombre = document.getElementById('inputNombre').value;
    const avatar = document.getElementById('inputAvatar').value;

    var eleSexo = document.getElementsByName('sexo');
    var eleRol= document.getElementsByName('rol');

    //coger sexo chekeado
    for (i = 0; i < eleSexo.length; i++) {
        if (eleSexo[i].checked)
            sexoelegido = eleSexo[i].value;
    }
    //coger rol chekeado
    for (i = 0; i < eleRol.length; i++) {
        if (eleRol[i].checked)
            rolelegido = eleRol[i].value;
    }

    //arregla en fallo de mandar con img/ o sin ello
    if (avatar.includes("img/")) {
        personaSeleccionada = {
            "id": id,
            "nombre": nombre,
            "avatar": avatar.substring(4, 20),
            "sexo": sexoelegido,
            "rol": rolelegido
        }
    } else {
        personaSeleccionada = {
            "id": id,
            "nombre": nombre,
            "avatar": avatar,
            "sexo": sexoelegido,
            "rol": rolelegido
        }
    };

    console.debug('persona a guardar %o', personaSeleccionada);

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
                alert(error.informacion);
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

 /**
 * Iniciar galeria iconos
 */
function initGallery() {
    let divGallery = document.getElementById('gallery');
    for (let i = 1; i <= 7; i++) {
        divGallery.innerHTML += `<img onclick="selectAvatar(event)" 
                                      class="avatar" 
                                      data-path="img/avatar${i}.png"
                                      src="img/avatar${i}.png">`;
    }
}

/**
 * click seleccionar avatar
 */

function selectAvatar(evento) {
    console.trace('click avatar');
    const avatares = document.querySelectorAll('#gallery img');
    avatares.forEach(el => el.classList.remove('selected'));
    evento.target.classList.add('selected');

    let iAvatar = document.getElementById('inputAvatar');
    iAvatar.value = evento.target.dataset.path;

}

/**
 * Conseguir alumnos por rest
 */

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
            alert("No se a podido conectar con el servicio Rest");
        });

}

/**
 * Cargar cursos
 */

function cargarCursosTodos(filtro = '') {
    let cursos = [];
    let uri = 'http://localhost:8080/apprest/api/cursos/?filtro=' + filtro;
    const promesa = ajax("GET", uri, undefined);
    promesa
        .then(data => {
            console.trace('promesa resolve');
            cursos = data;
            console.info(cursos);
            let lista = document.getElementById('cursosLista');
            lista.innerHTML = '';
            cursos.forEach((c, i) => lista.innerHTML += `<div class="well well-sm">
                                                            <div class="row">
                                                                <div class="col-xs-3 col-md-3 text-center">
                                                                    <img src="imagenes/${c.imagen}" alt=""
                                                                        class="img-rounded img-responsive" />
                                                                </div>
                                                                <div class="col-xs-9 col-md-9 section-box">
                                                                    <h2>
                                                                    Curso: ${c.nombre}<br> Precio: ${c.precio} €    <div class="iconos">   <span class="icono glyphicon glyphicon-plus" onClick="asignarCurso(0, ${c.id})">
                                                                        </span></div>
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>            
            ` );

        }).catch(error => {
            console.warn('promesa rejectada');
            alert(error);
        });

}

/**
 * Cargar lista de cursos asignados
 */

function cargarCursosComprados(cursos) {
    let lista = document.getElementById('cursosAlumno');
    lista.innerHTML = "";
    cursos.forEach((c, i) => lista.innerHTML += `
    <div class="well well-sm" id="tarjeta${c.id}">
                                                            <div class="row">
                                                                <div class="col-xs-3 col-md-3 text-center">
                                                                    <img src="imagenes/${c.imagen}" alt=""
                                                                        class="img-rounded img-responsive" />
                                                                </div>
                                                                <div class="col-xs-9 col-md-9 section-box">
                                                                    <h2>
                                                                    Curso: ${c.nombre}<br> Precio: ${c.precio} € <div class="iconos">   <span class="icono glyphicon glyphicon-trash" onclick="eliminarCurso(event,${personaSeleccionada.id},${c.id})">
                                                                        </span></div>
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>   
    
    ` );
}

/**
 * Eliminar curso asignado
 */

function eliminarCurso(event, idPersona, idCurso) {
    const url = endpoint + idPersona + "/curso/" + idCurso;
    ajax('DELETE', url, undefined)
        .then(data => {

            let tarjeta = document.getElementById("tarjeta" + idCurso);
            tarjeta.remove();

            conseguirAlumnos();

        })
        .catch(error => alert(error));

}

/**
 * asignar un curso
 */

function asignarCurso(idPersona = 0, idCurso) {

    idPersona = (idPersona != 0) ? idPersona : personaSeleccionada.id;

    console.debug(`click asignarCurso idPersona=${idPersona} idCurso=${idCurso}`);

    const url = endpoint + idPersona + "/curso/" + idCurso;
    ajax('POST', url, undefined)
        .then(data => {


            const c = data.data;

            let lista = document.getElementById('cursosAlumno');
            lista.innerHTML += `
                            <div class="well well-sm magictime spaceInLeft" id="tarjeta${c.id}">
                            <div class="row">
                                <div class="col-xs-3 col-md-3 text-center">
                                    <img src="imagenes/${c.imagen}" alt=""
                                        class="img-rounded img-responsive" />
                                </div>
                                <div class="col-xs-9 col-md-9 section-box">
                                    <h2>
                                    Curso: ${c.nombre}<br> Precio: ${c.precio} €   <div class="iconos">   <span class="icono glyphicon glyphicon-trash" onclick="eliminarCurso(event,${personaSeleccionada.id},${c.id})">
                                        </span></div>
                                    </h2>
                                </div>
                            </div>
                        </div>   
                                 
                            `;

            conseguirAlumnos();

        })
        .catch(error => alert(error.informacion));

}

// fichero javascript para app

window.addEventListener('load', init());

function init() {
    console.debug('Document Load and Ready');
    
    const alumnosJSON = [{
        "avatar": "img/avatar1.png",
        "nombre": "Oconnor",
        "sexo": "H"

    },
    {
        "avatar": "img/avatar2.png",
        "nombre": "Pepa",
        "sexo": "M"

    },
    {
        "avatar": "img/avatar3.png",
        "nombre": "JoseMAri",
        "sexo": "H"

    },
    {
        "avatar": "img/avatar4.png",
        "nombre": "JuanCar",
        "sexo": "H"

    },
    {
        "avatar": "img/avatar5.png",
        "nombre": "Gustavo",
        "sexo": "H"

    },
    {
        "avatar": "img/avatar6.png",
        "nombre": "Enrique",
        "sexo": "H"

    },
    {
        "avatar": "img/avatar7.png",
        "nombre": "Maria",
        "sexo": "M"

    }];


    let lista = document.getElementById('alumnos');
    lista.innerHTML='';

    for (let i = 0; i < alumnosJSON.length; i++) {
        lista.innerHTML += '<li class="list-item"><img src="'+alumnosJSON[i].avatar+'" alt="avatar">'+alumnosJSON[i].nombre+'</li>';
    }


}

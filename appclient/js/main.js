// fichero javascript para app

window.addEventListener('load', init());

function init() {
    console.debug('Document Load and Ready');
    
    let alumnosJSON = [{
        "avatar": "img/avatar1.png",
        "nombre": "Oconnor",

    },
    {
        "avatar": "img/avatar2.png",
        "nombre": "Pepa",

    },
    {
        "avatar": "img/avatar3.png",
        "nombre": "JoseMAri",

    },
    {
        "avatar": "img/avatar4.png",
        "nombre": "JuanCar",

    },
    {
        "avatar": "img/avatar5.png",
        "nombre": "Gustavo",

    },
    {
        "avatar": "img/avatar6.png",
        "nombre": "Enrique",

    },
    {
        "avatar": "img/avatar7.png",
        "nombre": "Maria",

    }];



    alumnos.innerHTML='';
    for (let i = 0; i < alumnosJSON.length; i++) {
        alumnos.innerHTML += '<li class="list-item"><img src="'+alumnosJSON[i].avatar+'" alt="avatar">'+alumnosJSON[i].nombre+'</li>';
    }


}

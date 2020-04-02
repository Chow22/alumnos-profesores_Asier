// fichero javascript para app

window.addEventListener('load', init());

function init() {
    console.debug('Document Load and Ready');
    
    alumnos.innerHTML='';
    for (let i = 1; i < 8; i++) {
        alumnos.innerHTML += `<li class="list-item"><img src="img/avatar${i}.png" alt="avatar">Alumno ${i}</li><hr>`;
    }


}

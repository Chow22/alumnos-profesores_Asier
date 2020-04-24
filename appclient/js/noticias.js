
//variables globales
const endpoint = 'http://localhost:8080/apprest/api/noticias/';

window.addEventListener('load', init());

function init() {
    console.debug('Document Load and Ready');
    cargarNoticias()

}

/**
 * Cargar las noticias
 */

function cargarNoticias() {
    ajax('GET', endpoint, undefined)
        .then(data => {
            const noticias = data;

            let lista = document.getElementById('noticiasBox');

            noticias.forEach((noticia, i) => lista.innerHTML += `<div class="well well-sm tarjetaestrecha magictime slideRightReturn">
                                                                       
                                                     
                                                                        ${noticia.fecha}  
                                                                            <h2>${noticia.titulo}</h2>
                                                                            <br> 
                                                                        

                                                                         <p>${noticia.contenido} € "</p>
                                                                    </div>   
` );



            lista.innerHTML += `

                                 
                            `;

        })
        .catch(error => alert(error));

}
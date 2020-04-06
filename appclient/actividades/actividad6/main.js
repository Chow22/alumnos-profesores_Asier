let url = 'https://pokeapi.co/api/v2/pokemon';


window.onload = function () {
  listaPokemon(url);
};

function detallePokemon(boton) {
  url = boton.name;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      // Json
      const jsonData = JSON.parse(this.responseText);

      const pokemon = jsonData;



      let nombre = document.getElementById('nombrepokemon');
      let exp = document.getElementById('exp');
      let peso = document.getElementById('peso');
      let imagen = document.getElementById('imagen');


      nombre.innerHTML = pokemon.name;
      exp.innerHTML = "Experiencia base: "+pokemon.base_experience;
      peso.innerHTML = "Peso: "+pokemon.weight;
      imagen.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`);


    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();

}


function listaPokemon(url) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      // Json
      const jsonData = JSON.parse(this.responseText);

      const pokemons = jsonData.results;

      let pokeLista = document.getElementById('listapokemons');
      pokeLista.innerHTML = '';

      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];

        pokeLista.innerHTML += `<li class="list-group-item"><a href="#" onclick="detallePokemon(this)" name="${pokemon.url}">
                                  ${pokemon.name}
                                </a></li>`;

      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
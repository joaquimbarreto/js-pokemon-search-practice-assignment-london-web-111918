document.addEventListener('DOMContentLoaded', fetchPokemons)

const pokemons = 'http://localhost:3000/pokemon'
const pokemonContainerDiv = document.querySelector('#pokemon-container');

function fetchPokemons() { 
  fetch(pokemons)
  .then(response => response.json())
  .then(data => {
    data.forEach(value => {
      const pokemonCardDiv = document.createElement('div');
      pokemonCardDiv.setAttribute('class', 'pokemon-card');
      const pokemonFrameDiv = document.createElement('div');
      pokemonFrameDiv.setAttribute('class', 'pokemon-frame');
      pokemonContainerDiv.appendChild(pokemonCardDiv);
      pokemonCardDiv.appendChild(pokemonFrameDiv).innerHTML = `<h1 class="center-text">${value.name}</h1>`
      const pokemonImageDiv = document.createElement('div');
      pokemonImageDiv.setAttribute('class', 'pokemon-image');
      pokemonFrameDiv.appendChild(pokemonImageDiv);
      const pokemonImg = document.createElement('img');
      pokemonImageDiv.appendChild(pokemonImg);
      pokemonImg.src = `${value.sprites.front}`;
      pokemonImg.setAttribute('class', "toggle-sprite");
      pokemonImg.setAttribute('data-action', "flip");
      pokemonImg.setAttribute('data-id', `${value.id}`);
    });
  });
};

pokemonContainerDiv.addEventListener('click', event => {
  if (event.target.dataset.action === 'flip') {
    const targetPoke = POKEMON.find(pokeObj => pokeObj.id == event.target.dataset.id)
    if (event.target.src === targetPoke.sprites.front) {
      event.target.src = targetPoke.sprites.back
    } else {
      event.target.src = targetPoke.sprites.front
    }
  }
})
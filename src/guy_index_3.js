const pokeContainer = document.getElementById('pokemon-container')
const pokeInput = document.getElementById('pokemon-search-input')

function get_data() {
  fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(data => {
      // Only filter if you need to
      if (pokeInput.value !== ""){
        data = filterPokemon(data)
      }
      // Empty list to avoid duplicates
      pokeContainer.innerHTML = ""
      // insert each pokemon
      data.forEach((pokemon_hash) => insertPokemon(pokemon_hash))
    });
  }

  function filterPokemon(array){
  return array.filter((pokemon_hash) => {
    // keep pokemon if there names have the string in the input
    return pokemon_hash.name.includes(pokeInput.value.toLowerCase())
  })
}

function change_image(id) {
  let El = document.querySelector(`[data-id="${id}"]`);
  fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(data => {
      // Go find that specific pokemon from the database
      // WHY is it double_equals? (This was the bug.)
      pokemon = data.find(pokemon => pokemon.id == id)
        if (El.src.includes("back")) {
        El.src = pokemon.sprites.front
      } else {
        El.src = pokemon.sprites.back
      }
    })
}

function flipcard() {
  imageNode = event.target
  // Get the id from the data-id attribute
  id = event.target.dataset.id
  // just a little error check
  if (id !== undefined){
    change_image(id)
  }
}

function insertPokemon(pokemon){
  pokeContainer.innerHTML += renderPokemon(pokemon)
}

function renderPokemon(pokemon) {
  return `<div class="pokemon-card">
    <div class="pokemon-frame">
      <h1 class="center-text">${pokemon.name}</h1>
      <div class="pokemon-image">
        <img data-id="${pokemon.id}" id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
      </div>
    </div>
  </div>`
}

get_data()

pokeInput.addEventListener("input", get_data)

document.addEventListener("click", flipcard)

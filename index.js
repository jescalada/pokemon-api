let totalNumberOfPokemon = 900; // todo change


function loadPokemonInfo() {

}

function getPokemonInfo() {

}

async function loadPokemonById(pokemonId) {
    const pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`, function (pokemon, status) {

    });
    return pokemon;
}

async function getRandomPokemonData() {
    let pokemonList = [];
    for (i = 0; i < 9; i++) {
        let randomPokemonId = Math.ceil(Math.random() * totalNumberOfPokemon);
        let randomPokemon = await loadPokemonById(randomPokemonId);
        pokemonList[i] = {
            name: randomPokemon['name'],
            sprite: randomPokemon.sprites.other['official-artwork'].front_default
        };
    }
    return pokemonList;
}

displayPokemonOnFront();
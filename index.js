let totalNumberOfPokemon = 900; // todo change

async function displayPokemonOnFront() {
    await getRandomPokemonData().then((randomPokemon) => {
        let grid = `
            <div id="grid">
        `;
        for (row = 0; row < 3; row++) {
            grid += `<div class="row">`;
            for (col = 0; col < 3; col++) {
                index = row * 3 + col;
                grid += `
                    <div class="img-container" onclick="location.href='pokemon.html?id=${randomPokemon[index].id}'">
                        <img src="${randomPokemon[index].sprite}" alt="${randomPokemon[index].name}" style="width:100%">
                    </div> 
                    `;
                }
                grid += `</div>`;
            }
            grid += `</div>`;
            $("main").append(grid);
        }
    );
}

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
            id: randomPokemon['id'],
            name: randomPokemon['name'],
            sprite: randomPokemon.sprites.other['official-artwork'].front_default
        };
    }
    return pokemonList;
}

displayPokemonOnFront();
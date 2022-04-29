async function loadPokemonById(pokemonId) {
    const pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`, function (pokemon, status) {

    });
    return pokemon;
}

async function loadPokemonByName(pokemonName) {
    try {
        const pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`, function (pokemon, status, xhr) {

        });
        return pokemon;
    } catch {
        let result = `
            <p>${pokemonName} does not exist!</p>
        `
        $("#results").html(result);
    }
}

async function loadPokemonListByType(type) {
    const pokemonList = await $.get(`https://pokeapi.co/api/v2/type/${type}/`, function (pokemon, status) {

    });
    return pokemonList;
}

async function loadPokemonListByAbility(ability) {
    const pokemonList = await $.get(`https://pokeapi.co/api/v2/ability/${ability}/`, function (pokemon, status) {

    });
    return pokemonList;
}

function getParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return {
        id: urlParams.get('id'),
        name: urlParams.get('name'),
        type: urlParams.get('type'),
        ability: urlParams.get('ability')
    }
}

async function getPokemonBasicData(name) {
    let pokemon = await loadPokemonByName(name);
    let result = {
        id: pokemon['id'],
        name: pokemon['name'],
        sprite: pokemon.sprites.other['official-artwork'].front_default
    };
    return result;
}

async function searchByName() {
    let name = $("#search-box").val().toLowerCase();
    let pokemon = await getPokemonBasicData(name).then((pokemon) => {
        let grid = `
            <div id="grid">
            `;
        for (row = 0; row < 1; row++) {
            grid += `<div class="row">`;
            for (col = 0; col < 1; col++) {
                index = 0;
                grid += `
            <div class="img-container" onclick="location.href='search.html?id=${pokemon.id}'">
                <img src="${pokemon.sprite}" alt="${pokemon.name}" style="width:100%">
            </div> 
            `;
            }
            grid += `</div>`;
        }
        grid += `</div>`;
        $("#results").html(grid);
    });

}
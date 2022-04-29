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


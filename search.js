async function loadPokemonById(pokemonId) {
    try {
        const pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`, function (pokemon, status) {});
        return pokemon;
    } catch {
        let result = `
            <p>Pokemon #${pokemonId} does not exist!</p>
        `
        $("#results").html(result);
    }
}

async function loadPokemonByName(pokemonName) {
    try {
        const pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`, function (pokemon, status, xhr) {});
        return pokemon;
    } catch {
        let result = `
            <p>${pokemonName} does not exist!</p>
        `
        $("#results").html(result);
    }
}

async function loadPokemonListByType(type) {
    try {
        return await $.get(`https://pokeapi.co/api/v2/type/${type}/`, function (pokemon, status) {});
    } catch {
        let result = `
            <p>Did not find any pokemon of type ${type}.</p>
        `
        $("#results").html(result);
    }
}

async function loadPokemonListByAbility(ability) {
    try {
        return await $.get(`https://pokeapi.co/api/v2/ability/${ability}/`, function (pokemon, status) {});
    } catch {
        let result = `
            <p>Did not find any pokemon with the ability ${ability}.</p>
        `
        $("#results").html(result);
    }
}

// Gets the basic data needed to display a pokemon to the client.
async function getPokemonBasicData(name) {
    let pokemon = await loadPokemonByName(name);
    let result = {
        id: pokemon['id'],
        name: pokemon['name'],
        sprite: pokemon.sprites.other['official-artwork'].front_default
    };
    return result;
}

// Searches a pokemon by name and appends it to the DOM if it exists
async function searchByName() {
    let name = $("#search-box").val().toLowerCase();
    await getPokemonBasicData(name).then((pokemon) => {
        let grid = `
            <div id="grid">
            `;
        for (row = 0; row < 1; row++) {
            grid += `<div class="row">`;
            for (col = 0; col < 1; col++) {
                index = 0;
                grid += `
            <div class="img-container" onclick="location.href='pokemon.html?id=${pokemon.id}'">
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

async function searchByAbility() {
    let ability = $("#search-box").val().toLowerCase().replace(/ /g, "-"); // If the word has spaces, replace them with dashes to match API format
    let resultList = await loadPokemonListByAbility(ability);
    let numberOfResults = resultList.pokemon.length;
    let rows = Math.ceil(numberOfResults / 3);
    let grid = `
        <div id="grid">
        `;
    let index = 0;
    for (row = 0; row < rows; row++) {
        grid += `<div class="row">`;
        for (col = 0; col < 3; col++) {
            if (index >= numberOfResults) {
                break;
            }
            pokemonJSON = resultList.pokemon[index++].pokemon;
            await getPokemonBasicData(pokemonJSON.name).then((pokemon) => {
                grid += `
                <div class="img-container" onclick="location.href='pokemon.html?id=${pokemon.id}'">
                    <img src="${pokemon.sprite}" alt="${pokemon.name}" style="width:100%">
                </div>
                `;
            })
        }
        grid += `</div>`;
    }
    grid += `</div>`;
    $("#results").html(grid);
}

async function searchByType() {
    let type = $("#search-box").val().toLowerCase();
    let resultList = await loadPokemonListByType(type);
    let numberOfResults = resultList.pokemon.length;
    let rows = Math.ceil(numberOfResults / 3);
    let grid = `
        <div id="grid">
        `;
    let index = 0;
    for (row = 0; row < rows; row++) {
        grid += `<div class="row">`;
        for (col = 0; col < 3; col++) {
            if (index >= numberOfResults) {
                break;
            }
            pokemonJSON = resultList.pokemon[index++].pokemon;
            await getPokemonBasicData(pokemonJSON.name).then((pokemon) => {
                grid += `
                <div class="img-container" onclick="location.href='pokemon.html?id=${pokemon.id}'">
                    <img src="${pokemon.sprite}" alt="${pokemon.name}" style="width:100%">
                </div>
                `;
            })
        }
        grid += `</div>`;
    }
    grid += `</div>`;
    $("#results").html(grid);
}
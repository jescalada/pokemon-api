async function loadPokemonById(pokemonId) {
    try {
        const pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`, function (pokemon, status) {});
        return pokemon;
    } catch {
        let info = `
            <p>Pokemon #${pokemonId} does not exist!</p>
        `
        $("main").html(info);
    }
}

// Gets query params
function getIdFromParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

function extractPokemonData(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name,
        abilities: pokemon.abilities,
        types: pokemon.types,
        stats: pokemon.stats,
        sprite: pokemon.sprites.other['official-artwork'].front_default,
    }
}

async function displayPokemon() {
    let pokemonId = getIdFromParams();
    await loadPokemonById(pokemonId).then((pokemon) => {
        pokemon = extractPokemonData(pokemon);
        let info = `
        <div id="info">
            <div class="row">
                <div class="col pokemon-name">
                    <h1>${pokemon.name.toUpperCase()}</h1>
                </div>
            </div>
`
        info += `<div class="row">`
        pokemon.types.forEach(type => {
            info += `
            <div class="col pokemon-type">
                <h2>${type.type.name.toUpperCase()}</h2>
            </div>
            `
        });
        info += `</div>`

        info += `
            <div class="row">
                <div class="info-container">
                    <img src="${pokemon.sprite}" alt="${pokemon.name}" style="width:100%">
                </div>
            </div>`

        info += `<div class="row">`

        pokemon.stats.forEach(stat => {
            let splitName = stat.stat.name.split('-');
            info += `
            <div class="col pokemon-stat">
                <p>${stat.base_stat} ${
                    splitName.length > 1 ? splitName[0].substr(0, 2).toUpperCase() + splitName[1].substr(0, 1).toUpperCase() : splitName[0].substr(0, 3).toUpperCase()
                }</p>
            </div>
            `;
        });
        
        info += `</div>`
        $("main").html(info);
    });
}

displayPokemon();
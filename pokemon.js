async function loadPokemonById(pokemonId) {
    try {
        const pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`, function (pokemon, status) {
        });
        return pokemon;
    } catch {
        let info = `
            <p>Pokemon #${pokemonId} does not exist!</p>
        `
        $("#info").html(info);
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
        base_stats: pokemon.stats,
        sprite: pokemon.sprites.other['official-artwork'].front_default
    }
}

async function displayPokemon() {
    let pokemonId = getIdFromParams();
    await loadPokemonById(pokemonId).then((pokemon) => {
        let info = `
        <div id="info">
            <div class="row">
                <div class="col pokemon-name">
                    <h1>${pokemon.name}</h1>
                </div>
            </div>

            <div class="row">
                <div class="col pokemon-type">
                    <h2>Normal</h2>
                </div>
                <div class="col pokemon-type">
                    <h2>Fairy</h2>
                </div>    
            </div>
            <div class="row">
                <div class="img-container">
                    <img src="${pokemon.sprite}" alt="${pokemon.name}" style="width:100%">
                </div>
            </div>
            <div class="row">
                <div class="col pokemon-stat">
                    <p>HP: 50</p>
                </div>
                
                <div class="col pokemon-stat">
                    <p>HP: 50</p>
                </div>
                
                <div class="col pokemon-stat">
                    <p>HP: 50</p>
                </div>
                
                <div class="col pokemon-stat">
                    <p>HP: 50</p>
                </div>
            </div>
        </div>
        `;
        $("main").html(info);
    });
}

displayPokemon();
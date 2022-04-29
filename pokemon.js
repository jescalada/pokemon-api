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
        pokemon
        let grid = ``;
        // for (row = 0; row < 3; row++) {
        //     grid += `<div class="row">`;
        //     for (col = 0; col < 3; col++) {
        //         index = row * 3 + col;
        //         grid += `
        //             <div class="info-container">
        //                 <h2> Name </h2>
        //                 <p> ${pokemon.name} </p>
        //             </div> 
        //             `;
        //         }
        //         grid += `</div>`;
        //     }
        //     grid += `</div>`;
        //     $("main").append(grid);
    });
}

displayPokemon();
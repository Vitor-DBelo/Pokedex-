const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    pokemon.type = types[0]; // Tipo principal

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokeDetail) => convertPokeApiDetailToPokemon(pokeDetail));
};

pokeApi.getPokemons = (offset, limit ) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) // Obtem a lista de Pokémon
        .then((pokemons) => 
            Promise.all(pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon)))
        ) // Busca os detalhes de cada Pokémon
        .catch((error) => console.error('Erro ao obter Pokémon:', error));
};

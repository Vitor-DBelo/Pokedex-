const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail, pokeSpecies) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    pokemon.type = types[0]; // Tipo principal

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    // Obtendo o nome japonês do Pokémon
    const japaneseName = pokeSpecies.names.find((name) => name.language.name === 'ja');
    pokemon.japaneseName = japaneseName ? japaneseName.name : 'N/A';

    return pokemon;
}

pokeApi.getPokemonSpecies = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        .then((response) => response.json())
        .catch((error) => console.error('Erro ao obter dados de espécies do Pokémon:', error));
};

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokeDetail) => {
            // Busca as informações da espécie do Pokémon para obter o nome japonês
            return pokeApi.getPokemonSpecies(pokeDetail.id)
                .then((pokeSpecies) => convertPokeApiDetailToPokemon(pokeDetail, pokeSpecies));
        });
};

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) // Obtém a lista de Pokémon
        .then((pokemons) =>
            Promise.all(pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon)))
        ) // Busca os detalhes de cada Pokémon
        .catch((error) => console.error('Erro ao obter Pokémon:', error));
};

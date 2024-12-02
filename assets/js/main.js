//const MaxPokemon = 151;

let offset = 0;
const limit = 30;

const pokemonList = document.getElementById('pokemonList');
const LoadMoreButton = document.getElementById('LoadMore');



function LoadPokemonIten(offset, limit){
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {     // Usando "+=" adicionamos o novo conteúdo HTML ao existente, enquanto "=" sobrescreve todo o conteúdo anterior
        pokemonList.innerHTML += pokemons.map((pokemon) => `       
            <li class="pokemon ${pokemon.type}"> 
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
    })

    .catch((error) => console.error('Erro ao carregar Pokémon:', error));

    //pokeApi.getPokemons().then((pokemons = []) => {
    //    const newHtml = pokemons.map(convertPokemonToLi).join('');
    //    pokemonList.innerHTML += newHtml;
    //});
    
}
LoadMoreButton.addEventListener('click', () => {
    offset += limit;
    LoadPokemonIten(offset, limit)
    //const qtdRecordsNexPag = offset + limit;    if para adicionar limit
//
    //if(qtdRecordsNexPag >= MaxPokemon){
    //    const newLimit = MaxPokemon - offset;
    //    LoadPokemonIten(offset, newLimit)
//
    //    LoadMoreButton.parentElement.removeChild(LoadMoreButton);
    //}else{
    //    LoadPokemonIten(offset, limit)
    //}
    
})

LoadPokemonIten(offset, limit);
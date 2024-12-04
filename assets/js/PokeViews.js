const urlPoke = window.location.href;
const urlParams = new URL(urlPoke);
const id = urlParams.searchParams.get('id'); // Captura o ID da URL
const pokeview = document.getElementById('pokeview');

// Função para carregar os Pokémons
async function loadPokemons() {
    try {
        // Supondo que você tenha um método para pegar os Pokémons (pokeApi.getPokemons)
        const pokemons = await pokeApi.getPokemons(0,779); // Ajuste o offset/limit conforme necessário
        console.log("Pokemons carregados:", pokemons);

        // Encontra o Pokémon com o ID da URL
        const pokemon = pokemons.find((poke) => poke.number == id); // Compara o número do Pokémon com o ID da URL

        if (pokemon) {
            // Adiciona a classe do tipo do Pokémon ao body
            document.body.classList.add(pokemon.type.toLowerCase()); // Adiciona a classe com o tipo (em minúsculo)

            // Exibe as informações do Pokémon
            pokeview.innerHTML = `
                <div class="pokemondie">
                    <span class="name-pokemon">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <ol class="Top-pag-types">
                    ${pokemon.types.map((type) => `<li class="types ${type.toLowerCase()}">${type}</li>`).join('')}
                </ol>
                <span class="name-japones">${pokemon.japaneseName || "N/A"}</span>
                <img class="poke-img" src="${pokemon.photo}" alt="${pokemon.name}">
            `;
        } else {
            // Caso o Pokémon não seja encontrado
            pokeview.innerHTML = `<p>Pokémon não encontrado!</p>`;
        }
    } catch (error) {
        console.error("Erro ao carregar Pokémons:", error);
        pokeview.innerHTML = `<p>Erro ao carregar dados do Pokémon.</p>`;
    }
}

// Chama a função para carregar os pokémons
loadPokemons();

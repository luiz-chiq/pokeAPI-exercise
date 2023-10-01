import PokemonCard from './PokemonCard/PokemonCard.js'
import './style.css'

function PokemonList(pokemonData){


    const pokemonArray = Object.values(pokemonData);

    return(
        <div className="pokemon-list">
            {pokemonArray[0].map((pokemon, index) => (
                <PokemonCard
                key={index}
                name={pokemon.name}
                nickName={pokemon.nickName}
                types={pokemon.types}
                imageUrl={pokemon.imageUrl}
                />
            ))}
        </div>
    )
}

export default PokemonList
function PokemonCard({key, name, nickName, types, imageUrl}) {
    return(
        <div class="pokemon-card">
            <h2>{name}</h2>
            <p>Apelido: {nickName}</p>
            <p>Tipo: {types}</p>
            <img src={imageUrl} alt="pokemon"/>
        </div>
    )
}

export default PokemonCard
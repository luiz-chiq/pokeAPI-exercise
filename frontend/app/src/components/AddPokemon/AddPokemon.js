import { useState, useEffect } from "react"
import axios from 'axios'
// import unknowPokemon from './qualPokemon.jpg'
import './style.css'

function AddPokemon({addPokemon}) {

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [types, setTypes] = useState('');


    const handlePokemon = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3004/addPokemon', {
                name,
                nickName,
                types,
                imageUrl
            });

            if (response.status === 200) {
                console.log('Cadastro do pokemon bem-sucedido!');
                addPokemon({name,
                    nickName,
                    types,
                    imageUrl});
            } else {
                console.log('Falha ao fazer cadastro.');
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
        }
    };

    useEffect(() => {
        // setImageUrl(unknowPokemon)
        setTypes('')
        axios.get('https://pokeapi.co/api/v2/pokemon/' + name).
        then(response => {
            setImageUrl(response.data.sprites.front_default);
            const types = response.data.types;
            const typeNames = types.map(type => type.type.name);
            const typeString = typeNames.join(', ');
            setTypes(typeString);
        }).
        catch(response => {});
    },[name]);



    return (
        <div>
        <h2>Formulário do pokemon</h2>
        <form>
            <div>
                <label>Nome do pokemon:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Apelido do pokemon:</label>
                <input
                    type="text"
                    name="name"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Tipo: {types}</label>
            </div>
            <div>
                <img src={imageUrl} alt="Pokemon selecionado"/>
            </div>
            <button
                type="submit"
                className='btn-login' 
                onClick={(e) => handlePokemon(e)}
            >Entrar</button>
        </form>
      </div>
    )
}

export default AddPokemon
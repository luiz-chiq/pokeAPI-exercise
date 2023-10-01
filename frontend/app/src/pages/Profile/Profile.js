import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import AddPokemon from '../../components/AddPokemon/AddPokemon'
import PokemonList from '../../components/PokemonList/PokemonList'
import axios from 'axios';


function Profile() {

    const [logged, setLogged] = useState(false)
    const [pokemonData, setPokemonData] = useState()

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/');
    };

    const authorized = async () => {
        try {
            const response = await axios.get('http://localhost:3004/profile');
            if (response.status === 200) {
                setLogged(true)
            }
        } catch (error) {
            console.error('Erro ao logar:', error);
        }
    };

    const getPokemons = async () => {
        try {
            const response = await axios.get('http://localhost:3004/getUserPokemons');
            if (response.status === 200) {
                setPokemonData(response.data)
            }
        } catch (error) {
            console.error('Erro ao logar:', error);
        }
    };

    const addPokemonToList = (newPokemon) => {
        setPokemonData([...pokemonData, newPokemon]);
      };

    useEffect(() => {
        authorized();
        getPokemons();
      }, []);

    return (
        <div>

        {logged ? (
            <div>
                <PokemonList pokemonData={pokemonData}/>
                <AddPokemon addPokemon={addPokemonToList}/>
            </div>
            ) : (   
            <>
                <p>Sem usuario logado</p>
                <button
                type="submit"
                className='btn-login' 
                onClick={(e) => navigateToLogin()}
                >Fazer login</button>
            </>
              )}  
        </div>
        
    )
}

export default Profile
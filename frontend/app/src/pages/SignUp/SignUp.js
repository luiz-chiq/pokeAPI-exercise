
import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const navigateToLogin = () => {
        navigate('/');
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3004/signup', {
                email,
                name,
                password
            });

            if (response.status === 200) {
                console.log('Cadastro bem-sucedido!');
                navigateToProfile()
            } else {
                console.log('Falha ao fazer cadastro.');
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
        }
    };


    return (
        <div>
        <h2>Formulário de Cadastro</h2>
        <form>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    name="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className='btn-login' 
                onClick={(e) => handleSignUp(e)}
            >Cadastrar</button>
        </form>
        <button
                type="submit"
                className='btn-login' 
                onClick={(e) => navigateToLogin()}
        >Já tenho login</button>
      </div>

    )
}

export default SignUp
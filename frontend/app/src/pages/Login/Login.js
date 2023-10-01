
import { useState } from "react"
import axios from 'axios'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3004/login', {
                email,
                password
            });

            if (response.status === 200) {
                console.log(response.data);
                console.log('Login bem-sucedido!');
            } else {
                console.log('Falha ao fazer login.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const aaaa = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.get('http://localhost:3004/perfil');
            
            if (response.status === 200) {
                console.log('Requisição bem-sucedida');
                console.log(response.data);
            } else {
                console.error('Requisição mal-sucedida com status:', response.status);
            }
        } catch (error) {
            console.log("b", error);
        }
    }
        



    return (
        <div>
        <h2>Formulário de Login</h2>
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
                onClick={(e) => handleLogin(e)}
            >Entrar</button>
        </form>
        <form>
            <button
            type="submit"
                className='btn-login' 
                onClick={(e) => aaaa(e)}
            > aaaa </button>
        </form>
      </div>
    )
}

export default Login
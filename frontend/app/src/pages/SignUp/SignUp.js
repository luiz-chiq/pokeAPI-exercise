
import { useState } from "react"
import axios from 'axios'

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            console.log("A")
            const response = await axios.post('http://localhost:3004/signup', {
                email,
                name,
                password
            });
            console.log(response.status)

            if (response.status === 200) {
                console.log(response.data);
                console.log('Cadastro bem-sucedido!');
            } else {
                console.log('Falha ao fazer cadastro.');
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
        }
    };

    const aaaa = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.get('http://localhost:3004/getUsers');
            
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
            >Entrar</button>
        </form>
        <form>
        <button
                type="submit"
                className='btn-login' 
                onClick={(e) => aaaa(e)}
            >aaa</button>
        </form>
      </div>

    )
}

export default SignUp
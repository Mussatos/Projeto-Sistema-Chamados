import { useState } from "react"
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/firebaseConnection";

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function cadastrarUsuario(e) {
        e.preventDefault();

        if(name !== '' && email !== '' && password !== ''){

        }
        await createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="logo do sistema" />
                </div>

                <form onSubmit={cadastrarUsuario}>

                    <h1>Nova conta</h1>

                    <input type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <input type="text"
                        placeholder="email@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password"
                        placeholder="******" value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Cadastrar</button>

                </form>
                    <Link to='/'>Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}
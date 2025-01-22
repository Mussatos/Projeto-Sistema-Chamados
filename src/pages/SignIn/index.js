import { useState } from "react"
import { Link } from "react-router-dom";
import './signin.css';
import logo from '../../assets/logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/firebaseConnection";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function logarUsuario(e) {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{

        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="logo do sistema" />
                </div>

                <form onSubmit={logarUsuario}>

                    <h1>Entrar</h1>

                    <input type="text"
                        placeholder="email@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password"
                        placeholder="******" value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Acessar</button>

                </form>
                    <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>
    )
}
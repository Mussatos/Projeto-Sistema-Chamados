import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import './signin.css';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';
import { toast } from "react-toastify";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);

    async function logarUsuario(e) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            await signIn(email, password);
        }
        else{
            toast.error('Preencha todos os campos!')
        }
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

                    <button type="submit">
                        {
                            loadingAuth ? 'Carregando...'
                            : 'Acessar'
                        }
                    </button>

                </form>
                <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>
    )
}
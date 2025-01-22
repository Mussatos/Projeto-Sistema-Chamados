import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function cadastrarUsuario(e) {
        e.preventDefault();
        if (name !== '' && email !== '' && password !== '') {
            await signUp(name, email, password);
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

                    <button type="submit">
                        {
                            loadingAuth ? 'Carregando...'
                                : 'Cadastrar'
                        }
                    </button>


                </form>
                <Link to='/'>Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}
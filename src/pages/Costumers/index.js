import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';


export default function Costumers() {

    const { logout } = useContext(AuthContext);

    async function sairLogin() {
        await logout();
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Usuários'>
                    <FiUser size={25} />
                </Title>
                
            </div>

            <button onClick={sairLogin}>Sair da conta</button>
        </div>
    )
}
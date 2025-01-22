import './dashboard.css'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiCloud } from 'react-icons/fi';

export default function Dashboard() {

    const { logout } = useContext(AuthContext);

    async function sairLogin() {
        await logout();
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Atendimentos'>
                    <FiCloud size={25}/>
                </Title>
            </div>

            <button onClick={sairLogin}>Sair da conta</button>
        </div>
    )
}
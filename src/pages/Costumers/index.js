import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiEdit } from 'react-icons/fi';
import './costumers.css';

export default function Costumers() {

    const { logout } = useContext(AuthContext);

    async function sairLogin() {
        await logout();
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Novo cliente'>
                    <FiEdit size={25} />
                </Title>

                <div className='container'>

                    <form className='form-profile'>
                        <label>Nome do Cliente</label>
                        <input placeholder='Nome da empresa' type='text'/>
                        <label>CNPJ</label>
                        <input placeholder='20.031.219/0002-46' type='text'/>
                        <label>Endereço</label>
                        <input placeholder='Endereço da empresa' type='text'/>

                        <button className='btn-salvar'>Salvar</button>
                    </form>

                </div>
                
            </div>

            <button onClick={sairLogin}>Sair da conta</button>
        </div>
    )
}
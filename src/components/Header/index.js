import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom'
import avatarImg from '../../assets/avatar.png'
import { FiHome, FiUser, FiSettings, FiList } from 'react-icons/fi'

import './header.css'


export default function Header(){

    const { user } = useContext(AuthContext);

    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="foto do usuário"/>
            </div>

            <Link to='/dashboard'>
                <FiHome color='#FFF' size={24}/>
                Chamados
            </Link>

            <Link to='/costumers'>
                <FiUser color='#FFF' size={24}/>
                Clientes
            </Link>

            <Link to='/history'>
                <FiList color='#FFF' size={24}/>
                Histórico de chamados
            </Link>

            <Link to='/profile'>
                <FiSettings color='#FFF' size={24}/>
                Perfil
            </Link>


        </div>
    );
}
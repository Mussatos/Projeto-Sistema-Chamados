import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import Title from '../../components/Title';
import './profile.css';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png'


export default function Profile() {

    const { logout, user } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    async function sairLogin() {
        await logout();
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>
                <div className='container'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>

                            <input type='file' accept='image/*' /> <br />
                            {
                                avatarUrl === null ? (
                                    <img src={avatar} alt='foto de perfil' width={250} height={250} />
                                ) : (
                                    <img src={avatarUrl} alt='foto de perfil' width={250} height={250} />
                                )
                            }

                        </label>

                        <label>Nome</label>
                        <input type='text' placeholder='seu nome'/>

                        <label>Email</label>
                        <input type='text' placeholder='teste@teste.com' disabled={true}/>
                    </form>
                </div>
            </div>

            <button onClick={sairLogin}>Sair da conta</button>
        </div>
    )
}
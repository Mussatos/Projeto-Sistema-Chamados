import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header';
import Title from '../../components/Title';

import './profile.css';

import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png'

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

import { toast } from 'react-toastify'

export default function Profile() {

    const { logout, user, storageUser, setUser } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    const [nomeUser, setNomeUser] = useState(user && user.nome);
    const [emailUser, setEmailUser] = useState(user && user.email);

    function trocarFoto(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image.png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                alert('envie uma imagem do tipo PNG ou JPEG')
                setImageAvatar(null)
                return;
            }
        }
    }


    async function enviarInfos(e){
        e.preventDefault();
        
        if(imageAvatar === null && nomeUser !== ''){
            //Atualizar apenas o nome
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef,{
                nome: nomeUser
           }) 
           .then(()=>{
                let data = {
                    ...user, 
                    nome: nomeUser
                }
                setUser(data);
                storageUser(data);
                toast.success("Atualizado com sucesso!");
           })
           .catch((err)=>{
                toast.error('Algo deu errado com a troca do nome!');
           })
        }else if(imageAvatar !== null && nomeUser !== ''){
            //Atualizar as duas informações
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                nome: nomeUser
            })
            .then(()=>{
                let data = {
                    ...user,
                    nome: nomeUser,
                    avatarUrl: null //Não tem como mudar a foto porque o firebase está cobrando pelo serviço de Storage
                }
                setUser(data)
                storageUser(data)
                toast.success("Atualizado com sucesso!");
            })
            .catch((err) => {
                toast.error("Algo deu errado com a troca das informações!");
            })
        }
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={enviarInfos}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>

                            <input type='file' accept='image/*' onChange={trocarFoto} /> <br />
                            {
                                avatarUrl === null ? (
                                    <img src={avatar} alt='foto de perfil' width={250} height={250} />
                                ) : (
                                    <img src={avatarUrl} alt='foto de perfil' width={250} height={250} />
                                )
                            }

                        </label>

                        <label>Nome</label>
                        <input type='text'
                            value={nomeUser}
                            onChange={(e) => setNomeUser(e.target.value)} />

                        <label>Email</label>
                        <input type='text'
                            disabled={true}
                            value={emailUser} />

                        <button type='submit'>Salvar</button>
                    </form>

                </div>
                <div className='container'>
                    <button className='logout-btn' onClick={() => logout()}>Sair</button>
                </div>
            </div>

        </div>
    )
}
import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';

export default function Costumers() {

    const [nomeCliente, setNomeCliente] = useState('');
    const [cnpjCliente, setCnpjCliente] = useState('');
    const [enderecoCliente, setEnderecoCliente] = useState('');


    async function createClient(e) {
        e.preventDefault();
        if (nomeCliente !== '' && cnpjCliente !== '' && enderecoCliente !== '') {
            await addDoc(collection(db, 'costumers'), {
                nomeCliente: nomeCliente,
                cnpjCliente: cnpjCliente,
                enderecoCliente: enderecoCliente
            })
                .then(() => {
                    setNomeCliente('');
                    setCnpjCliente('');
                    setEnderecoCliente('');
                    toast.success('Cliente cadastrado com sucesso!');
                })
                .catch((err) => {
                    toast.error("Ops, algo deu errado!");
                })
        }else{
            toast.error("Preencha todas as informações!");
        }
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Novo cliente'>
                    <FiUser size={25} />
                </Title>

                <div className='container'>

                    <form className='form-profile' onSubmit={createClient}>
                        <label>Nome fantasia</label>
                        <input placeholder='Nome da empresa'
                            type='text' value={nomeCliente}
                            onChange={(e) => setNomeCliente(e.target.value)} />

                        <label>CNPJ</label>
                        <input placeholder='Digite o CNPJ'
                            type='text'
                            value={cnpjCliente}
                            onChange={(e) => setCnpjCliente(e.target.value)} />

                        <label>Endereço</label>
                        <input placeholder='Endereço da empresa'
                            type='text'
                            value={enderecoCliente}
                            onChange={(e) => setEnderecoCliente(e.target.value)} />

                        <button type='submit'>Salvar</button>
                    </form>

                </div>

            </div>

        </div>
    )
}
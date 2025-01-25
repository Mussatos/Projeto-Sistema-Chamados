import { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';
import { db } from '../../services/firebaseConnection';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { FiPlusCircle } from 'react-icons/fi';
import './new.css';
import {AuthContext} from '../../contexts/auth';

const listRef = collection(db, 'costumers');

export default function New() {

    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    useEffect(()=>{
        async function loadCustomers(){
            const querySnapshot = await getDocs(listRef)
            .then((snapshot)=>{
                let lista = [];
                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nomeCliente: doc.data().nomeCliente,
                    })
                })
                if(snapshot.docs.size === 0){
                    console.log("Nenhuma empresa encontrada!")
                    setCustomers([ { id: '1', nomeCliente: "FREELA" }]);
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);
            })
            .catch((err)=>{
                console.log(err)
                setLoadCustomers(false);
                setCustomers([ { id: '1', nomeCliente: "FREELA" }]);
            })
        }
        loadCustomers();
    }, [])

    function trocarStatus(e) {
        setStatus(e.target.value);
    }

    function trocarAssunto(e){
        setAssunto(e.target.value);
    }

    function trocaCliente(e){
        setCustomerSelected(e.target.value);
    }

    async function registerCall(e) {
        e.preventDefault();
        await addDoc(collection(db, 'chamados'), {
            dataCriacao: new Date(),
            cliente: customers[customerSelected].nomeCliente,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(()=>{
            toast.success("Chamado registrado!");
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((err)=>{
            toast.error("Ops erro ao registrar, tente mais tarde!");
            console.log(err);
        })
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Novo chamado'>
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={registerCall}>

                        <label>Clientes</label>
                        {
                            loadCustomers ? (
                                <input type='text' disabled={true} value="Carregando..."/>
                            ) : (
                                <select value={customerSelected} onChange={trocaCliente}>
                                    {
                                        customers.map((item, index)=>{
                                            return(
                                                <option key={index} value={index}>
                                                    {item.nomeCliente}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            )
                        }

                        <label>Assunto</label>
                        <select value={assunto} onChange={trocarAssunto}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita técnica'>Visita técnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>

                            <input type='radio'
                                name='radio'
                                value="Aberto"
                                onChange={trocarStatus}
                                checked={status === 'Aberto'} />
                            <span>Em aberto</span>

                            <input type='radio'
                                name='radio'
                                value="Progresso"
                                onChange={trocarStatus}
                                checked={status === 'Progresso'} />
                            <span>Progresso</span>

                            <input type='radio'
                                name='radio'
                                value="Atendido"
                                onChange={trocarStatus}
                                checked={status === 'Atendido'} />
                            <span>Atendido</span>

                        </div>


                        <label>Complemento</label>
                        <textarea type="text"
                            placeholder='Descreva seu problema (opcional).'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type='submit'>Registrar</button>

                    </form>
                </div>

            </div>

        </div>
    )
}
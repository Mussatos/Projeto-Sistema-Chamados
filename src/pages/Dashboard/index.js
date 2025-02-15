import './dashboard.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlus, FiMessageCircle, FiSearch, FiEdit2, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, startAfter, query, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Modal from '../../components/Modal';


const docRef = collection(db, 'chamados');

export default function Dashboard() {

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);

    const [listaVazia, setListaVazia] = useState(false);
    const [ultimoDoc, setUltimoDoc] = useState();
    const [loadingMore, setLoadingMore] = useState(true);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailClient, setDetailClient] = useState();

    useEffect(() => {
        async function loadChamados() {
            const q = query(docRef, orderBy('dataCriacao', 'desc'), limit(5));

            const querySnapshot = await getDocs(q);
            setChamados([]) //Para evitar duplicidade do useEffect rodar 2x -> Retirar o 'React.StrictMode' 
            // do index.js ou zerar o vetor setChamados antes de atualizar
            await atualizarEstado(querySnapshot); //Bom relembrar que o StrictMode nao roda em prod, apenas em ambiente de desenvolvimento

            setLoading(false);

        };
        loadChamados();

        return () => { }
    }, [])

    async function atualizarEstado(querySnapshot) {

        const chamadosVazios = querySnapshot.size === 0;

        if (!chamadosVazios) {
            let lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nomeCliente: doc.data().cliente,
                    assunto: doc.data().assunto,
                    status: doc.data().status,
                    dataFormatada: format(doc.data().dataCriacao.toDate(), 'dd/MM/yyyy'),
                    dataCriacao: doc.data().dataCriacao.toDate(),
                    clientId: doc.data().clienteId,
                    complemento: doc.data().complemento
                })
            })

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            setChamados(chamados => [...chamados, ...lista])
            setUltimoDoc(lastDoc);

        } else {
            setListaVazia(true);
        }

        setLoadingMore(false);
    }

    async function maisChamados() {
        setLoadingMore(true)

        const q = query(docRef, orderBy('dataCriacao', 'desc'), startAfter(ultimoDoc), limit(5));

        const querySnapshot = await getDocs(q);
        await atualizarEstado(querySnapshot);
    }

    function openModal(item) {
        setModalIsOpen(!modalIsOpen);
        setDetailClient(item);
    }

    async function concluirChamado(id, nomeCliente, assunto, complemento, clienteId) {
        const docRef = doc(db, 'chamados', id);
        try {
            await addDoc(collection(db, 'historico'), {
                dataConclusao: new Date(),
                id: id,
                status: 'Fechado',
                assunto: assunto,
                complemento: complemento,
                nomeCliente: nomeCliente,
                clienteId: clienteId
            })
            await deleteDoc(docRef);
            window.location.reload();
        }
        catch(error){
            console.log(error);
        }
        
    }

    if (loading) {
        return (
            <div>
                <Header />

                <div className='content'>
                    <Title name='Tickets'>
                        <FiMessageCircle size={25} />
                    </Title>

                    <div className='container dashboard'>
                        <span>
                            Buscando chamados...
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Atendimentos'>
                    <FiMessageCircle size={25} />
                </Title>

                <> {/* Fragment > é igual um div, porem não tem estilização */}
                    {
                        chamados.length === 0 ? (
                            <div className='container dashboard'>
                                <span>Nenhum chamado encontrado...</span>
                                <Link className='new' to='/new'>
                                    <FiPlus color='#FFF' size={25} />
                                    Novo chamado
                                </Link>

                            </div>
                        ) : (
                            <>
                                <Link className='new' to='/new'>
                                    <FiPlus color='#FFF' size={25} />
                                    Novo chamado
                                </Link>

                                <table>
                                    <thead>
                                        <tr>

                                            <th scope='col'>Cliente</th>
                                            <th scope='col'>Assunto</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Cadastrado em</th>
                                            <th scope='col'>#</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chamados.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td data-label="Cliente">{item.nomeCliente}</td>
                                                    <td data-label="Assunto">{item.assunto}</td>
                                                    <td data-label="Status">

                                                        <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#83bf02' : '#999' }}>
                                                            {item.status}
                                                        </span>

                                                    </td>

                                                    <td data-label="Cadastrado">{item.dataFormatada}</td>


                                                    <td data-label="#">

                                                        <button className='action'
                                                            style={{ backgroundColor: '#3583f6' }}
                                                            onClick={() => openModal(item)}>
                                                            <FiSearch color='#FFF' size={17}>

                                                            </FiSearch>
                                                        </button>
                                                        <Link to={`/new/${item.id}`} className='action' style={{ backgroundColor: '#f6a935' }}>
                                                            <FiEdit2 color='#FFF' size={17} />
                                                        </Link>

                                                        <button className='action'
                                                            onClick={() => concluirChamado(item.id, item.nomeCliente, 
                                                                item.assunto, item.complemento, item.clientId)}
                                                            style={{ backgroundColor: '#f65835' }}>
                                                            <FiX color='#FFF' size={17} />
                                                        </button>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                        }
                                    </tbody>
                                </table>

                                {
                                    loadingMore && <h3 className='h3-more'>Buscando mais chamados...</h3>
                                }
                                {
                                    !loadingMore && !listaVazia && <button className='btn-more' onClick={maisChamados}>Buscar mais</button>
                                }

                            </>
                        )
                    }
                </>
            </div>

            {
                modalIsOpen && (
                    <Modal
                        conteudo={detailClient}
                        close={() => setModalIsOpen(!modalIsOpen)}
                    />
                )
            }
        </div>
    )
}
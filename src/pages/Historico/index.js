import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlus, FiMessageCircle, FiSearch, FiList } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, startAfter, query, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Modal from '../../components/Modal';

const docRef = collection(db, 'historico');

export default function Historico() {

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);

    const [listaVazia, setListaVazia] = useState(false);
    const [ultimoDoc, setUltimoDoc] = useState();
    const [loadingMore, setLoadingMore] = useState(true);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailClient, setDetailClient] = useState();

    useEffect(() => {
        async function loadChamados() {
            const q = query(docRef, orderBy('dataConclusao', 'desc'), limit(5));

            const querySnapshot = await getDocs(q);
            setChamados([])

            await atualizarEstado(querySnapshot);

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
                    nomeCliente: doc.data().nomeCliente,
                    assunto: doc.data().assunto,
                    status: doc.data().status,
                    dataFormatada: format(doc.data().dataConclusao.toDate(), 'dd/MM/yyyy'),
                    dataConclusao: doc.data().dataConclusao.toDate(),
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

        const q = query(docRef, orderBy('dataConclusao', 'desc'), startAfter(ultimoDoc), limit(5));

        const querySnapshot = await getDocs(q);
        await atualizarEstado(querySnapshot);
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

    function openModal(item) {
        setModalIsOpen(!modalIsOpen);
        setDetailClient(item);
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Histórico'>
                    <FiList size={25} />
                </Title>

                <>
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
                                <table>
                                    <thead>
                                        <tr>

                                            <th scope='col'>Cliente</th>
                                            <th scope='col'>Assunto</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Finalizado em</th>
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

                                                        <span className='badge' style={{ backgroundColor: '#999' }}>
                                                            Fechado
                                                        </span>

                                                    </td>

                                                    <td data-label="Cadastrado">{item.dataFormatada}</td>

                                                    <td data-label="#">

                                                        <button className='action'
                                                            style={{ backgroundColor: '#3583f6' }}
                                                            onClick={() => openModal(item)}>
                                                            <FiSearch color='#FFF' size={17} />
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
    );
}
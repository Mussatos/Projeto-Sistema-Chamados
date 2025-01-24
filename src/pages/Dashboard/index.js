import './dashboard.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlus, FiMessageCircle, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom'

export default function Dashboard() {

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Atendimentos'>
                    <FiMessageCircle size={25} />
                </Title>

                <> {/* Fragment > é igual um div, porem não tem estilização */}
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
                            <tr>
                                <td data-label="Cliente">Mercado esquina</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                    <span className='badge' style={{ backgroundColor: '#999' }}>
                                        Em aberto
                                    </span>
                                </td>
                                <td data-label="Cadastrado">23/01/2023</td>
                                <td data-label="#">
                                    <button className='action' style={{ backgroundColor: '#3583f6' }}>
                                        <FiSearch color='#FFF' size={17}>
                                            
                                        </FiSearch>
                                    </button>
                                    <button className='action' style={{ backgroundColor: '#f6a935' }}>
                                        <FiEdit2 color='#FFF' size={17} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>
        </div>
    )
}
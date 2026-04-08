/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react'
import styles from './AgendamentoList.module.css'
import { listarAgendamentos, atualizarAgendamento, deletarAgendamento, criarAgendamento } from '../../services/agendamentoService'

function AgendamentoList() {
  const [agendamentos, setAgendamentos] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [form, setForm] = useState({ cliente: '', funcionario: '', servico: '', data: '', status: 'agendado' })

  useEffect(() => {
    (async () => {
      await carregarAgendamentos()
    })()
  }, [])

  async function carregarAgendamentos() {
    try {
      const dados = await listarAgendamentos()
      setAgendamentos(dados)
    } catch (err) {
      console.error('Erro ao carregar agendamentos:', err)
    }
  }

  async function handleCancelar(id) {
    await atualizarAgendamento(id, { status: 'cancelado' })
    carregarAgendamentos()
  }

  async function handleConfirmar(id) {
    await atualizarAgendamento(id, { status: 'confirmado' })
    carregarAgendamentos()
  }

  async function handleDeletar(id) {
    if (window.confirm('Deseja deletar este agendamento?')) {
      try {
        await deletarAgendamento(id)
        await carregarAgendamentos()
      } catch (err) {
        console.error('Erro ao deletar agendamento:', err)
      }
    }
  }

  async function handleSalvar() {
    await criarAgendamento(form)
    setModalAberto(false)
    setForm({ cliente: '', funcionario: '', servico: '', data: '', status: 'agendado' })
    carregarAgendamentos()
  }

  const agendamentosFiltrados = agendamentos
    .filter(a => filtro === 'todos' || a.status === filtro)
    .filter(a => {
      const termo = busca.toLowerCase()
      return (
        a.cliente?.nome?.toLowerCase().includes(termo) ||
        a.servico?.nome?.toLowerCase().includes(termo)
      )
    })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Agendamentos</h1>
        <p className={styles.subtitulo}>Gerencie todos os agendamentos</p>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <span className={styles.cardTitulo}>Lista de Agendamentos</span>
          <div className={styles.toolbarDireita}>
            <input
              type="text"
              placeholder="Buscar cliente ou serviço..."
              className={styles.busca}
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
            <button className={`${styles.filtroBtn} ${filtro === 'todos' ? styles.ativo : ''}`} onClick={() => setFiltro('todos')}>Todos</button>
            <button className={`${styles.filtroBtn} ${filtro === 'confirmado' ? styles.ativo : ''}`} onClick={() => setFiltro('confirmado')}>Confirmados</button>
            <button className={`${styles.filtroBtn} ${filtro === 'agendado' ? styles.ativo : ''}`} onClick={() => setFiltro('agendado')}>Pendentes</button>
            <button className={styles.btnNovo} onClick={() => setModalAberto(true)}>+ Novo Agendamento</button>
          </div>
        </div>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
                  Nenhum agendamento encontrado
                </td>
              </tr>
            ) : (
              agendamentosFiltrados.map((a) => (
                <tr key={a._id}>
                  <td>{a.cliente?.nome || '-'}</td>
                  <td>{a.servico?.nome || '-'}</td>
                  <td>{new Date(a.data).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(a.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>
                    <span className={`${styles.status} ${styles[a.status]}`}>
                      {a.status?.charAt(0).toUpperCase() + a.status?.slice(1)}
                    </span>
                  </td>
                  <td className={styles.acoes}>
                    {a.status === 'agendado' && (
                      <button className={styles.btnConfirmar} onClick={() => handleConfirmar(a._id)}>✓</button>
                    )}
                    {a.status !== 'cancelado' && (
                      <button className={styles.btnCancelar} onClick={() => handleCancelar(a._id)}>✕</button>
                    )}
                    <button className={styles.btnDeletar} onClick={() => handleDeletar(a._id)}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Novo Agendamento */}
      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitulo}>Novo Agendamento</h2>

            <div className={styles.modalCampos}>
              <label>ID do Cliente</label>
              <input className={styles.modalInput} value={form.cliente} onChange={e => setForm({ ...form, cliente: e.target.value })} placeholder="ID do cliente" />

              <label>ID do Funcionário</label>
              <input className={styles.modalInput} value={form.funcionario} onChange={e => setForm({ ...form, funcionario: e.target.value })} placeholder="ID do funcionário" />

              <label>ID do Serviço</label>
              <input className={styles.modalInput} value={form.servico} onChange={e => setForm({ ...form, servico: e.target.value })} placeholder="ID do serviço" />

              <label>Data e Hora</label>
              <input className={styles.modalInput} type="datetime-local" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />
            </div>

            <div className={styles.modalAcoes}>
              <button className={styles.btnCancelarModal} onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className={styles.btnSalvar} onClick={handleSalvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgendamentoList
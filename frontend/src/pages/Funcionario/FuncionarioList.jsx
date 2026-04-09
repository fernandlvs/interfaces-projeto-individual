/* eslint-disable react-hooks/purity */
import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Mail, Shield, UserCircle } from 'lucide-react'
import styles from './FuncionarioList.module.css'

const usuariosIniciais = [
  {
    id: '1',
    name: 'Admin Principal',
    email: 'admin@naildesign.com',
    role: 'admin',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-04',
  }
]

function  FuncionarioList() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais)
  const [busca, setBusca] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'funcionaria' })

  const usuariosFiltrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(busca.toLowerCase()) ||
    u.email.toLowerCase().includes(busca.toLowerCase())
  )

  function getRoleCor(role) {
    switch (role) {
      case 'admin': return styles.roleAdmin
      case 'funcionaria': return styles.roleFuncionaria
      case 'recepcionista': return styles.roleRecepcionista
      default: return ''
    }
  }

  function getRoleLabel(role) {
    switch (role) {
      case 'admin': return 'Administradora'
      case 'funcionaria': return 'Funcionária'
      case 'recepcionista': return 'Recepcionista'
      default: return role
    }
  }

  function getPermissaoInfo(role) {
    switch (role) {
      case 'admin': return '✓ Acesso total ao sistema'
      case 'funcionaria': return '✓ Gerenciar agendamentos e clientes'
      case 'recepcionista': return '✓ Apenas visualizar agendamentos'
      default: return ''
    }
  }

  function handleAdicionar() {
    if (!form.name || !form.email || !form.password) {
      alert('Preencha todos os campos!')
      return
    }
    const novo = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      role: form.role,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '-',
    }
    setUsuarios([...usuarios, novo])
    fecharModal()
  }

  function handleAtualizar() {
    if (!editando) return
    setUsuarios(usuarios.map(u =>
      u.id === editando.id
        ? { ...u, name: form.name, email: form.email, role: form.role }
        : u
    ))
    fecharModal()
  }

  function handleDeletar(id) {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      setUsuarios(usuarios.filter(u => u.id !== id))
    }
  }

  function abrirEditar(usuario) {
    setEditando(usuario)
    setForm({ name: usuario.name, email: usuario.email, password: '', role: usuario.role })
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setEditando(null)
    setForm({ name: '', email: '', password: '', role: 'funcionaria' })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.titulo}>Gerenciar Usuários</h1>
          <p className={styles.subtitulo}>Adicione e gerencie funcionárias com acesso ao painel</p>
        </div>
        <button className={styles.btnAdicionar} onClick={() => setModalAberto(true)}>
          <Plus size={16} />
          Adicionar Usuário
        </button>
      </div>

      {/* Busca */}
      <div className={styles.buscaContainer}>
        <Search size={18} className={styles.buscaIcone} />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className={styles.busca}
        />
      </div>

      {/* Tabela */}
      <div className={styles.card}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Criado em</th>
              <th>Último Acesso</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(u => (
              <tr key={u.id}>
                <td>
                  <div className={styles.usuarioInfo}>
                    <div className={styles.avatar}>
                      <UserCircle size={22} color="white" />
                    </div>
                    <span className={styles.usuarioNome}>{u.name}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.emailCell}>
                    <Mail size={14} color="#9ca3af" />
                    {u.email}
                  </div>
                </td>
                <td>
                  <span className={`${styles.badge} ${getRoleCor(u.role)}`}>
                    <Shield size={12} />
                    {getRoleLabel(u.role)}
                  </span>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString('pt-BR')}</td>
                <td>{u.lastLogin === '-' ? '-' : new Date(u.lastLogin).toLocaleDateString('pt-BR')}</td>
                <td>
                  <div className={styles.acoes}>
                    <button className={styles.btnEditar} onClick={() => abrirEditar(u)}>
                      <Edit2 size={16} />
                    </button>
                    {u.role !== 'admin' && (
                      <button className={styles.btnDeletar} onClick={() => handleDeletar(u.id)}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {usuariosFiltrados.length === 0 && (
          <div className={styles.vazio}>
            <UserCircle size={48} color="#d1d5db" />
            <p>Nenhum usuário encontrado</p>
          </div>
        )}
      </div>

      {/* Info Permissões */}
      <div className={styles.permissoes}>
        <h3 className={styles.permissoesTitulo}>
          <Shield size={16} />
          Níveis de Permissão
        </h3>
        <ul className={styles.permissoesList}>
          <li><strong>Administradora:</strong> Acesso total (gerenciar usuários, configurações, agendamentos, galeria)</li>
          <li><strong>Funcionária:</strong> Gerenciar agendamentos, clientes e visualizar dashboard</li>
          <li><strong>Recepcionista:</strong> Apenas visualizar agendamentos e clientes</li>
        </ul>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitulo}>{editando ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>

            <div className={styles.modalCampos}>
              <label>Nome Completo</label>
              <input className={styles.modalInput} placeholder="Ex: Maria Silva" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

              <label>Email</label>
              <input className={styles.modalInput} type="email" placeholder="maria@exemplo.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

              <label>{editando ? 'Nova Senha (opcional)' : 'Senha'}</label>
              <input className={styles.modalInput} type="password" placeholder={editando ? 'Deixe em branco para manter' : 'Senha'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />

              <label>Cargo</label>
              <select className={styles.modalInput} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="funcionaria">Funcionária</option>
                <option value="recepcionista">Recepcionista</option>
                <option value="admin">Administradora</option>
              </select>
              <p className={styles.permissaoHint}>{getPermissaoInfo(form.role)}</p>
            </div>

            <div className={styles.modalAcoes}>
              <button className={styles.btnCancelarModal} onClick={fecharModal}>Cancelar</button>
              <button className={styles.btnSalvar} onClick={editando ? handleAtualizar : handleAdicionar}>
                {editando ? 'Salvar Alterações' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FuncionarioList
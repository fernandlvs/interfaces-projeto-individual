import { useEffect, useState } from "react";
import { Search, Plus, Phone, X, Check } from "lucide-react";
import {
  listarClientes,
  buscarClientePorNome,
  criarCliente,
  atualizarCliente,
  deletarCliente,
} from "../../services/clienteService";
import styles from "./Cliente.module.css";

function getStatus(totalVisitas) {
  if (totalVisitas >= 15) return "VIP";
  if (totalVisitas >= 5) return "REGULAR";
  return "NOVA";
}

function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    totalVisitas: 0,
  });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setCarregando(true);
      const data = await listarClientes();
      setClientes(data);
    } catch {
      setErro("Erro ao carregar clientes.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleBusca(e) {
    const valor = e.target.value;
    setBusca(valor);
    if (valor.trim() === "") {
      carregar();
    } else {
      try {
        const data = await buscarClientePorNome(valor);
        setClientes(data);
      } catch {
        setErro("Erro ao buscar.");
      }
    }
  }

  function abrirNovo() {
    setEditando(null);
    setForm({ nome: "", email: "", telefone: "", totalVisitas: 0 });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditando(null);
  }

  async function handleSalvar() {
    if (!form.nome || !form.email) return;
    try {
      setSalvando(true);
      if (editando) {
        await atualizarCliente(editando._id, form);
      } else {
        await criarCliente(form);
      }
      fecharModal();
      carregar();
    } catch {
      setErro("Erro ao salvar cliente.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleDeletar(id) {
    if (!confirm("Deseja remover este cliente?")) return;
    try {
      await deletarCliente(id);
      carregar();
    } catch {
      setErro("Erro ao deletar.");
    }
  }

  const total = clientes.length;
  const umMesAtras = new Date();
  umMesAtras.setMonth(umMesAtras.getMonth() - 1);
  const novos = clientes.filter(
    (c) => new Date(c.criadoEm) > umMesAtras,
  ).length;
  const vips = 0;
  const retorno =
    total > 0 && novos < total
      ? Math.round(((total - novos) / total) * 100)
      : 0;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.titulo}>Clientes</h1>
        <p className={styles.subtitulo}>Gerencie sua base de clientes</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total de clientes</span>
          <span className={styles.statValor}>{total}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Clientes VIP</span>
          <span className={`${styles.statValor} ${styles.statVip}`}>
            {vips}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Novos este mês</span>
          <span className={styles.statValor}>{novos}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Taxa de retorno</span>
          <span className={`${styles.statValor} ${styles.statRetorno}`}>
            {retorno}%
          </span>
        </div>
      </div>

      <div className={styles.tabelaCard}>
        <div className={styles.tabelaHeader}>
          <h2 className={styles.tabelaTitulo}>Lista de Clientes</h2>
          <div className={styles.tabelaAcoes}>
            <div className={styles.buscaWrapper}>
              <Search size={14} className={styles.buscaIcon} />
              <input
                className={styles.buscaInput}
                type="text"
                placeholder="Buscar cliente"
                value={busca}
                onChange={handleBusca}
              />
            </div>
            <button className={styles.btnNovo} onClick={abrirNovo}>
              <Plus size={14} /> Nova cliente
            </button>
          </div>
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}

        {carregando ? (
          <p className={styles.info}>Carregando...</p>
        ) : clientes.length === 0 ? (
          <p className={styles.info}>Nenhum cliente encontrado.</p>
        ) : (
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Total de Visitas</th>
                <th>Última visita</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c, i) => {
                const visitas = c.totalVisitas || 0;
                const status = getStatus(visitas);
                const ultimaVisita = new Date(c.atualizadoEm || c.criadoEm);
                return (
                  <tr key={c._id}>
                    <td className={styles.nomeCell}>{c.nome}</td>
                    <td>{c.email}</td>
                    <td>
                      <span className={styles.telefoneCell}>
                        <Phone size={13} /> {c.telefone || "—"}
                      </span>
                    </td>
                    <td>{visitas} visitas</td>
                    <td>{ultimaVisita.toLocaleDateString("pt-BR")}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles["badge" + status]}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.btnVerDetalhes}
                        onClick={() => {
                          setEditando(c);
                          setForm({
                            nome: c.nome,
                            email: c.email,
                            telefone: c.telefone || "",
                            totalVisitas: Number(c.totalVisitas) || 0,
                          });
                          setModalAberto(true);
                        }}
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editando ? "Editar Cliente" : "Nova Cliente"}</h2>
              <button className={styles.btnFechar} onClick={fecharModal}>
                <X size={18} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <label>Nome *</label>
              <input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Nome completo"
              />
              <label>Email *</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@exemplo.com"
                type="email"
              />
              <label>Telefone</label>
              <input
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                placeholder="(83) 99999-9999"
              />
              <label>Total de Visitas</label>
              <input
                type="number"
                min="0"
                value={form.totalVisitas !== undefined ? form.totalVisitas : 0}
                onChange={(e) =>
                  setForm({ ...form, totalVisitas: Number(e.target.value) })
                }
              />
            </div>
            <div className={styles.modalFooter}>
              {editando && (
                <button
                  className={styles.btnDeletarModal}
                  onClick={() => {
                    handleDeletar(editando._id);
                    fecharModal();
                  }}
                >
                  Remover
                </button>
              )}
              <button className={styles.btnSecundario} onClick={fecharModal}>
                Cancelar
              </button>
              <button
                className={styles.btnPrimario}
                onClick={handleSalvar}
                disabled={salvando}
              >
                <Check size={14} /> {salvando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClienteList;

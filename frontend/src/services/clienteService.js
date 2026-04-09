import api from "./api";

export const listarClientes = async () => {
  const res = await api.get("/clientes");
  return res.data;
};

export const buscarClientePorNome = async (nome) => {
  const res = await api.get("/clientes/buscar", { params: { nome } });
  return res.data;
};

export const buscarClientePorId = async (id) => {
  const res = await api.get(`/clientes/${id}`);
  return res.data;
};

export const criarCliente = async (dados) => {
  const res = await api.post("/clientes", dados);
  return res.data;
};

export const atualizarCliente = async (id, dados) => {
  const res = await api.put(`/clientes/${id}`, dados);
  return res.data;
};

export const deletarCliente = async (id) => {
  const res = await api.delete(`/clientes/${id}`);
  return res.data;
};

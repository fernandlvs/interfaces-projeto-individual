const BASE_URL = 'http://localhost:3000'

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

// 🔹 LISTAR
export async function listarFuncionarios() {
  const res = await fetch(`${BASE_URL}/funcionarios`, {
    headers: getHeaders()
  })

  const json = await res.json()
  return Array.isArray(json) ? json : json.dados || []
}

// 🔹 BUSCAR POR ID
export async function buscarFuncionario(id) {
  const res = await fetch(`${BASE_URL}/funcionarios/${id}`, {
    headers: getHeaders()
  })

  return res.json()
}

// 🔹 CRIAR
export async function criarFuncionario(dados) {
  const res = await fetch(`${BASE_URL}/funcionarios`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(dados)
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.mensagem || 'Erro ao criar funcionário')
  }

  return json
}

// 🔹 ATUALIZAR
export async function atualizarFuncionario(id, dados) {
  const res = await fetch(`${BASE_URL}/funcionarios/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(dados)
  })

  return res.json()
}

// 🔹 DELETAR
export async function deletarFuncionario(id) {
  const res = await fetch(`${BASE_URL}/funcionarios/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })

  return res.json()
}
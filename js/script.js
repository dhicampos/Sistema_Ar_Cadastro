
// Seleciona elementos do formulário
const form = document.getElementById('cadastroForm');
const tipoServidorSelect = document.getElementById('tipoServidor');
const lotacaoContainer = document.getElementById('lotacaoContainer');
const empresaContainer = document.getElementById('empresaContainer');
const limparBtn = document.getElementById('limparBtn');

// Função que obtém array de servidores do LocalStorage
function obterServidoresLocalStorage() {
  const dados = localStorage.getItem('servidores');
  return dados ? JSON.parse(dados) : [];
}

// Função que salva array de servidores no LocalStorage
function salvarServidoresLocalStorage(servidores) {
  localStorage.setItem('servidores', JSON.stringify(servidores));
}

// Exibe ou esconde campos conforme o tipo de servidor
if (tipoServidorSelect) {
  tipoServidorSelect.addEventListener('change', () => {
    if (tipoServidorSelect.value === 'terceirizado') {
      empresaContainer.style.display = 'block';
      lotacaoContainer.style.display = 'none';
    } else {
      empresaContainer.style.display = 'none';
      lotacaoContainer.style.display = 'block';
    }
  });
}

// Ao carregar a página, se estivermos na página de listagem, exibe os servidores
document.addEventListener('DOMContentLoaded', () => {
  const tabelaServidores = document.querySelector('#tabelaServidores tbody');
  if (tabelaServidores) {
    exibirServidoresNaTabela(tabelaServidores);
  }
});

// Função para exibir os servidores na tabela (listagem.html)
function exibirServidoresNaTabela(tbody) {
  // Limpa qualquer dado anterior
  tbody.innerHTML = '';

  // Carrega servidores do localStorage
  const servidores = obterServidoresLocalStorage();

  // Insere cada servidor como uma nova linha na tabela
  servidores.forEach((servidor) => {
    const row = document.createElement('tr');

    const tdTipo = document.createElement('td');
    tdTipo.textContent = servidor.tipo;
    row.appendChild(tdTipo);

    const tdId = document.createElement('td');
    tdId.textContent = servidor.id;
    row.appendChild(tdId);

    const tdNome = document.createElement('td');
    tdNome.textContent = servidor.nome;
    row.appendChild(tdNome);

    const tdCargo = document.createElement('td');
    tdCargo.textContent = servidor.cargo;
    row.appendChild(tdCargo);

    const tdLotacao = document.createElement('td');
    tdLotacao.textContent = servidor.lotacao;
    row.appendChild(tdLotacao);

    const tdEmpresa = document.createElement('td');
    tdEmpresa.textContent = servidor.empresa;
    row.appendChild(tdEmpresa);

    tbody.appendChild(row);
  });
}

// Lida com o evento de envio do formulário (cadastro)
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipoServidor = tipoServidorSelect.value;
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const lotacao = document.getElementById('lotacao').value;
    const empresa = document.getElementById('empresa').value;

    // Monta objeto servidor
    const servidor = {
      tipo: tipoServidor,
      id: parseInt(id),
      nome: nome.trim(),
      cargo: cargo.trim(),
      lotacao: tipoServidor === 'terceirizado' ? '' : lotacao.trim(),
      empresa: tipoServidor === 'terceirizado' ? empresa.trim() : ''
    };

    // Obtém lista atual do LocalStorage
    const servidores = obterServidoresLocalStorage();
    // Adiciona novo servidor
    servidores.push(servidor);
    // Salva novamente no LocalStorage
    salvarServidoresLocalStorage(servidores);

    // Limpa o formulário
    form.reset();
    empresaContainer.style.display = 'none';
    lotacaoContainer.style.display = 'block';

    alert('Servidor cadastrado com sucesso!');
  });
}

// Botão "Limpar" (limpa apenas o formulário, não o LocalStorage)
if (limparBtn) {
  limparBtn.addEventListener('click', () => {
    form.reset();
    empresaContainer.style.display = 'none';
    lotacaoContainer.style.display = 'block';
  });
}

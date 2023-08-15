let items = []; // array para armazenar todos os itens JSON
let displayedItems = 0; // contador para controlar quantos itens são exibidos
var arquivos = [
  "/Local/Privado/Lojas/Roupas/arq.json",
  "/Local/Privado/Lojas/Moveis-e-Eletro/arq.json"
];
function loadItems() {
  Promise.all(arquivos.map(arquivo =>
    fetch(arquivo).then(response => response.json())
  )).then(resultados => {
    items = resultados.flat().reverse(); // Transforma um array de arrays em um array único
    displayItems(); // exibe os primeiros 10 itens
  });
}

function displayItems() {
  const container = document.getElementById('item-container');
  container.innerHTML = ''; // limpa o container antes de exibir mais itens

  // itera sobre os itens e exibe os que ainda não foram exibidos
  for (let i = displayedItems; i < displayedItems + 12 && i < items.length; i++) {
    const item = items[i];
    const itemHTML = `
      <div class="item">
        <a href="${item.Link}"><img src="${item.Imagem}" alt="${item.Titulo}">
        <a href="${item.Link}"><h2>${item.Titulo}</h2></a>
        <p>${item.Descricao}</p>
        <p>Rua/Av:${item.Rua}</p>
        <p>Atualizado em: ${item.Data}</p>
        <a href="${item.Link}">Saiba mais</a>
      </div>
    `;
    container.innerHTML += itemHTML;
  }

  // atualiza o contador de itens exibidos
  displayedItems += 12;

  // exibe ou esconde o botão "Carregar mais" dependendo do número de itens exibidos
  const loadMoreButton = document.getElementById('load-more');
  if (displayedItems >= items.length) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }
}

window.onload = loadItems;


let currentPage = 0; // variável para armazenar a página atual

function displayNext() {
currentPage++;
displayItems();
}

function displayPrevious() {
if (currentPage > 0) {
currentPage--;
displayItems();
}
}

function displayItems() {
const container = document.getElementById('item-container');
container.innerHTML = ''; // limpa o container antes de exibir mais itens

// define o intervalo de itens a serem exibidos com base na página atual
const startItem = currentPage * 12;
const endItem = startItem + 12;

// itera sobre os itens e exibe os que estão dentro do intervalo definido
for (let i = startItem; i < endItem && i < items.length; i++) {
const item = items[i];
const itemHTML = `
  <div class="item">
    <a href="${item.Link}"><img src="${item.Imagem}" alt="${item.Titulo}">
    <a href="${item.Link}"><h2>${item.Titulo}</h2></a>
    <p>${item.Descricao}</p>
    <p>Rua/Av:${item.Rua}</p>
    <p>Adicionado em: ${item.Data}</p>
    <a href="${item.Link}">Saiba mais</a>
  </div>
`;
container.innerHTML += itemHTML;
}

// exibe ou esconde os botões "Anterior" e "Próximo" dependendo da página atual
const loadMoreButton = document.getElementById('load-more');
const loadPreviousButton = document.getElementById('load-previous');
if (currentPage === 0) {
loadPreviousButton.style.display = 'none';
} else {
loadPreviousButton.style.display = 'block';
}
if (endItem >= items.length) {
loadMoreButton.style.display = 'none';
} else {
loadMoreButton.style.display = 'block';
}
}

window.onload = loadItems;

function buscar() {
var inputElement = document.getElementById("Idbuscar").value;

if (inputElement.trim() !== "" , inputElement.length > 1) {
  const nomeBusca = document.getElementById("Idbuscar").value;
  Promise.all(arquivos.map(arquivo =>
    fetch(arquivo).then(response => response.json())
  )).then(resultados => {
    const removerAcentos = (texto) => {
      return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
    const items = resultados.flat(); // Transforma um array de arrays em um array único
    const resultadosFiltrados = items.filter(item => {
      const titulo = removerAcentos(item.Titulo.toLowerCase());
      const descricao = removerAcentos(item.Descricao.toLowerCase());
      const busca = removerAcentos(nomeBusca.toLowerCase());
      const termosBusca = busca.split(' ');
      return termosBusca.every(termo => titulo.includes(termo) || descricao.includes(termo));
    });
    
    const resultadoDiv = document.getElementById("item-container");
    resultadoDiv.innerHTML = "";
    if (resultadosFiltrados.length > 0) {
      resultadosFiltrados.forEach(item => {
        resultadoDiv.innerHTML += `
        <div class="item">
          <a href="${item.Link}"><img src="${item.Imagem}" alt="${item.Titulo}">
          <a href="${item.Link}"><h2>${item.Titulo}</h2></a>
          <p>${item.Descricao}</p>
          <p>Rua/Av:${item.Rua}</p>
          <p>Adicionado em: ${item.Data}</p>
          <a href="${item.Link}">Saiba mais</a>
        </div>
        `;
      });
      const loadMoreButton = document.getElementById('load-more');
      const loadPreviousButton = document.getElementById('load-previous');
      loadPreviousButton.style.display = 'none';
      loadMoreButton.style.display = 'none';
    } else {
      resultadoDiv.innerHTML = "Nenhum resultado encontrado.";
    }
  }).catch(error => console.error(error));
}else {
  const nomeBusca = document.getElementById("Idbuscar").value;
  Promise.all(arquivos.map(arquivo =>
    fetch(arquivo).then(response => response.json())
  )).then(resultados => {
    const removerAcentos = (texto) => {
      return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
    const items = resultados.flat(); // Transforma um array de arrays em um array único
    const resultadosFiltrados = items.filter(item => {
      const titulo = removerAcentos(item.Titulo.toLowerCase());
      const descricao = removerAcentos(item.Descricao.toLowerCase());
      const busca = removerAcentos(nomeBusca.toLowerCase());
      const termosBusca = busca.split(' ');
      return termosBusca.every(termo => titulo.includes(termo) || descricao.includes(termo));
    });
    
    const resultadoDiv = document.getElementById("item-container");
    resultadoDiv.innerHTML = "";
    if (resultadosFiltrados.length > 0) {
      resultadosFiltrados.slice(0, 12).forEach(item => {
        resultadoDiv.innerHTML += `
        <div class="item">
          <a href="${item.Link}"><img src="${item.Imagem}" alt="${item.Titulo}">
          <a href="${item.Link}"><h2>${item.Titulo}</h2></a>
          <p>${item.Descricao}</p>
          <p>Rua/Av:${item.Rua}</p>
          <p>Adicionado em: ${item.Data}</p>
          <a href="${item.Link}">Saiba mais</a>
        </div>
        `;
      });
      const loadMoreButton = document.getElementById('load-more');
      const loadPreviousButton = document.getElementById('load-previous');
      loadPreviousButton.style.display = 'block';
      loadMoreButton.style.display = 'block';
    } else {
      resultadoDiv.innerHTML = "Nenhum resultado encontrado.";
    }
  }).catch(error => console.error(error));
}}

const meuForm = document.getElementById('Formbuscar');
meuForm.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar();
  }
});

const API_KEY = "66ad7850fb81934b21e09afbfed7fa07";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const filmesGrid = document.getElementById("filmesGrid");

// Função única para requisições
async function requisicaoFilmes(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const data = await response.json();
    renderizarFilmes(data.results);
  } catch (error) {
    console.error("Erro:", error);
    filmesGrid.innerHTML = "<p>Erro ao carregar filmes.</p>";
  }
}

function buscaFilme() {
  const informacao = campoPesquisa.value.trim(); // Corrigido: value no lugar de ariaValueMax
  if (informacao === "") {
    window.location.reload();
    return;
  }
  console.log("Pesquisando por:", informacao); // Corrigido: console.log

  // Corrigido: template string com crases
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-br`;

  requisicaoFilmes(url);
  campoPesquisa.value = "";
}

function renderizarFilmes(filmes) {
  filmesGrid.innerHTML = "";

  if (!filmes || filmes.length === 0) {
    filmesGrid.innerHTML = "<p>Nenhum filme encontrado.</p>"; // Corrigido: innerHTML (I maiúsculo)
    return;
  }

  filmes.forEach((filme) => {
    const card = document.createElement("div");
    card.classList.add("filme-card"); // Corrigido: classList e usando classe do CSS

    const image = filme.poster_path
      ? IMAGE_URL + filme.poster_path
      : "https://via.placeholder.com/500x750?text=Sem+Imagem";

    // Formatando a nota
    const nota = filme.vote_average ? filme.vote_average.toFixed(1) : "N/A";

    // Corrigido: propriedades corretas e estrutura HTML
    card.innerHTML = `
            <img src="${image}" alt="${filme.title}" class="filme-capa">
            <div class="filme-info">
                <h3>${filme.title}</h3>
                <p>${filme.overview ? filme.overview.substring(0, 100) + "..." : "Sem descrição"}</p>
                <span class="nota">⭐ ${nota}</span>
                <p>${filme.release_date ? filme.release_date.split("-")[0] : "Ano desconhecido"}</p>
            </div>
        `;

    filmesGrid.appendChild(card);
  });
}

// Carregar filmes populares ao iniciar
async function carregarFilmesPopulares() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-br`;
  await requisicaoFilmes(url);
}

// Event Listeners
botaoPesquisa.addEventListener("click", buscaFilme);
campoPesquisa.addEventListener("keydown", function (event) {
  // Corrigido: keydown (K minúsculo)
  if (event.key === "Enter") {
    buscaFilme();
  }
});

// Carregar filmes populares quando a página abrir
carregarFilmesPopulares();

const API_KEY = "66ad7850fb81934b21e09afbfed7fa07";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const filmesGrid = document.getElementById("filmesGrid");

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
  const informacao = campoPesquisa.value.trim();
  if (informacao === "") {
    // Caso nao pesquise nada, vai me mostrar os populares.
    carregarFilmesPopulares();
    return;
  }
  console.log("Pesquisando por:", informacao);

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-br`;

  requisicaoFilmes(url);
  campoPesquisa.value = "";
}

// Msm funcao com ajuste de classe pra essa porra não ficar feia.
function renderizarFilmes(filmes) {
  filmesGrid.innerHTML = "";

  if (!filmes || filmes.length === 0) {
    filmesGrid.innerHTML = "<p>Nenhum filme encontrado.</p>";
    return;
  }

  filmes.forEach((filme) => {
    const card = document.createElement("div");
    card.classList.add("filme-card");

    const image = filme.poster_path ? IMAGE_URL + filme.poster_path : "";

    card.innerHTML = `
            <img src="${image}" alt="${filme.title}" class="filme-capa">
            <div class="filme-info">
                <h3>${filme.title}</h3>
                <p>Nota: ${filme.vote_average ? filme.vote_average.toFixed(1) : "N/A"}</p>
                <p>${filme.overview ? filme.overview.substring(0, 100) + "..." : "Sem descrição"}</p>
                <p>Ano: ${filme.release_date ? filme.release_date.split("-")[0] : "Desconhecido"}</p>
            </div>
        `;

    filmesGrid.appendChild(card);
  });
}

// Ultima aula: carrega filmes populares.
async function carregarFilmesPopulares() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-br`;
  await requisicaoFilmes(url);
}

botaoPesquisa.addEventListener("click", buscaFilme);
campoPesquisa.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    buscaFilme();
  }
});

carregarFilmesPopulares();

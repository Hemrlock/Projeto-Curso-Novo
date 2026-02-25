const API_KEY = "66ad7850fb81934b21e09afbfed7fa07";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const filmesGrid = document.getElementById("filmesGrid");
const tituloSecao = document.getElementById("tituloSecao");

// Menu
const btnTrending = document.getElementById("menu-trending");
const btnMovies = document.getElementById("menu-movies");
const btnSeries = document.getElementById("menu-series");

async function requisicao(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderizarCards(data.results);
  } catch (error) {
    filmesGrid.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
  }
}

function renderizarCards(lista) {
  filmesGrid.innerHTML = "";

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.className = "filme-card";

    const image = item.poster_path ? IMAGE_URL + item.poster_path : "";
    const titulo = item.title || item.name;
    const tipo = item.media_type || (item.first_air_date ? "tv" : "movie");

    card.innerHTML = `
      <img src="${image}">
      <div class="filme-info">
        <h3>${titulo}</h3>
        <p>${tipo === "movie" ? "🎬 Filme" : "📺 Série"}</p>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `./pages/detalhes.html?id=${item.id}&type=${tipo}`;
    };

    filmesGrid.appendChild(card);
  });
}

/* ===== CARREGAMENTOS ===== */

function carregarTrending() {
  tituloSecao.textContent = "🔥 Tendências";
  requisicao(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=pt-BR`);
}

function carregarFilmes() {
  tituloSecao.textContent = "🎬 Filmes Populares";
  requisicao(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
}

function carregarSeries() {
  tituloSecao.textContent = "📺 Séries Populares";
  requisicao(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`);
}

/* ===== EVENTOS ===== */

btnTrending.onclick = carregarTrending;
btnMovies.onclick = carregarFilmes;
btnSeries.onclick = carregarSeries;

/* ===== INICIAL ===== */
carregarTrending();
const API_KEY = "66ad7850fb81934b21e09afbfed7fa07";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const detalhesContainer = document.getElementById("detalhesContainer");

// 🔹 PEGA ID E TIPO DA URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type"); // movie

async function carregarDetalhes() {
  if (!id || !type) {
    detalhesContainer.innerHTML = "<p>Conteúdo inválido.</p>";
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR`
    );

    if (!response.ok) {
      throw new Error("Erro na API");
    }

    const data = await response.json();
    renderizarDetalhes(data);
  } catch (error) {
    detalhesContainer.innerHTML = "<p>Erro ao carregar detalhes.</p>";
    console.error(error);
  }
}

function renderizarDetalhes(item) {
  const imagem = item.poster_path ? IMAGE_URL + item.poster_path : "";
  const titulo = item.title || item.name;
  const dataLancamento = item.release_date || item.first_air_date;

  document.title = titulo;

  detalhesContainer.innerHTML = `
    <div class="detalhes-card">
      <img src="${imagem}" alt="${titulo}">
      <div class="detalhes-info">
        <h2>${titulo}</h2>
        <p>
          <strong>Data:</strong> ${dataLancamento || "Não disponível"}<br>
          <strong>Nota:</strong> ${item.vote_average}<br><br>
          ${item.tagline || ""}<br><br>
          ${item.overview || "Sem descrição"}
        </p>
        <button onclick="voltar()">⬅ Voltar</button>
      </div>
    </div>
  `;
}

function voltar() {
  window.history.back();
}

carregarDetalhes();
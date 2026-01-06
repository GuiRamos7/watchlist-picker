import { chromium } from 'playwright';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  const { username } = req.query;
  const TMDB_API_KEY = "618266079f3950be9cd4f8d161e8d432"; // Adicione ao seu .env

  if (!username) return res.status(400).json({ error: 'Username é obrigatório' });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // 1. Acessa a primeira página para descobrir o total de páginas
    await page.goto(`https://letterboxd.com/${username}/watchlist/`, { waitUntil: 'domcontentloaded' });

    // Verifica quantas páginas existem (procurando o último número na paginação)
    const lastPage = await page.evaluate(() => {
      const pages = document.querySelectorAll('.paginate-page a');
      if (pages.length === 0) return 1;
      return Math.min(parseInt(pages[pages.length - 1].innerText) || 1, 14); // Limite de 14 páginas
    });

    await browser.close(); // Já temos o que precisamos do navegador

    // 2. Criamos uma lista de URLs para buscar via fetch paralelo (muito mais rápido que Playwright)
    const pageUrls = Array.from({ length: lastPage }, (_, i) =>
      `https://letterboxd.com/${username}/watchlist/page/${i + 1}/`
    );

    const pagesContent = await Promise.all(
      pageUrls.map(url => fetch(url).then(r => r.text()))
    );

    // 3. Extrai todos os nomes de filmes usando Regex (evita processar o DOM 14 vezes)
    const allMovies = pagesContent.flatMap(html => {
      const matches = [...html.matchAll(/alt="(.*?)"/g)];
      return matches.map(m => m[1]);
    });

    if (allMovies.length === 0) {
      return res.status(404).json({ error: 'Watchlist vazia ou perfil privado.' });
    }

    // 4. Sorteia um filme aleatório
    const randomMovieName = allMovies[Math.floor(Math.random() * allMovies.length)];

    // 5. Busca detalhes ricos no TMDB
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(randomMovieName)}`
    );
    const tmdbData = await tmdbRes.json();
    const movieDetails = tmdbData.results?.[0];

    console.log(movieDetails, tmdbData, 123)

    // 6. Retorno final enriquecido
    return res.status(200).json({
      user: username,
      totalInWatchlist: allMovies.length,
      selected: {
        name: randomMovieName,
        tmdb_data: movieDetails ? {
          title: movieDetails.title,
          year: movieDetails.release_date?.split('-')[0],
          rating: movieDetails.vote_average,
          overview: movieDetails.overview,
          poster: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
        } : null
      }
    });

  } catch (error) {
    if (browser) await browser.close();
    return res.status(500).json({ error: 'Erro no servidor: ' + error.message });
  }
}
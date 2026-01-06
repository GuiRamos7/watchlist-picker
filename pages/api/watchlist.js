export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  let { username } = req.query;
  const TMDB_API_KEY = "618266079f3950be9cd4f8d161e8d432";

  if (!username) return res.status(400).json({ error: 'Username é obrigatório' });

  // Limpeza do username: se o usuário colou a URL, extraímos apenas o nome
  // Ex: https://letterboxd.com/guiramos7 -> guiramos7
  username = username.replace('https://letterboxd.com/', '').replace('/', '').trim();

  try {
    // 1. Pegamos a primeira página para ver se o usuário existe e extrair dados
    const firstPageRes = await fetch(`https://letterboxd.com/${username}/watchlist/`);
    if (firstPageRes.status === 404) throw new Error('Usuário não encontrado no Letterboxd.');
    
    const firstPageHtml = await firstPageRes.text();

    // 2. Descobrir o número de páginas (Regex simples no HTML)
    const pageMatches = firstPageHtml.match(/\/watchlist\/page\/(\={0,1}\d+)\//g);
    let lastPage = 1;
    if (pageMatches) {
      const numbers = pageMatches.map(m => parseInt(m.match(/\d+/)[0]));
      lastPage = Math.min(Math.max(...numbers), 14); 
    }

    // 3. Buscar todas as páginas em paralelo (Performance Máxima)
    const pageUrls = Array.from({ length: lastPage }, (_, i) =>
      `https://letterboxd.com/${username}/watchlist/page/${i + 1}/`
    );

    const pagesContent = await Promise.all(
      pageUrls.map(url => fetch(url).then(r => r.text()))
    );

    // 4. Extrair nomes dos filmes
    const allMovies = pagesContent.flatMap(html => {
      // O Letterboxd coloca os nomes no alt das imagens dentro da div 'poster'
      const matches = [...html.matchAll(/img src="[^"]+" class="image" alt="([^"]+)"/g)];
      return matches.map(m => m[1]);
    });

    if (allMovies.length === 0) {
      return res.status(404).json({ error: 'Watchlist vazia ou perfil privado.' });
    }

    // 5. Sortear e buscar no TMDB
    const randomMovieName = allMovies[Math.floor(Math.random() * allMovies.length)];
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(randomMovieName)}&language=pt-BR`
    );
    const tmdbData = await tmdbRes.json();
    const movieDetails = tmdbData.results?.[0];

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
          poster: movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : null
        } : null
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
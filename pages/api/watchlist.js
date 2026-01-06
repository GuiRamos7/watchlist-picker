export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  let { username } = req.query;
  const TMDB_API_KEY = "618266079f3950be9cd4f8d161e8d432";

  if (!username) return res.status(400).json({ error: 'Username é obrigatório' });

  // Limpa a URL caso o usuário cole o link completo
  const cleanUsername = username
    .replace('https://letterboxd.com/', '')
    .replace('letterboxd.com/', '')
    .split('/')[0]
    .trim();

  try {
    // 1. Pega a primeira página para validar e estimar o tamanho
    const firstPageUrl = `https://letterboxd.com/${cleanUsername}/watchlist/`;
    const response = await fetch(firstPageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' } // Evita bloqueios simples
    });

    if (!response.ok) throw new Error('Usuário não encontrado ou perfil privado');
    
    const html = await response.text();

    // 2. Tenta descobrir o número de páginas buscando o maior número no link /page/X/
    // Se não achar nada, assume que só tem 1 página
    const pageMatches = html.match(/\/watchlist\/page\/(\d+)\//g) || [];
    const pageNumbers = pageMatches.map(m => parseInt(m.match(/\d+/)[0]));
    const lastPage = Math.min(Math.max(...pageNumbers, 1), 14);

    // 3. Busca todas as páginas (Paralelo)
    const pageUrls = Array.from({ length: lastPage }, (_, i) =>
      `https://letterboxd.com/${cleanUsername}/watchlist/page/${i + 1}/`
    );

    const pagesContent = await Promise.all(
      pageUrls.map(url => fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r => r.text()))
    );

    // 4. EXTRAÇÃO MELHORADA: 
    // O nome do filme está sempre dentro do atributo alt="..." da imagem do poster
    const allMovies = [];
    pagesContent.forEach(pageHtml => {
      // Procura especificamente por imagens dentro da classe 'poster'
      const posters = pageHtml.split('class="poster');
      posters.shift(); // Remove a primeira parte que vem antes do primeiro poster
      
      posters.forEach(chunk => {
        const altMatch = chunk.match(/alt="([^"]+)"/);
        if (altMatch && altMatch[1]) {
          allMovies.push(altMatch[1]);
        }
      });
    });

    if (allMovies.length === 0) {
      return res.status(404).json({ error: 'Nenhum filme extraído. Verifique se a watchlist é pública.' });
    }

    // 5. Sorteio e TMDB
    const randomMovieName = allMovies[Math.floor(Math.random() * allMovies.length)];
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(randomMovieName)}&language=pt-BR`
    );
    const tmdbData = await tmdbRes.json();
    const movie = tmdbData.results?.[0];

    return res.status(200).json({
      user: cleanUsername,
      totalInWatchlist: allMovies.length,
      selected: {
        name: randomMovieName,
        tmdb_data: movie ? {
          title: movie.title,
          year: movie.release_date?.split('-')[0],
          rating: movie.vote_average,
          overview: movie.overview,
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
        } : null
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
# 🎬 Letterboxd Watchlist Picker

Uma aplicação Next.js que sorteia um filme aleatório da sua watchlist do Letterboxd.

## 🚀 Funcionalidades

- 🎲 Sorteia um filme aleatório da watchlist
- 📊 Mostra o total de filmes na watchlist
- 🔍 Faz scraping de múltiplas páginas automaticamente
- 💻 Interface moderna e responsiva
- ⚡ Back-end com Next.js API Routes

## 🛠️ Tecnologias

- **Next.js** (Pages Router)
- **React**
- **Chakra UI** (componentes e sistema de design)
- **Styled Components** (estilização customizada)
- **Playwright** (para web scraping)
- **Framer Motion** (animações)

## 📋 Pré-requisitos

- Node.js 16.x ou superior
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório ou navegue até a pasta do projeto:

```bash
cd watchlist-picker
```

2. Instale as dependências:

```bash
npm install
```

Isso irá instalar todas as dependências e o Playwright automaticamente.

## ▶️ Como usar

1. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

2. Abra seu navegador e acesse:

```
http://localhost:3000
```

3. Digite seu username do Letterboxd e clique em "Sortear Filme"

## 🏗️ Estrutura do Projeto

```
watchlist-picker/
├── pages/
│   ├── api/
│   │   └── watchlist.js    # API route para buscar watchlist
│   └── index.js             # Página principal (front-end)
├── package.json
├── next.config.js
└── README.md
```

## 📡 API

### GET `/api/watchlist?username={username}`

Busca a watchlist de um usuário do Letterboxd e retorna um filme aleatório.

**Parâmetros:**
- `username` (obrigatório): Username do Letterboxd

**Resposta de sucesso:**
```json
{
  "user": "username",
  "totalMovies": 42,
  "selected": "Nome do Filme"
}
```

**Resposta de erro:**
```json
{
  "error": "Mensagem de erro"
}
```

## 🔒 Limitações

- Funciona apenas com perfis públicos do Letterboxd
- Limite de 15 páginas por segurança (aproximadamente 420 filmes)
- Requer uma conexão com internet para acessar o Letterboxd

## 🚀 Deploy

Para fazer deploy em produção:

```bash
npm run build
npm start
```

Você também pode fazer deploy em plataformas como:
- Vercel (recomendado para Next.js)
- Netlify
- Railway
- Heroku

**Nota:** Certifique-se de que o Playwright está instalado no ambiente de produção.

## 📝 Licença

Este projeto é de código aberto e está disponível para uso pessoal.

## ⚠️ Aviso

Este projeto faz scraping do site Letterboxd. Use com responsabilidade e respeite os termos de serviço do Letterboxd.


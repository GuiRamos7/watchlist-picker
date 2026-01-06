# ⚡ Quick Start Guide

## 🚀 Instalação e Execução

```bash
# 1. Instalar todas as dependências (incluindo Playwright e Chakra UI)
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000
```

---

## 📦 Bibliotecas Instaladas

### Chakra UI (`@chakra-ui/react`)
Sistema completo de componentes UI com design system integrado.

```jsx
import { Box, Button, Heading } from '@chakra-ui/react';
```

### Styled Components (`styled-components`)
CSS-in-JS para estilos customizados com suporte a SSR.

```jsx
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  padding: 20px;
`;
```

### Dependências Relacionadas
- `@emotion/react` - Engine de CSS-in-JS
- `@emotion/styled` - Styled API para Emotion
- `framer-motion` - Animações (requerido pelo Chakra)
- `babel-plugin-styled-components` - Plugin Babel para SSR

---

## 📁 Estrutura do Projeto

```
watchlist-picker/
├── components/
│   ├── ExampleComponent.js     # Exemplo combinando Chakra + Styled
│   └── StyledComponents.js     # Biblioteca de componentes styled
├── pages/
│   ├── _app.js                 # ChakraProvider configurado ✅
│   ├── _document.js            # SSR para styled-components ✅
│   ├── index.js                # Página principal (Chakra UI + Styled)
│   └── api/
│       └── watchlist.js        # API route com Playwright
├── theme.js                    # Tema customizado Chakra UI ✅
├── .babelrc                    # Config Babel para styled-components ✅
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── SETUP.md                    # Documentação detalhada
└── QUICK_START.md              # Este arquivo
```

---

## 🎨 Como Usar as Bibliotecas

### 1. Chakra UI - Componentes Prontos

```jsx
import { Box, Button, VStack, useToast } from '@chakra-ui/react';

function MyPage() {
  const toast = useToast();
  
  return (
    <VStack spacing={4}>
      <Box p={4} bg="purple.500" color="white">
        Hello Chakra!
      </Box>
      <Button 
        variant="gradient"  // Variante customizada no theme.js
        onClick={() => toast({ title: 'Clicado!' })}
      >
        Clique
      </Button>
    </VStack>
  );
}
```

### 2. Styled Components - Estilos Customizados

```jsx
import styled from 'styled-components';

const GradientCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 15px;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

function MyComponent() {
  return (
    <GradientCard>
      Conteúdo com gradiente
    </GradientCard>
  );
}
```

### 3. Combinando Ambas

```jsx
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';

// Estilizando um componente Chakra com styled-components
const StyledBox = styled(Box)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  &:hover {
    transform: scale(1.05);
  }
`;

function MyComponent() {
  return (
    <StyledBox p={4} borderRadius="lg">
      Melhor dos dois mundos!
    </StyledBox>
  );
}
```

---

## 🎨 Tema Customizado

O tema está em `theme.js` e inclui:

### Cores Brand
```jsx
<Box bg="brand.500">Roxo primário</Box>
<Button colorScheme="brand">Botão roxo</Button>
```

### Variante Gradient para Button
```jsx
<Button variant="gradient">Botão com Gradiente</Button>
```

### Estilos Globais
- Background com gradiente roxo
- Fontes do sistema

---

## 🔧 Configurações Importantes

### 1. ChakraProvider (_app.js)
```jsx
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
```

### 2. Styled Components SSR (_document.js)
Configurado para server-side rendering do styled-components.

### 3. Babel Config (.babelrc)
```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

---

## 📚 Componentes Disponíveis

### Em `components/StyledComponents.js`:
- `GradientButton` - Botão com gradiente
- `AnimatedCard` - Card com animação fadeIn
- `GlassCard` - Efeito glass morphism
- `PulseAnimation` - Animação de pulso
- `GradientText` - Texto com gradiente
- `FloatingElement` - Animação flutuante
- `ShimmerEffect` - Efeito shimmer/brilho

### Uso:
```jsx
import { GradientButton, AnimatedCard } from '../components/StyledComponents';

function MyPage() {
  return (
    <AnimatedCard>
      <h1>Título</h1>
      <GradientButton>Clique</GradientButton>
    </AnimatedCard>
  );
}
```

---

## 🎯 Features Implementadas

✅ Chakra UI instalado e configurado
✅ Styled Components com SSR
✅ Tema customizado com paleta roxa
✅ Componentes reutilizáveis
✅ Animações e transições
✅ Sistema de toast/notificações
✅ Design responsivo
✅ Gradientes e efeitos visuais
✅ Suporte a TypeScript-ready

---

## 🐛 Troubleshooting

### Styled Components não funciona no SSR?
Verifique se `.babelrc` existe e tem a configuração correta.

### Tema não está aplicando?
Certifique-se que `ChakraProvider` envolve toda a aplicação em `_app.js`.

### Animações do Framer Motion não funcionam?
Framer Motion é instalado automaticamente com Chakra UI.

---

## 📖 Documentação Oficial

- [Chakra UI](https://chakra-ui.com/) - Componentes e temas
- [Styled Components](https://styled-components.com/) - Estilos CSS-in-JS
- [Next.js](https://nextjs.org/) - Framework React

---

## 💡 Dicas

1. **Use Chakra UI** para layout e componentes básicos
2. **Use Styled Components** para animações complexas e estilos únicos
3. **Combine ambos** quando precisar de flexibilidade máxima
4. **Reutilize** componentes de `components/StyledComponents.js`
5. **Customize** o tema em `theme.js` conforme necessário

---

**Pronto para começar! 🚀**


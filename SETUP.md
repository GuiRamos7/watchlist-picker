# 🎨 Setup e Configuração

## Bibliotecas Implementadas

### 1. Chakra UI
Chakra UI é um sistema de componentes modular e acessível para React.

**Componentes utilizados:**
- `Box`, `Container`, `Flex` - Layout
- `Heading`, `Text` - Tipografia
- `Button` - Botões interativos
- `Input` - Campos de entrada
- `VStack`, `HStack` - Stacks para organização
- `Alert`, `AlertIcon` - Notificações
- `Badge` - Tags e labels
- `Spinner` - Loading states
- `useToast` - Notificações toast

**Arquivos:**
- `theme.js` - Tema customizado com cores e estilos
- `pages/_app.js` - ChakraProvider configurado

### 2. Styled Components
Biblioteca para estilos CSS-in-JS com suporte a temas e props dinâmicas.

**Componentes criados:**
- `GradientCard` - Card principal com gradiente
- `MovieCard` - Card do filme sorteado
- `EmojiIcon` - Ícone emoji com animação

**Arquivos:**
- `components/StyledComponents.js` - Biblioteca de componentes reutilizáveis
- `.babelrc` - Configuração para SSR
- `pages/_document.js` - Setup para server-side rendering

### 3. Emotion
Dependência do Chakra UI, também suporta CSS-in-JS.

**Pacotes incluídos:**
- `@emotion/react`
- `@emotion/styled`

### 4. Framer Motion
Biblioteca de animações (dependência do Chakra UI).

---

## 📦 Dependências Adicionadas

```json
{
  "@chakra-ui/react": "^2.8.2",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "framer-motion": "^10.16.4",
  "styled-components": "^6.1.1"
}
```

**DevDependencies:**
```json
{
  "babel-plugin-styled-components": "^2.1.4"
}
```

---

## 🎨 Tema Customizado

O tema foi criado em `theme.js` e inclui:

### Cores
- **Brand colors** - Escala de roxo/violeta
- **Gradientes** - Linear gradients para efeitos visuais

### Componentes
- **Button** - Variante "gradient" customizada
- **Input** - Estilo outline customizado

### Fontes
- System fonts para melhor performance

---

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

---

## 💡 Exemplos de Uso

### Chakra UI
```jsx
import { Box, Button, useToast } from '@chakra-ui/react';

function MyComponent() {
  const toast = useToast();
  
  return (
    <Box p={4}>
      <Button 
        variant="gradient"
        onClick={() => toast({ title: 'Sucesso!' })}
      >
        Clique aqui
      </Button>
    </Box>
  );
}
```

### Styled Components
```jsx
import styled from 'styled-components';

const CustomCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 10px;
`;

function MyComponent() {
  return <CustomCard>Conteúdo</CustomCard>;
}
```

### Combinação (Chakra + Styled)
```jsx
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
```

---

## 📚 Recursos

- [Chakra UI Docs](https://chakra-ui.com/)
- [Styled Components Docs](https://styled-components.com/)
- [Emotion Docs](https://emotion.sh/)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

## 🎯 Características Implementadas

✅ Tema customizado com paleta de cores roxa
✅ Componentes reutilizáveis com styled-components
✅ Animações suaves e transições
✅ Sistema de toast para notificações
✅ Design responsivo
✅ Server-side rendering (SSR) configurado
✅ Suporte a acessibilidade (Chakra UI)
✅ Loading states e feedback visual
✅ Gradientes e efeitos visuais modernos


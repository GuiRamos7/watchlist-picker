import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import styled from 'styled-components';

// Exemplo de componente combinando Chakra UI e Styled Components

const GradientBackground = styled(Box)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const AnimatedButton = styled(Button)`
  position: relative;
  z-index: 1;
  
  &:hover {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const FloatingCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  color: #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export default function ExampleComponent() {
  return (
    <GradientBackground>
      <VStack spacing={6} position="relative" zIndex={1}>
        <Heading size="xl">Exemplo de Componente</Heading>
        
        <Text fontSize="lg" textAlign="center">
          Este componente combina Chakra UI com Styled Components
        </Text>

        <FloatingCard>
          <VStack spacing={3}>
            <Heading size="md" color="purple.600">
              Card Flutuante
            </Heading>
            <Text color="gray.600">
              Este card tem animação de flutuação
            </Text>
          </VStack>
        </FloatingCard>

        <AnimatedButton
          colorScheme="whiteAlpha"
          size="lg"
          _hover={{
            bg: 'whiteAlpha.300',
          }}
        >
          Botão Animado
        </AnimatedButton>
      </VStack>
    </GradientBackground>
  );
}

// Exportando componentes individuais para reutilização
export { GradientBackground, AnimatedButton, FloatingCard };


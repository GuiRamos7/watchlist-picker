import { useState } from 'react';
import Head from 'next/head';
import {
  Box, Container, Heading, Text, Input, Button, VStack, HStack,
  Alert, AlertIcon, Flex, Badge, Image, Stack, SimpleGrid,
  InputGroup, InputLeftElement, Tag
} from '@chakra-ui/react';
import styled from 'styled-components';

const PageWrapper = styled(Box)`
  background: #14181c;
  min-height: 100vh;
  padding: 60px 20px;
`;

const DiscoverCard = styled(Box)`
  background: linear-gradient(135deg, #1a1f24 0%, #0d1117 100%);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GreenText = styled.span`
  color: #00e054;
`;

const FilterButton = styled(Tag)`
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const MovieResultCard = styled(Box)`
  background: linear-gradient(135deg, #2c3e50 0%, #1a1f24 100%);
  color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.5s ease-out;
  border: 1px solid rgba(0, 224, 84, 0.2);

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const StyledInput = styled(Input)`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: #00e054;
  }
`;

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    shortFilms: false,
    documentaries: false,
    featureOnly: true,
    unwatched: false
  });

  console.log(result);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://watchlist-picker-jebfp9e2s-guiramos7s-projects.vercel.app/api/watchlist?username=${encodeURIComponent(username)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar watchlist');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filterName) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  return (
    <>
      <Head>
        <title>Your Watchlist, Shuffled - Letterboxd Picker</title>
        <meta name="description" content="Import your Letterboxd watchlist and let us pick your next movie night feature." />
      </Head>

      <PageWrapper>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
            {/* Left Side - Discover Card */}
            <DiscoverCard>
              <VStack align="start" spacing={4}>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="#00e054"
                  letterSpacing="2px"
                  textTransform="uppercase"
                >
                  Discover Cinema
                </Text>
                <Heading
                  fontSize={{ base: '2xl', md: '3xl' }}
                  color="white"
                  lineHeight="1.2"
                >
                  Unsure what to watch tonight?
                </Heading>
                <Text color="gray.400" fontSize="md">
                  Let fate decide. Pick a random gem from your backlog instantly.
                </Text>
              </VStack>
            </DiscoverCard>

            {/* Right Side - Main Content */}
            <MainContent>
              <VStack align="start" spacing={6}>
                {/* Title */}
                <Box>
                  <Heading
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    color="white"
                    lineHeight="1.1"
                    mb={3}
                  >
                    Your Watchlist,{' '}
                    <GreenText>Shuffled.</GreenText>
                  </Heading>
                  <Text color="gray.400" fontSize="md" maxW="500px">
                    Import your Letterboxd watchlist and let us pick your next movie night feature. 
                    No more scrolling paralysis.
                  </Text>
                </Box>

                {/* Input Form */}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <HStack spacing={0} maxW="600px">
                    <InputGroup size="lg" flex="1">
                      <InputLeftElement pointerEvents="none" color="gray.500">
                        🔗
                      </InputLeftElement>
                      <StyledInput
                        placeholder="letterboxd.com/username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        borderRightRadius="0"
                        pl="40px"
                      />
                    </InputGroup>
                    <Button
                      type="submit"
                      size="lg"
                      bg="#00e054"
                      color="white"
                      _hover={{ bg: '#00c947' }}
                      isLoading={loading}
                      loadingText="Searching..."
                      borderLeftRadius="0"
                      px={8}
                      fontWeight="bold"
                    >
                      Find a Movie ✕
                    </Button>
                  </HStack>
                </form>

                {/* Filter Tags */}
                <HStack spacing={3} flexWrap="wrap">
                  <FilterButton
                    size="md"
                    variant={filters.shortFilms ? 'solid' : 'outline'}
                    colorScheme={filters.shortFilms ? 'green' : 'gray'}
                    onClick={() => toggleFilter('shortFilms')}
                  >
                    Short Films
                  </FilterButton>
                  <FilterButton
                    size="md"
                    variant={filters.documentaries ? 'solid' : 'outline'}
                    colorScheme={filters.documentaries ? 'green' : 'gray'}
                    onClick={() => toggleFilter('documentaries')}
                  >
                    Documentaries
                  </FilterButton>
                  <FilterButton
                    size="md"
                    variant={filters.featureOnly ? 'solid' : 'outline'}
                    colorScheme={filters.featureOnly ? 'green' : 'gray'}
                    onClick={() => toggleFilter('featureOnly')}
                  >
                    Feature Films Only
                  </FilterButton>
                  <FilterButton
                    size="md"
                    variant={filters.unwatched ? 'solid' : 'outline'}
                    colorScheme={filters.unwatched ? 'green' : 'gray'}
                    onClick={() => toggleFilter('unwatched')}
                  >
                    Unwatched
                  </FilterButton>
                </HStack>

                {/* Error Alert */}
                {error && (
                  <Alert status="error" borderRadius="md" bg="rgba(220, 38, 38, 0.2)" border="1px solid rgba(220, 38, 38, 0.3)">
                    <AlertIcon color="red.400" />
                    <Text color="white">{error}</Text>
                  </Alert>
                )}

                {/* Result */}
                {result && result.selected && (
                  <VStack spacing={4} width="100%" pt={4}>
                    <MovieResultCard width="100%">
                      <Stack direction={{ base: 'column', md: 'row' }} spacing={0}>
                        {result.selected.tmdb_data?.poster && (
                          <Image
                            src={result.selected.tmdb_data.poster}
                            alt={result.selected.name || result.selected}
                            maxW={{ base: '100%', md: '200px' }}
                            objectFit="cover"
                          />
                        )}
                        <Box p={6} flex="1">
                          <HStack justify="space-between" mb={3}>
                            <Badge colorScheme="green" fontSize="md" px={2}>
                              ★ {result.selected.tmdb_data?.rating?.toFixed(1) || 'N/A'}
                            </Badge>
                            <Text fontSize="sm" color="gray.400">
                              {result.selected.tmdb_data?.year || ''}
                            </Text>
                          </HStack>
                          <Heading size="lg" mb={3} color="white">
                            {result.selected.name || result.selected}
                          </Heading>
                          <Text fontSize="sm" color="gray.300" noOfLines={4}>
                            {result.selected.tmdb_data?.overview || 'Sem sinopse disponível.'}
                          </Text>
                        </Box>
                      </Stack>
                    </MovieResultCard>

                    <HStack spacing={4} width="100%">
                      <Button
                        variant="solid"
                        bg="#00e054"
                        color="white"
                        _hover={{ bg: '#00c947' }}
                        onClick={handleSubmit}
                        size="md"
                        flex="1"
                      >
                        🔄 Shuffle Again
                      </Button>
                      <Text color="gray.500" fontSize="sm">
                        {result.totalInWatchlist || result.totalMovies} films in watchlist
                      </Text>
                    </HStack>
                  </VStack>
                )}

                {/* Loading State */}
                {loading && (
                  <Box textAlign="center" py={8} width="100%">
                    <VStack spacing={3}>
                      <Box
                        as="div"
                        width="40px"
                        height="40px"
                        border="4px solid rgba(0, 224, 84, 0.2)"
                        borderTopColor="#00e054"
                        borderRadius="50%"
                        animation="spin 1s linear infinite"
                        css={{
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' }
                          }
                        }}
                      />
                      <Text color="gray.400" fontSize="sm">
                        Analyzing your watchlist...
                      </Text>
                    </VStack>
                  </Box>
                )}
              </VStack>
            </MainContent>
          </SimpleGrid>
        </Container>
      </PageWrapper>
    </>
  );
}

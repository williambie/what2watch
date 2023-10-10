import { Box, Grid, GridItem, Show } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { MovieGrid } from './components/Main/MovieGrid/MovieGrid';
import movies from './movies.json';

function App() {
  return (
    <><Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
      templateColumns={{
        base: "1fr",
      }}
    >
      <GridItem area="nav">
        <Navbar></Navbar>
      </GridItem>
      <GridItem area="main">
        <h1>main</h1>
      </GridItem>
    </Grid>
    
    <Box padding="5">
      <MovieGrid movies={movies} />
    </Box></>
  );
}

export default App;

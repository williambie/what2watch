import { Grid, GridItem, Show } from '@chakra-ui/react';
import Navbar from './components/Navbar';

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '150px 1fr',
      }}
    >
      <GridItem area="nav" bgColor="yellow">
        <Navbar></Navbar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} bgColor="orange">
          <h1>Aside</h1>
        </GridItem>
      </Show>
      <GridItem area="main" bgColor="red">
        <h1>main</h1>
      </GridItem>
    </Grid>
  );
}

export default App;

import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Paginator from "./components/Main/Paginator";

function App() {
  return (
    <Grid
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
        <HStack justifyContent="space-evenly"><Paginator /></HStack>
      </GridItem>
    </Grid>
  );
}

export default App;

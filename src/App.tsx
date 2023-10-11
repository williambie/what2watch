import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "./components//Navbar/Navbar";
import Home from "./components/Main/Home";
import { Routes, Route } from "react-router-dom";
import Favourites from "./components/Main/Favourites/Favourites";

function App() {
  return (
    <>
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
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;

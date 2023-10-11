import { Grid, GridItem } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components//Navbar/Navbar";
import Home from "./components/Main/Home";
import Favourites from "./components/Main/Favourites/Favourites";
import MovieDetails from "./components/Main/MovieDetails/MovieDetails";

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
            <Route path="/movie/:id" element={<MovieDetails />}></Route>
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;

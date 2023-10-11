import { Grid, GridItem } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components//Navbar/Navbar";
import Home from "./components/Main/Home";
import Favourites from "./components/Main/Favourites/Favourites";
import { useState } from "react";

// App is the main component of the application
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // The main page is displayed
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
        <GridItem area="nav" maxW="100vw">
          <Navbar onSearchChange={(term) => setSearchTerm(term)}></Navbar>
        </GridItem>
        <GridItem area="main" maxW="100vw">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />}></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;

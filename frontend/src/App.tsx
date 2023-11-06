import { Grid, GridItem } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Favourites from "./components/Main/Favourites/Favourites";

// App is the main component of the application
function App() {
  // The main page is displayed
  return (
    <>
      <Grid>
        <GridItem>
          <Navbar />
        </GridItem>
        <GridItem>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;

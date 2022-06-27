import "./App.css";
import React from "react";
import Header from "./Components/Header/Header";
import SimpleBottomNavigation from "./Components/BottomNavbar/MainNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Trending from "./Components/Pages/Trending/Trending";
import Movies from "./Components/Pages/Movies/Movies";
import Series from "./Components/Pages/Series/Series";
import Search from "./Components/Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/trending" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;

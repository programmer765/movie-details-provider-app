import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import Card from "../../Card/Card";
import CustomPagination from "../../Pagination/CustomPagination";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState();
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(`
      https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [page, type]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            className="searchBox"
            label="Search"
            variant="standard"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" className="button" onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          className="tabs"
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab className="tab" label="Search Movies" />
          <Tab className="tab" label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <Card
              key={c.id}
              id={c.id}
              media_type={type ? "tv" : "movie"}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_release_date}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content.length &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          numberOfPages={Math.min(numOfPages, 500)}
        />
      )}
    </div>
  );
};

export default Search;

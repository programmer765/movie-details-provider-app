import { Chip, createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const handleClick = (genre) => {
    if (selectedGenres.includes(genre))
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    else setSelectedGenres([...selectedGenres, genre]);
    setPage(1);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setGenres(data.genres);
    };

    fetchGenres();
    return () => {
      setGenres([]);
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      <ThemeProvider theme={darkTheme}>
        {genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            clickable
            onClick={() => handleClick(genre)}
            color={selectedGenres.includes(genre) ? "primary" : "default"}
          />
        ))}
      </ThemeProvider>
    </div>
  );
};

export default Genres;

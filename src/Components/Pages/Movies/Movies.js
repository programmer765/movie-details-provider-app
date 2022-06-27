import axios from "axios";
import React, { useEffect, useState } from "react";
import useGenre from "../../../hooks/useGenre";
import Card from "../../Card/Card";
import Genres from "../../Genres/Genres";
import CustomPagination from "../../Pagination/CustomPagination";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreURL = useGenre(selectedGenres);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`
https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    };
    fetchMovie();
  }, [page, genreURL]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <Card
              key={c.id}
              id={c.id}
              media_type={"movie"}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              vote_average={c.vote_average}
            />
          ))}
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

export default Movies;

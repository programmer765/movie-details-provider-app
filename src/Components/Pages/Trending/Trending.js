import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import CustomPagination from "../../Pagination/CustomPagination";
import "./Trending.css";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(`
https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

      setContent(data.results);
    };
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <Card
              key={c.id}
              id={c.id}
              media_type={c.media_type}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;

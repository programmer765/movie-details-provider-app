import * as React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";
import "./MainNav.css";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  console.log(navigate);
  React.useEffect(() => {
    if (value === 0) navigate("/trending");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className="root"
    >
      <BottomNavigationAction
        className="child"
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        className="child"
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        className="child"
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        className="child"
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}

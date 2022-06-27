import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import React from "react";
import "./CustomPagination.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div className="pagination">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numberOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;

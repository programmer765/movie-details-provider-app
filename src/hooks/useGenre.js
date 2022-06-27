const useGenre = (selectedGenres) => {
  if (selectedGenres.length === 0) return "";
  const genreIds = selectedGenres.map((g) => g.id);
  return genreIds.reduce((prev, curr) => prev + "," + curr);
};

export default useGenre;

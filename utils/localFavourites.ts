export const toggleFavourite = (id: number): void => {
  let favourites: number[] = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  if (favourites.includes(id)) {
    favourites = favourites.filter((id) => id !== id);
  } else {
    favourites.push(id);
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
};

export const existsInFavourites = (id: number): boolean => {
  if (typeof window === "undefined") return false;

  let favourites: number[] = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  return favourites.includes(id);
};

export const getFavourites = () => {
  return JSON.parse(localStorage.getItem("favourites") || "[]");
};

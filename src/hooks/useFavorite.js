
import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";

const useFavorite = () => {
  return useContext(FavoriteContext);
};

export default useFavorite;


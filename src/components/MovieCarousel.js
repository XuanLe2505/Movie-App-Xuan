import { Button, CardActionArea, CardActions } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import apiConfig from "../app/apiConfig";
import { useLocation } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MovieCarousel = ({ movies }) => {
  let navigate = useNavigate();
  const isLogin = useAuth();
  const location = useLocation();
  const [movieIndex, setMovieIndex] = useState(0);
  const idList = useFavorite().idList;
  const setIdList = useFavorite().setIdList;
  const backgroundImage = apiConfig.originalImage(
    movies[movieIndex]?.backdrop_path
  );

  const posterImage = apiConfig.w500Image(movies[movieIndex]?.poster_path);
  console.log(isLogin.isAuthenticated);

  if (!movies[movieIndex]) return <div />;

  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            width="100%"
            image={
              movies[movieIndex].backdrop_path ? backgroundImage : posterImage
            }
            alt={movies[movieIndex]?.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movies[movieIndex]?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movies[movieIndex]?.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => setMovieIndex(movieIndex - 1)}
            disabled={movieIndex === 0}
          >
            Prev
          </Button>
          <Button
            onClick={() => setMovieIndex(movieIndex + 1)}
            disabled={movieIndex === movies.length - 1}
          >
            Next
          </Button>
          <Button
            onClick={() => navigate(`/movie/${movies[movieIndex]?.id}`)}
            state={{ backgroundLocation: location }}
          >
            See More
          </Button>
          {idList[movies[movieIndex].id] ? (
            <Button
              onClick={() =>
                setIdList({ ...idList, [movies[movieIndex].id]: false })
              }
            >
              Remove from Favorite
            </Button>
          ) : (
            <Button
              onClick={
                isLogin.isAuthenticated
                  ? () =>
                      setIdList({
                        ...idList,
                        [movies[movieIndex].id]: movies[movieIndex],
                      })
                  : () => navigate("/login")
              }
            >
              Add To Favorite
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default MovieCarousel;

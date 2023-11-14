import { useEffect, useState } from "react";
import { Paper, Box, Typography, Skeleton, IconButton } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import "./App.css";
import "./assets/scss/main.scss";

interface animeImage {
  jpg: {
    image_url: string;
  };
}

interface anime {
  mal_id: number;
  url: string;
  title: string;
  status: string;
  rating: string;
  score: number;
  synopsis: string;
  year: number;
  images: animeImage;
}

function App() {
  const [currentAnime, setCurrentAnime] = useState<number>(0);
  const [animeList, setAnimeList] = useState<anime[]>([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime")
      .then((response) => response.json())
      .then((res) => {
        const { data } = res;
        setAnimeList(data);
      });
  }, []);

  const handleNavigateAnimeList = (dir: string) => {
    switch (dir) {
      case "previous":
        setCurrentAnime((n) => n - 1);
        break;
      case "next":
        setCurrentAnime((n) => n + 1);
        break;
    }
  };

  return (
    <Box className="anime-cont">
      <Paper
        className="anime-view"
        elevation={0}
        // style={
        //   animeList.length !== 0
        //     ? {
        //         backgroundImage: `url(${animeList[currentAnime].images.jpg.image_url})`,
        //       }
        //     : {}
        // }
      >
        <IconButton
          disabled={currentAnime === 0}
          onClick={() => handleNavigateAnimeList("previous")}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <Box className="anime-details">
          {animeList.length !== 0 ? (
            <>
              <Typography variant="h4">
                {animeList[currentAnime].title}
              </Typography>
              <Typography variant="h6">
                {animeList.length !== 0 ? animeList[currentAnime].year : "--"}
              </Typography>
              <Typography variant="h6">
                {animeList.length !== 0 ? animeList[currentAnime].status : "--"}
              </Typography>
              <Typography variant="subtitle1">
                {animeList.length !== 0
                  ? animeList[currentAnime].synopsis
                  : "--"}
              </Typography>
            </>
          ) : (
            <>
              <Skeleton variant="text" />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="rounded" height={160} />
            </>
          )}
        </Box>
        <Box className="anime-poster">
          {animeList.length !== 0 ? (
            <img alt src={animeList[currentAnime].images.jpg.image_url} />
          ) : (
            <Skeleton variant="rounded" height={350} />
          )}
        </Box>
        <IconButton
          disabled={currentAnime === animeList.length - 1}
          onClick={() => handleNavigateAnimeList("next")}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default App;

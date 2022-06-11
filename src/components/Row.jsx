import React, { useState, useEffect } from "react";
import Axios from "../helper/axios";
import "../styles/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { Modal } from "react-bootstrap";

const base_url = "http://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get(fetchUrl);
      //   console.table(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.table(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // asdas
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    setModalShow(true);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(null, { tmdbId: movie.id })
        .then((url) => {
          console.log("url is " + url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("urlParams" + urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
            onClick={() => handleClick(movie)}
          />
        ))}
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="my-modal"
          onHide={() => setModalShow(false)}
        >
          <Modal.Body>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Row;

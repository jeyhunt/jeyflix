import React, { useEffect, useState } from "react";
import Axios from "../helper/axios";
import requests from "../helper/requests";
import "../styles/Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { Modal } from "react-bootstrap";

const base_url = "http://image.tmdb.org/t/p/original/";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get(requests.fetchTrending);
      //   console.table(request.data.results);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

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
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-desc">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fadeBottom"></div>
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
    </header>
  );
};

export default Banner;

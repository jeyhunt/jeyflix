import React from "react";
import Row from "../components/Row";
import Banner from "../components/Banner";
import request from "../helper/requests";
import MyNavbar from "../components/MyNavbar";
import "../styles/Home.css";
import "animate.css";

const Home = () => {
  return (
    <div className="home animate__animated animate__fadeIn">
      <MyNavbar />
      <Banner />
      <Row
        title="Netflix Originals"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
    </div>
  );
};

export default Home;

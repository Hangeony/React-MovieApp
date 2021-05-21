import { React, useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Section/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from "./Section/Favorite";
import { Row } from "antd";

function MovieDetail(props) {
  // console.log(props);
  const movieId = props.match.params.movieId;
  const [Movie, setMoive] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    // console.log(props.match);
    let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    fetch(endPointInfo)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setMoive(response);
      });

    fetch(endpointForCasts)
      .then((response) => response.json())
      .then((response) => {
        console.log(`responseForCrew`, response);
        setCasts(response.cast);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* 모든 movie정보를 프랍이름을 이용해서 Favorite로 보냄 */}
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>

        {/* Movie info */}
        <MovieInfo movie={Movie} />
        <br />
        {/* Actors Grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <GridCards
                  image={
                    cast.profile_path
                      ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                      : null
                  }
                  characterName={cast.name}
                />
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;

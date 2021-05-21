import React, { useEffect, useState } from "react";
import axios from "axios";
import { Popover } from "antd";
import "./Favorite.css";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    //내가 favorite한 정보를 서버에 저장하는 코드
    axios
      .post("/api/favorite/getFavoredMoive", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setFavorites(response.data.favorites);
        } else {
          alert("영화정보를 가져오지 못 했습니다.");
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    axios
      .post("/api/favorite/removeFromFavoriteList", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("리스트에서 지우는데 실패하였습니다.");
        }
      });
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /* 좋아요한 영화가 여러개 들어갈 때 Map으로 처리함. */
  }
  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {/* 영화 포스터가 만약에 있으면 */}
        {favorite.moviePost ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mis</td>
        <td>
          {/* renderCards에 있는 정보를 가져가다 사용 해야하기 때문에 정보를 넣어줘야함. */}
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2> Favorite Movies </h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;

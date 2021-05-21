const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongoose").Types;
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  //mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    //그다음에 숫자를 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  //내가 영화를 Favorite 리스트에 넣었는지 확인

  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  //밑에서 저장한 정보를 DB에 찾아서 지우기만 하면된다.
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc }); // db에러를 프론트로 보내줄때
  });
});

router.post("/addToFavorite", (req, res) => {
  //model favorited을 이용해서  다큐먼트 인스턴스를 생성
  const favorite = new Favorite(req.body);
  //req에 정보들이 favorite에 다들어감
  //err 처리
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getFavoredMoive", (req, res) => {
  console.log(req.body);
  //좋아요를 누른 영화를 Favorite모델을 가져오는 코드
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

router.post("/removeFromFavoriteList", (req, res) => {
  //FavoritePage에서 좋아요한 영화를 지우는 코드
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});

module.exports = router;
///api/favorite/favorited

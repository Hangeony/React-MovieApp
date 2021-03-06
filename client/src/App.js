import React, { Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Auth from "./hoc/auth";
import "./App.css";
//page for this product
import LandingPage from "./component/views/LandingPage/LandingPage";
import LoginPage from "./component/views/LoginPage/LoginPage";
import RegisterPage from "./component/views/RegisterPage/RegisterPage";
import Navbar from "./component/views/NavBar/NavBar";
// import Footer from "./component/views/Footer/Footer";
import MovieDetail from "./component/views/MovieDetail/MovieDetail";
import FavoritePage from "./component/views/FavoritePage/FavoritePage";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route
              exact
              path="/movie/:movieId"
              component={Auth(MovieDetail, null)}
            />
            <Route
              exact
              path="/favorite"
              component={Auth(FavoritePage, true)}
            />
          </Switch>
        </div>
        {/* <Footer /> */}
      </Suspense>
    </>
  );
}

export default App;

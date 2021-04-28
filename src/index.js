import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/css/paper-kit.css";
// import "assets/css/paper-kit.min.css";
// import "assets/css/paper-kit.css.map";
import "assets/demo/demo.css";
// import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

// styles nhưng mà tự làm 

// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import AnimalDictionary from "views/examples/AnimalDictionary.js";
import E_S_P_C_map from "views/examples/E_S_P_C_map.js";

// pages tự làm 

// pages nhưng mà tự làm 


// others 
import "../src/assets/js/FindingAnimal.js"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route 
        path="/animals-dictionary"
        render={(props) => <AnimalDictionary {...props} />}
      />
      <Route
      path="/animal-map"
      render={(props) => <E_S_P_C_map {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

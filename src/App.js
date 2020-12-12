import { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import FixtureAnalysis from "./components/FixtureAnalysis";
import NewAnalysis from "./components/NewAnalysis";
import ContestTable from "./components/ContestTable";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import SiteContext from "./DAL/api/context/site-context";
import Navigatorbar from "./components/Navigatorbar";

function App() {
  const [user, setUser] = useState(SiteContext);

  const setNewUser = newUser => {
    setUser(newUser);
  }

  return (
    <SiteContext.Provider value={{user, setUser: setNewUser}}>
      <BrowserRouter>
        <Container fluid>
          <header>
            <Navigatorbar />
          </header>
          <main>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/fixture-analysis/:leagueId/:fixtureId/:section">
              <FixtureAnalysis />
            </Route>
            <Route path="/new-analysis/:fixtureId">
              <NewAnalysis />
            </Route>
            <Route path="/contests">
              <ContestTable />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/my-profile">
              <MyProfile />
            </Route>
          </main>
        </Container>
      </BrowserRouter>
    </SiteContext.Provider>
  );
}
export default App;

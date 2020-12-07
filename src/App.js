// import { BrowseRouter } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import FixtureAnalysis from "./components/FixtureAnalysis";
import NewAnalysis from './components/NewAnalysis';
import Navbar from "./components/Navigatorbar";
import { Container } from "react-bootstrap";
import Prediction from "./components/Prediction";
import ContestTable from "./components/ContestTable";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <header>
          <Navbar />
        </header>
        <main>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/fixture-analysis/:leagueId/:fixtureId">
            <FixtureAnalysis />
          </Route>
          <Route path="/new-analysis/:fixtureId">
            <NewAnalysis />
          </Route>
          <Route path="/contests">
            <ContestTable />
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/my-profile">
            <MyProfile/>
          </Route>
          
          
        </main>
      </Container>
    </BrowserRouter>
  );
}
export default App;

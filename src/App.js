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
          <Route path="/fixture-analysis/:fixtureId">
            <FixtureAnalysis />
          </Route>
          <Route path="/new-analysis/:fixtureId">
            <NewAnalysis />
          </Route>
          
        </main>
      </Container>
    </BrowserRouter>
  );
}
export default App;

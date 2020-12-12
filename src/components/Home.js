import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { getNextFixture } from "../DAL/api/api-football";
import ImageCarousel from "./ImageCarousel";


const Home = (props) => {
  const [fixtures, setFixtures] = useState([]);

  const getFixure = async ({ target: btn }) => {
    const games = await getNextFixture(btn.getAttribute("leagueId"), 10);
    setFixtures(games);
  };
  useEffect(() => {
    const getInfo = async () => {
      const games = await getNextFixture(2833, 10);
      setFixtures(games);
    };
    getInfo();
  }, []);

  return (
    <>
      <ImageCarousel />

      <Row className="mt-5 mb-5">
        <Col md="2">
          <Button
            onClick={getFixure}
            variant="outline-primary"
            block
            leagueId="2833"
          >
            Spain
          </Button>
        </Col>
        <Col md="2">
          <Button
            onClick={getFixure}
            variant="outline-secondary"
            block
            leagueId="2857"
          >
            Italy
          </Button>
        </Col>
        <Col md="2">
          <Button
            onClick={getFixure}
            variant="outline-success"
            block
            leagueId="2790"
          >
            England
          </Button>
        </Col>
        <Col md="2">
          <Button
            onClick={getFixure}
            variant="outline-warning"
            block
            leagueId="2755"
          >
            Germany
          </Button>
        </Col>
        <Col md="2">
          <Button
            onClick={getFixure}
            variant="outline-danger"
            block
            leagueId="2664"
          >
            France
          </Button>
        </Col>
        <Col md="2">
          <Button
            onClick={getFixure}
            variant="outline-info"
            block
            leagueId="2708"
          >
            Israel
          </Button>
        </Col>
      </Row>
      <Row>
        {fixtures.map((fixture) => (
          <Col md="3">
            <Card>
              <Row>
                <Col md="5">
                  <Card.Img
                    src={fixture.homeTeam.logo}
                    variant="top"
                  ></Card.Img>
                </Col>
                <Col md="2" className="px-0">
                  <Card.Img src={fixture.league.logo} variant="top"></Card.Img>
                </Col>
                <Col md="5">
                  <Card.Img
                    src={fixture.awayTeam.logo}
                    variant="top"
                  ></Card.Img>
                </Col>
              </Row>

              <Card.Body>
                <Card.Title>
                  {fixture.homeTeam.team_name} Vs. {fixture.awayTeam.team_name}
                </Card.Title>
                <Card.Text>
                  <ListGroup>
                    <ListGroup.Item>
                      {new Date(fixture.event_date).toLocaleString("he-IL")}
                    </ListGroup.Item>
                    <ListGroup.Item>{fixture.round}</ListGroup.Item>
                    <ListGroup.Item>{fixture.venue}</ListGroup.Item>
                  </ListGroup>
                </Card.Text>

                <NavLink
                  className="nav-link"
                  to={`/fixture-analysis/${fixture.league_id}/${fixture.fixture_id}/fixture-stats`}
                >
                  <Button variant="primary" block>
                    Analyze
                  </Button>
                </NavLink>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";

import { getNextFixture } from "../DAL/api/api-football";

const Home = (props) => {
  const [fixtures, setFixtures] = useState([]);

  const getFixure = async ({ target: btn }) => {
    const games = await getNextFixture(btn.getAttribute("leagueId"), 10);
    setFixtures(games);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          {" "}
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar>
        </Col>
      </Row>
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
                <Button variant="primary" block>Go somewhere</Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

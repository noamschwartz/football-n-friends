import { useParams } from "react-router-dom";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import FixtureStats from "./FixtureStats";
import Prediction from "./Prediction";

const FixtureAnalysis = () => {
  const { fixtureId } = useParams();



  console.log(fixtureId);
  return (
    <Container fluid>
      <Row>
        <Col>Team Logo</Col>
        <Col>Fixture Name</Col>
        <Col>Team Logo</Col>
      </Row>

      <Row>
        <Col>
          <Tabs defaultActiveKey="fixture-stats" id="uncontrolled-tab-example">
            <Tab eventKey="fixture-stats" title="Fixture Stats">
              <FixtureStats fixtureId={fixtureId} />
            </Tab>
            <Tab eventKey="team-stats" title="Team Stats">
              Shahar
            </Tab>
            <Tab eventKey="standings" title="Standings">
              Tal
            </Tab>
            <Tab eventKey="predictions" title="Predictions">
              <Prediction fixtureId={fixtureId}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FixtureAnalysis;

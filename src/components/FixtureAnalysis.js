import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Image,
  Jumbotron,
} from "react-bootstrap";
import { useEffect, useState } from "react";

import FixtureStats from "./FixtureStats";
import Prediction from "./Prediction";
import TeamStats from "./TeamStats";
import Standings from "./Standings";
import { getFixtureInfo } from "../DAL/api/api-football";
const FixtureAnalysis = () => {
  const { fixtureId, leagueId } = useParams();

  const [info, setStats] = useState(null);
  useEffect(() => {
    const getStats = async () => {
      const newInfo = await getFixtureInfo(fixtureId);
      setStats(newInfo);
    };
    getStats();
  }, []);

  return (
    <Container fluid>
      {info && (
        <Jumbotron fluid className="text-center">
          <Row>
            <Col xs={6} md={4}>
              <Image src={`${info.homeTeam.logo}`} rounded />
            </Col>
            <Col xs={6} md={4}>
              <h4>{`${info.homeTeam.team_name} - ${info.awayTeam.team_name}`}</h4>
            </Col>
            <Col xs={6} md={4}>
              <Image src={`${info.awayTeam.logo}`} rounded />
            </Col>
          </Row>
        </Jumbotron>
      )}

      <Row>
        <Col>
          <Tabs defaultActiveKey="fixture-stats" id="uncontrolled-tab-example">
            <Tab eventKey="fixture-stats" title="Fixture Stats">
              <FixtureStats fixtureId={fixtureId} />
            </Tab>
            <Tab eventKey="team-stats" title="Team Stats">
              <TeamStats fixtureId={fixtureId} />
            </Tab>
            <Tab eventKey="standings" title="Standings">
              <Standings fixtureId={fixtureId} leagueId={leagueId} />
            </Tab>
            <Tab eventKey="predictions" title="Predictions">
              <Prediction fixtureId={fixtureId} />
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

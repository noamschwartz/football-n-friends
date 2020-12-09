import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Image,
  Jumbotron,
  Button
} from "react-bootstrap";
import { useEffect, useState } from "react";

import FixtureStats from "./FixtureStats";
import Prediction from "./Prediction";
import TeamStats from "./TeamStats";
import Standings from "./Standings";
import { getFixtureInfo, getFixtureStats } from "../DAL/api/api-football";
const FixtureAnalysis = () => {
  const { fixtureId, section } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [info, setInfo] = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const getInfo = async () => {
      const newInfo = await getFixtureInfo(fixtureId);
      setInfo(newInfo);
    };
    getInfo();
  }, []);

  useEffect(() => {
    const getStats = async () => {
      const newStats = await getFixtureStats(fixtureId);
      setStats(newStats);
    };
    getStats();
  }, []);

  const navigateToAnalysis = () => {
    history.push(`/new-analysis/${fixtureId}`);
  };

  const redirectTo = (ek) => {
    let path = location.pathname;
    history.push(`${path.substring(0, path.lastIndexOf("/") + 1)}${ek}`);
  };

  return (
    <Container fluid>
      
      {info && (
        <>
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
          <Button onClick={navigateToAnalysis}>Create New Analysis</Button>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey={section}
                id="uncontrolled-tab-example"
                onSelect={redirectTo}
              >
                <Tab eventKey="fixture-stats" title="Fixture Stats">
                  <FixtureStats fixtureInfo={stats} fixtureId={fixtureId} />
                </Tab>
                <Tab eventKey="team-stats" title="Team Stats">
                  <TeamStats fixtureInfo={stats} fixtureId={fixtureId} />
                </Tab>
                <Tab eventKey="standings" title="Standings">
                  <Standings fixtureId={fixtureId} leagueId={info.league_id} />
                </Tab>
                <Tab eventKey="predictions" title="Predictions">
                  <Prediction fixtureInfo={stats} fixtureId={fixtureId} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </>
      )}

      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FixtureAnalysis;

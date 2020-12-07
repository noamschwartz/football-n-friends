import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { VictoryPie, VictoryChart, VictoryLegend } from "victory";

import { getFixtureStats } from "../DAL/api/api-football";


const TeamStats = (props) => {
  const history = useHistory();
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const getStats = async () => {
      const newStats = await getFixtureStats(props.fixtureId);
      setStats(newStats);
    };
    getStats();
  }, []);

  const navigateToAnalysis = () => {
    history.push(`/new-analysis/${props.fixtureId}`);
  };

  return (
    <Container fluid>
      <Button onClick={navigateToAnalysis}>Create New Analysis</Button>
      <Row>
        {stats &&
          Object.keys(stats.teams.home.all_last_matches.matchs).map((field) => (
            <Col md="4">
              <VictoryChart>
                <VictoryLegend
                  x={125}
                  y={0}
                  title={field}
                  centerTitle
                  orientation="horizontal"
                  //   gutter={20}
                  //   style={{
                  //     border: { stroke: "black" },
                  //     title: { fontSize: 20 },
                  //   }}
                  data={[
                    {
                      name: stats.teams.home.team_name,
                      symbol: { fill: "navy" },
                    },
                    {
                      name: stats.teams.away.team_name,
                      symbol: { fill: "tomato" },
                    },
                  ]}
                />
                <VictoryPie
                  colorScale={["navy", "tomato"]}
                  data={[
                    { x: "home", y: parseInt(stats.teams.home.all_last_matches.matchs[field].home) },
                    { x: "away", y: parseInt(stats.teams.home.all_last_matches.matchs[field].away) },
                    // { x: "total", y: parseInt(stats.teams.home.all_last_matches.matchs[field].total) },
                  ]}
                />
              </VictoryChart>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default TeamStats;

import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as V from "victory";
import { VictoryPie, VictoryChart, VictoryLegend } from "victory";

import { getFixtureStats } from "../DAL/api/api-football";

const FixtureStats = (props) => {
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
          Object.keys(stats.comparison).map((field) => (
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
                      symbol: { fill: "lightblue" },
                    },
                    {
                      name: stats.teams.away.team_name,
                      symbol: { fill: "lightgreen" },
                    },
                  ]}
                />
                <VictoryPie
                  colorScale={["lightblue", "lightgreen"]}
                  data={[
                    { x: "home", y: parseInt(stats.comparison[field].home) },
                    { x: "away", y: parseInt(stats.comparison[field].away) },
                  ]}
                />
              </VictoryChart>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default FixtureStats;

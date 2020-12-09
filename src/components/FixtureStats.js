import { Container, Row, Col } from "react-bootstrap";

import { VictoryPie, VictoryChart, VictoryLegend } from "victory";

const FixtureStats = (props) => {


  return (
    <Container fluid>
      
      <Row>
        {props.fixtureInfo &&
          Object.keys(props.fixtureInfo.comparison).map((field) => (
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
                      name: props.fixtureInfo.teams.home.team_name,
                      symbol: { fill: "navy" },
                    },
                    {
                      name: props.fixtureInfo.teams.away.team_name,
                      symbol: { fill: "tomato" },
                    },
                  ]}
                />
                <VictoryPie
                  colorScale={["navy", "tomato"]}
                  data={[
                    { x: "home", y: parseInt(props.fixtureInfo.comparison[field].home) },
                    { x: "away", y: parseInt(props.fixtureInfo.comparison[field].away) },
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

import { Button, ListGroup, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import UsersAnalysis from "./UsersAnalysis";
import { getFixtureStats } from "../DAL/api/api-football";
import { useEffect, useState } from "react";
import { VictoryBoxPlot, VictoryPie } from "victory";
const Prediction = (props) => {
  const history = useHistory();

  const [prediction, setStats] = useState(null);
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
    <>
      <Button onClick={navigateToAnalysis}>Create New Analysis</Button>
      {prediction && (
        <Table striped bordered hover>
          <thead>
            <tr>

              <th>Advice</th>
              <th>Under/Over</th>
              <th>Winning Percent</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td><h2>{prediction.advice}</h2></td>
              <td><h2>{prediction.under_over}</h2></td>
              <td>
                <VictoryPie
                  colorScale={["navy", "tomato", "green"]}
                  data={[
                    { x: "home", y: parseInt(prediction.winning_percent.home)},
                    { x: "draw", y: parseInt(prediction.winning_percent.draws)},
                    { x: "away", y: parseInt(prediction.winning_percent.away)},
                  ]}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      <h5>Users Analysis</h5>
      <UsersAnalysis />
    </>
  );
};

export default Prediction;

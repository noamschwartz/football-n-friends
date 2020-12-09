import { Table } from "react-bootstrap";


import UsersAnalysis from "./UsersAnalysis";
import {  VictoryPie } from "victory";

const Prediction = (props) => {



  return (
    <>

      {props.fixtureInfo && (
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

              <td><h2>{props.fixtureInfo.advice}</h2></td>
              <td><h2>{props.fixtureInfo.under_over}</h2></td>
              <td>
                <VictoryPie
                  colorScale={["navy", "tomato", "green"]}
                  data={[
                    { x: "home", y: parseInt(props.fixtureInfo.winning_percent.home)},
                    { x: "draw", y: parseInt(props.fixtureInfo.winning_percent.draws)},
                    { x: "away", y: parseInt(props.fixtureInfo.winning_percent.away)},
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

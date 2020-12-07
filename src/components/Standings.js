import { useEffect, useState } from "react";
import { Table, Image, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { getStandings } from "../DAL/api/api-football";

const Standings = (props) => {
  const history = useHistory();
  const [standings, setStandings] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      const stats = await getStandings(props.leagueId);
      setStandings(stats);
    };
    getStats();
  }, []);

  const navigateToAnalysis = () => {
    history.push(`/new-analysis/${props.fixtureId}`);
  };

  return (
    <>
      <Button onClick={navigateToAnalysis}>Create New Analysis</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>G</th>
            <th>Pts</th>
            <th>Form</th>
          </tr>
        </thead>
        <tbody>
          {standings &&
            standings.map((team) => (
              <tr>
                <td>{team.rank}</td>
                <td>
                  {" "}
                  <Image width={"35px"} src={team.logo} rounded />{" "}
                  {team.teamName}
                </td>
                <td>{team.all.matchsPlayed}</td>
                <td>{team.all.win}</td>
                <td>{team.all.draw}</td>
                <td>{team.all.lose}</td>
                <td>{`${team.all.goalsFor}:${team.all.goalsAgainst}`}</td>
                <td>{team.points}</td>
                <td>{team.forme}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Standings;

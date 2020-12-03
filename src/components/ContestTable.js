import { Table } from "react-bootstrap";

const ContestTable = () => {
  const users = [
    { name: "Noam", score: 6 },
    { name: "Shahar", score: 7 },
    { name: "Tal", score: 9 },
    { name: "David", score: 2 },
  ];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {users
          .sort((first, second) => second.score - first.score)
          .map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ContestTable;

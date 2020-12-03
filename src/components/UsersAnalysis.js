import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";

import {
  addNewAnalysis,
  getUsersFixtureAnalysis,
} from "../DAL/api/api-football";

const UsersAnalysis = () => {
  const { fixtureId } = useParams();
  const [usersFixtureAnalysis, setUsersFixtureAnalysis] = useState([]);

  useEffect(() => {
    const getFixtureAnalysis = () => {
      const newAnalysis = getUsersFixtureAnalysis(fixtureId);
      setUsersFixtureAnalysis(newAnalysis);
    };
    getFixtureAnalysis();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            {usersFixtureAnalysis.map((analysis, index) => (
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                  {analysis.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${index}`}>
                  <Card.Body>{analysis.analysis}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersAnalysis;

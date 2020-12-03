import {Row, Col, Navbar, Nav, Form, Button} from 'react-bootstrap';

const Navigatorbar = () => {
  return (
    <Row>
      <Col>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form inline>
            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
      </Col>
    </Row>
  );
};

export default Navigatorbar;

import { useContext } from "react";
import { Row, Col, Navbar, Nav, Form, Button } from "react-bootstrap";
import SiteContext from "../DAL/api/context/site-context";
import { logout } from "../DAL/api/api-football";
import { useHistory } from "react-router-dom";

const Navigatorbar = () => {
  const { user, setUser } = useContext(SiteContext);
  const history = useHistory();

  const logoutUser = async () => {
    await logout();
    setUser({
      id: 0,
      name: "",
      email: "",
      image: "",
    });
    history.push("/");
  };

  return (
    <Row>
      <Col>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Football-N-Friends</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/contests">Contests</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          { (
            <Nav className="mr-auto">
              <Nav.Link href="/my-profile">My Profile</Nav.Link>
              <Nav.Link href="/my-profile">{user?.name}</Nav.Link>
              <Nav.Link onClick={logoutUser}>logout</Nav.Link>
            </Nav>
          )}
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
      </Col>
    </Row>
  );
};

export default Navigatorbar;

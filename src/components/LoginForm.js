import { useState, useContext } from "react";
import SiteContext from "../DAL/api/context/site-context";

import { Container, Row, Col, Alert, Button, Form } from "react-bootstrap";
import Field from "../validators/Validator";
import { login } from "../DAL/api/api-football";
import { useHistory } from "react-router-dom";
import { getUser } from "../DAL/api/cookieStorage";

const LoginForm = () => {
  const [fields, setFields] = useState({
    email: new Field({
      name: "email",
      value: "",
      required: true,
      pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    }),
    password: new Field({
      name: "password",
      value: "",
      required: true,
      minLength: 8,
    }),
  });

  const [forbidden, setForbidden] = useState("");
  const history = useHistory();
  const siteContext = useContext(SiteContext);
  const submit = async (e) => {
    e.preventDefault();
    let isValid = true;
    for (let field in { ...fields }) {
      isValid &= validate(field, fields[field].value);
    }

    if (isValid) {
      const credentials = Object.keys(fields).reduce((result, prop) => {
        result[prop] = fields[prop].value;
        return result;
      }, {});
      const result = await login(credentials.email, credentials.password);
      if (!result) {
        setForbidden("Incorrect email or password");
      } else {
        const user = getUser();
        siteContext.setUser(user);
        history.push("/");
      }
    }
  };
  const setValue = (e) => {
    validate(e.target.name, e.target.value);
  };

  const validate = (name, value) => {
    const copy = { ...fields };

    const field = copy[name];

    if (field.isValid(value, "is-invalid", "error")) field.value = value;

    setFields(copy);

    return field.errors.length === 0;
  };

  return (
    <>
      <Container fluid>
        <Alert variant="info">
          <h4>Welcome Back! Please Login</h4>
          <hr />
          <Form onSubmit={submit}>
            <Row>
              <Col>
                {" "}
                <Form.Group>
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    id="email"
                    type="email"
                    name="email"
                    className={`form-control ${fields.email.errorClassList.join(
                      " "
                    )}`}
                    placeholder="Enter your email"
                    defaultValue={fields.email.value}
                    onBlur={setValue}
                  />
                  {fields.email.errors.map((error) => (
                    <div
                      key={error}
                      id="emailFeedback"
                      className="invalid-feedback"
                      aria-describedby="emailFeedback"
                      style={{ display: "block" }}
                    >
                      {error}
                    </div>
                  ))}
                </Form.Group>{" "}
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Group>
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    id="password"
                    type="password"
                    name="password"
                    className={`form-control ${fields.password.errorClassList.join(
                      " "
                    )}`}
                    placeholder="Enter password"
                    defaultValue={fields.password.value}
                    onBlur={setValue}
                  />
                  {fields.password.errors.map((error) => (
                    <div
                      key={error}
                      id="passwordFeedback"
                      className="invalid-feedback"
                      aria-describedby="passwordFeedback"
                      style={{ display: "block" }}
                    >
                      {error}
                    </div>
                  ))}
                  {
                    <div
                      key="unauthorized"
                      id="passwordFeedback"
                      className="invalid-feedback"
                      aria-describedby="passwordFeedback"
                      style={{ display: "block" }}
                    >
                      {forbidden}
                    </div>
                  }
                </Form.Group>{" "}
              </Col>
            </Row>

            <Button variant="primary" type="submit" block>
              Login
            </Button>
          </Form>
        </Alert>
      </Container>
    </>
  );
};

LoginForm.contextType = SiteContext;
export default LoginForm;

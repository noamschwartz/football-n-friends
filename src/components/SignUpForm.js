import { useState } from "react";

import { Container, Row, Col, Alert, Button, Form } from "react-bootstrap";
import Field from "../validators/Validator";
import { addNewUser } from "../DAL/api/api-football";

const SignUpForm = () => {
  const [fields, setFields] = useState({
    name: new Field({
      name: "name",
      value: "",
      required: true,
      minLength: 2,
    }),
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
    rePassword: new Field({
      name: "rePassword",
      value: "",
      required: true,
      minLength: 8,
    }),

    profilePic: new Field({
      name: "profilePic",
      value: "",
    }),
  });

  const submit = (e) => {
    e.preventDefault();
    let isValid = true;
    for (let field in { ...fields }) {
      isValid &= validate(field, fields[field].value);
    }

    if (isValid) {
      const info = Object.keys(fields).reduce((result, prop) => {
        result[prop] = fields[prop].value;
        return result;
      }, {});
      addNewUser(info);
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
          <h4>Sign-Up Form</h4>
          <hr />
          <Form onSubmit={submit}>
            <Row>
              <Col>
                {" "}
                <Form.Group controlId="nameFeedback">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    id="user-name"
                    type="text"
                    name="name"
                    className={`form-control ${fields.name.errorClassList.join(
                      " "
                    )}`}
                    placeholder="Enter your name"
                    defaultValue={fields.name.value}
                    onBlur={setValue}
                  />
                  {fields.name.errors.map((error) => (
                    <div
                      key={error}
                      id="nameFeedback"
                      className="invalid-feedback"
                      aria-describedby="nameFeedback"
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
                <Form.Group controlId="nameFeedback">
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
                <Form.Group controlId="nameFeedback">
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
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8 characters long.
                  </Form.Text>
                  {fields.password.errors.map((error) => (
                    <div
                      key={error}
                      id="nameFeedback"
                      className="invalid-feedback"
                      aria-describedby="nameFeedback"
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
                <Form.Group controlId="nameFeedback">
                  <Form.Label>Re-Type Password</Form.Label>

                  <Form.Control
                    id="re-password"
                    type="password"
                    name="rePassword"
                    className={`form-control ${fields.rePassword.errorClassList.join(
                      " "
                    )}`}
                    placeholder="Re-type your password"
                    defaultValue={fields.rePassword.value}
                    onBlur={setValue}
                  />
                  {fields.rePassword.errors.map((error) => (
                    <div
                      key={error}
                      id="rePasswordFeedback"
                      className="invalid-feedback"
                      aria-describedby="rePasswordFeedback"
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
                <Form.Group>
                  <Form.File
                    id="profilePic"
                    label="Upload a Profile Picture"
                    type="text"
                    name="profilePic"
                    placeholder="Re-type your password"
                    defaultValue={fields.profilePic.value}
                    onBlur={setValue}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" block>
              Sign Up
            </Button>
          </Form>
        </Alert>
      </Container>
    </>
  );
};

export default SignUpForm;

import { useState } from "react";

import { Container, Row, Col, Alert, Button, Form } from "react-bootstrap";
import Field from "../validators/Validator";


const UserAccount = () => {
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
      //   addNewUser(info);
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
          <h4>My Account</h4>
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
                    placeholder="Your name"
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
                    type="text"
                    name="email"
                    className={`form-control ${fields.email.errorClassList.join(
                      " "
                    )}`}
                    placeholder="Your email"
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
                    type="text"
                    name="password"
                    className={`form-control ${fields.password.errorClassList.join(
                      " "
                    )}`}
                    placeholder="Password"
                    defaultValue={fields.password.value}
                    onBlur={setValue}
                    disabled
                  />
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
                <Form.Group>
                  <Form.File
                    id="profilePic"
                    label="Update or Upload a Profile Picture"
                    type="text"
                    name="profilePic"
                    defaultValue={fields.profilePic.value}
                    onBlur={setValue}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" block>
              Update
            </Button>
          </Form>
        </Alert>
      </Container>
    </>
  );
};

export default UserAccount;

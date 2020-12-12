import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeading, faChartBar } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Nav,
  Row,
  Col,
  Card,
  Accordion,
  Button,
  Tabs,
  Tab,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Field from "../validators/Validator";

import { addNewAnalysis } from "../DAL/api/api-football";
import { getUser } from "../DAL/api/cookieStorage";

const NewAnalysis = () => {
  const { fixtureId } = useParams();
  const [fields, setFields] = useState({
    pick: new Field({ name: "pick", value: "", required: true }),

    title: new Field({
      name: "title",
      value: "",
      required: true,
      minLength: 2,
    }),

    exposure: new Field({ name: "exposure", value: "", required: true }),

    analysis: new Field({
      name: "analysis",
      value: "",
      required: true,
      minLength: 10,
    }),

    confidence: new Field({ name: "confidence", value: "", required: true }),
  });

  const submit = (e) => {
    e.preventDefault();
    let isValid = true;
    for (let field in { ...fields }) {
      isValid &= validate(field, fields[field].value);
    }

    if (isValid) {
      const analysis = Object.keys(fields).reduce((result, prop) => {
        result[prop] = fields[prop].value;
        return result;
      }, {});

        addNewAnalysis({fixtureId:fixtureId, ...analysis});
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

  const picks = [
    { name: "1", value: "1" },
    { name: "X", value: "X" },
    { name: "2", value: "2" },
  ];
  const confidenceLevel = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5", value: "5" },
    { name: "6", value: "6" },
    { name: "7", value: "7" },
    { name: "8", value: "8" },
    { name: "9", value: "9" },
    { name: "10", value: "10" },
  ];

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="alert alert-info" role="alert">
              <h4 className="alert-heading text-center">Match Analysis</h4>
              <p className="text-center">Match Title</p>
              <hr />
              <Form onSubmit={submit}>
                <Row>
                  <Col>
                    {" "}
                    <Form.Group >
                      <Form.Label>Title</Form.Label>
                      <FontAwesomeIcon icon={faHeading} size="1x" />
                      <Form.Control
                        id="user-name"
                        type="text"
                        name="title"
                        className={`form-control ${fields.title.errorClassList.join(
                          " "
                        )}`}
                        placeholder="Enter title"
                        defaultValue={fields.title.value}
                        onBlur={setValue}
                      />
                      {fields.title.errors.map((error) => (
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
                  <Col>
                    <Form.Label>Who can see my analysis</Form.Label>

                    <div className="mb-3">
                      <div>
                        <Form.Check
                          name="exposure"
                          inline
                          label="Everyone"
                          type="radio"
                          id="inline-exposure-everyone"
                          value="everyone"
                          onBlur={setValue}
                        />
                        <Form.Check
                          name="exposure"
                          inline
                          label="Only me"
                          type="radio"
                          id="inline-exposure-onlyme"
                          value="onlyme"
                          onBlur={setValue}
                        />
                      </div>
                      {fields.exposure.errors.map((error) => (
                        <div
                          key={error}
                          className="invalid-feedback"
                          aria-describedby="nameFeedback"
                          style={{ display: "block" }}
                        >
                          {error}
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Pick</Form.Label>
                      <ButtonGroup toggle>
                        {picks.map((pick, idx) => (
                          <ToggleButton
                            key={idx}
                            type="radio"
                            variant="primary"
                            name="pick"
                            value={pick.value}
                            onChange={setValue}
                          >
                            {pick.name}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>

                      {fields.pick.errors.map((error) => (
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
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group >
                      <Form.Label>Analysis</Form.Label>

                      <Form.Control
                        as="textarea"
                        rows={3}
                        id="analysis"
                        name="analysis"
                        style={{ height: "150px" }}
                        className={`form-control ${fields.analysis.errorClassList.join(
                          " "
                        )}`}
                        placeholder="Write your analysis here..."
                        defaultValue={fields.analysis.value}
                        onBlur={setValue}
                      />
                      {fields.analysis.errors.map((error) => (
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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Confidence Level</Form.Label>
                      <ButtonGroup toggle>
                        {confidenceLevel.map((confidence, idx) => (
                          <ToggleButton
                            key={idx}
                            type="radio"
                            variant="primary"
                            name="confidence"
                            value={confidence.value}
                            onChange={setValue}
                          >
                            {confidence.name}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>

                      {fields.confidence.errors.map((error) => (
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
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" block>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAnalysis;

import { useState } from "react";
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
} from "react-bootstrap";
import Field from "../validators/Validator";

const NewAnalysis = () => {
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
      console.log(
        "submitting",
        Object.keys(fields).reduce((result, prop) => {
          result[prop] = fields[prop].value;
          return result;
        }, {})
      );
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
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="alert alert-info" role="alert">
              <h4 className="alert-heading text-center">Match Analysis</h4>
              <p className="text-center">Match Title</p>
              <hr />
              <form onSubmit={submit}>
                <div className="form-row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="name">Title</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="validatedInputGroupPrepend"
                        >
                          <FontAwesomeIcon icon={faHeading} size="1x" />
                        </span>
                      </div>
                      <input
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
                    </div>
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
                  </div>

                  <div className="col-md-6 mb-6">
                    <div className="col-md-8 mb-6">
                      <label htmlFor="exposure">Who can see my analysis</label>
                      <div className="input-group mb-4 mr-sm-4">
                        <div
                          role="group"
                          aria-label="Basic example"
                          type="radio"
                          id="exposure"
                          name="confidence"
                          data-toggle="radio"
                          className={`btn-group btn-group-toggle btn-block ${fields.exposure.errorClassList.join(
                            " "
                          )}`}
                          defaultValue={fields.exposure.value}
                          onBlur={setValue}
                        >
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline1"
                              name="exposure"
                              value="just me"
                              className="custom-control-input"
                              onChange={setValue}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline1"
                            >
                              Everyone
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline2"
                              name="exposure"
                              value="just me"
                              className="custom-control-input"
                              onChange={setValue}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline2"
                            >
                              Just me
                            </label>
                          </div>
                        </div>
                      </div>

                      {fields.exposure.errors.map((error) => (
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
                    </div>
                  </div>
                </div>

                <div className="form-row justify-content-between">
                  <div className="col-md-12 mb-12">
                    <label htmlFor="validationServer04">Pick</label>
                    <div className="input-group mb-2 mr-sm-2">
                      <div
                        role="group"
                        aria-label="Basic example"
                        type="radio"
                        id="pick"
                        name="confidence"
                        data-toggle="buttons"
                        className={`btn-group btn-group-toggle btn-block ${fields.pick.errorClassList.join(
                          " "
                        )}`}
                        defaultValue={fields.pick.value}
                        onBlur={setValue}
                      >
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="pick"
                            value="1"
                            onChange={setValue}
                          />
                          1
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="pick"
                            value="X"
                            onChange={setValue}
                          />
                          X
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="pick"
                            value="2"
                            onChange={setValue}
                          />
                          2
                        </label>
                      </div>
                    </div>

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
                  </div>
                  <div className="col-md-4 mb-2"></div>
                </div>

                <div className="form-row">
                  <div className="col-md-12 mb-7">
                    <label htmlFor="inlineFormInputGroupUsername2">
                      Analysis
                    </label>

                    <div className="input-group mb-2 mr-sm-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FontAwesomeIcon icon={faChartBar} size="1x" />
                        </div>
                      </div>
                      <textarea
                        id="analysis"
                        type="text"
                        name="analysis"
                        style={{ height: "150px" }}
                        className={`form-control ${fields.analysis.errorClassList.join(
                          " "
                        )}`}
                        placeholder="Write your analysis here..."
                        defaultValue={fields.analysis.value}
                        onBlur={setValue}
                      ></textarea>
                    </div>
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
                  </div>
                </div>

                <div className="form-row justify-content-between">
                  <div className="col-md-12 mb-12">
                    <label htmlFor="validationServer04">Confidence Level</label>
                    <div className="input-group mb-2 mr-sm-2">
                      <div
                        role="group"
                        aria-label="Basic example"
                        type="button"
                        id="confidence"
                        name="confidence"
                        data-toggle="buttons"
                        className={`btn-group btn-group-toggle btn-block ${fields.confidence.errorClassList.join(
                          " "
                        )}`}
                        defaultValue={fields.confidence.value}
                        onBlur={setValue}
                      >
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="1"
                            onChange={setValue}
                          />
                          1
                        </label>

                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="2"
                            onChange={setValue}
                          />
                          2
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="3"
                            onChange={setValue}
                          />
                          3
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="4"
                            onChange={setValue}
                          />
                          4
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="5"
                            onChange={setValue}
                          />
                          5
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="6"
                            onChange={setValue}
                          />
                          6
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="7"
                            onChange={setValue}
                          />
                          7
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="8"
                            onChange={setValue}
                          />
                          8
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="9"
                            onChange={setValue}
                          />
                          9
                        </label>
                        <label className="btn btn-outline-primary">
                          <input
                            type="radio"
                            name="confidence"
                            value="10"
                            onChange={setValue}
                          />
                          10
                        </label>
                      </div>
                    </div>

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
                  </div>
                </div>

                <Button variant="primary" type="submit" block>
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAnalysis;

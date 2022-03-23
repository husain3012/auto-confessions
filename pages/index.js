import React from "react";
import { Formik, Field, Form } from "formik";
const HomePage = () => {
  const submitHandler = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={{
        branch: "",
        message: "",
      }}
      onSubmit={submitHandler}
    >
      <div className="contact-form-wrapper d-flex justify-content-center">
        <Form className="contact-form">
          <h5 className="title">JMI Confessions 😉</h5>
          <p className="description">Enter your branch name and your confession below ~</p>
          <div>
            <Field name="branch" type="text" className="form-control rounded border-white mb-3 form-input" id="branch" placeholder="CSE" required />
          </div>
          <div>
            <Field name="message" as="textarea" id="message" className="form-control rounded border-white mb-3 form-text-area" rows="5" cols="30" placeholder="Message" required></Field>
          </div>
          <div className="submit-button-wrapper">
            <input type="submit" value="Send" />
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default HomePage;

import React from "react";
import logo from "../../logo.png";
// import MultiStepProgressBar from "./MultiStepProgressBar";

import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { toast, Toaster } from "react-hot-toast";
import { logout } from "../../config/firebase";

const PersonalDetails = ({ nextStep, handleFormData, values, page }) => {
  const validate = () => {
    if (!values.name || !values.college || !values.phone || !values.email) {
      return false;
    } else {
      return true;
    }
  };

  // page={1}
  // nextStep={nextStep}
  // handleFormData={handleInputData}
  // values={formData}

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2

    if (validate()) nextStep();

    // else toast.error("All fields are compulsory");
  };

  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 50;
  } else if (page === 2) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <>
      <ProgressBar percent={stepPercentage} className="progressbar">
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
      </ProgressBar>

      {/* <Toaster toastOptions={{ duration: 4000 }} /> */}

      <div className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="card border-0 shadow rounded-3 my-5 con2">
                <div className="img">
                  <img src={logo} alt="logo" />
                </div>

                <form className="card-body" onSubmit={submitFormData}>
                  <p className="signin">Personal Details</p>
                  <div className="form">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={values.name}
                        onChange={handleFormData}
                        placeholder="name"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Full Name
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="college"
                        value={values.college}
                        onChange={handleFormData}
                        required="true"
                        placeholder="College/University"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        College/University
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={values.email}
                        required="true"
                        onChange={handleFormData}
                        placeholder="email"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Email
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={values.phone}
                        required="true"
                        onChange={handleFormData}
                        placeholder="phone"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Phone number
                      </label>
                    </div>
                    <button
                      onClick={logout}
                      className="text-uppercase button"
                      type="submit"
                    >
                      Sign out
                    </button>
                    <button
                      className="text-uppercase button"
                      type="submit"
                      id="next"
                    >
                      Next
                    </button>
                    {/* button to sign out  */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;

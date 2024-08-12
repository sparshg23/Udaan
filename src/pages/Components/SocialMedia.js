import React, { useState } from "react";
// import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import logo from "../../logo.png";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { toast, Toaster } from "react-hot-toast";
import { addDoc, collection, doc, setDoc ,getDocs,getDoc} from "firebase/firestore";
import { db, auth, upload } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { merge, set } from "lodash";
import { v4 as uuidv4 } from 'uuid';


// creating functional component ans getting props from app.js and destucturing them
const SocialMedia = ({
  nextStep,
  handleFormData,
  prevStep,
  values,
  page,
  Setvalues,
}) => {
  const [submitstate, setSubmitstate] = useState("notSubmitting");
  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 50;
  } else if (page === 2) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }
  const navigate = useNavigate();

  const usersRef = collection(db, "NewUser24");
  const usersScores = collection(db, "UserScores24");
  let scores = {
    Name: values.name,
    lastSubmission: null,
    score: 100,
    referrals:0,
    tasks: {
        "ViYEaEOsVzQb41DxYHTM": {
          "approved": 2,
        },
      },
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState(null);

  const generateReferralToken = () => {
    // Generate a unique referral token using uuid
    return uuidv4();
  };

  const [refid,setrefId] = useState("");

  const submitFinalData = async () => {
    // values={...values,"url":upload(image)}
    // console.log(values.url);
    // console.log(values);

    const referralToken = generateReferralToken();
  
  // Add the referral token to the values object
    values.referralToken = referralToken;
    console.log(values.referralToken);

    let referredUserUid = null; // Initialize a variable to store the matched user's UID

    // Check if a referral ID was provided
    if (refid) {
      // Query the database to find a user with the provided referral token
      const querySnapshot = await getDocs(collection(db, "NewUser24"));
      
      querySnapshot.docs.forEach((doc) => {
        const userData = doc.data();
        if (userData.referralToken === refid) {
          // A matching user is found, store their UID
          referredUserUid = doc.id;
        }
      });
    }
  
    // Now you can use the referredUserUid as needed
    if (referredUserUid) {
      // The provided referral ID is valid, and referredUserUid contains the UID of the matched user
      console.log("Referral ID is valid. Matched user UID:", referredUserUid);

      const matchingUserRef = doc(db, "UserScores24", referredUserUid);
      const matchingUserDoc = await getDoc(matchingUserRef);
      // if (matchingUserDoc.exists()) {
        const matchingUserScore = matchingUserDoc.data().score;
        const newMatchingUserScore = matchingUserScore + 50;
        const refcount=matchingUserDoc.data().referrals+1;
        await setDoc(matchingUserRef, { score: newMatchingUserScore, referrals:refcount }, { merge: true });
      // }
  
      // Increase the score of the registering user by 50
      scores.score=scores.score + 50;
      // }
      // Perform any desired actions here
    } else {
      // The provided referral ID does not match any user
      console.log("Invalid referral ID");
      // Handle the case where the referral ID is not valid (e.g., show an error message)
    }



    setSubmitstate("submitting");
    // toast.promise(
    //   // addDoc(usersRef, values),
    //   {
    //     loading: "Submitting...",
    //     success: "Submitted successfully",
    //     error: "Error while submitting",
    //   },
    //   {
    //     style: {
    //       borderRadius: "10px",
    //       background: "#333",
    //       color: "#fff",
    //     },
    //   }
    // );
   


    try {

      await setDoc(doc(db, "NewUser24", user.uid), values,{merge: true});
      await setDoc(doc(db, "UserScores24", user.uid), scores);
      await upload(image, user.uid);

      // nextStep();
      navigate("/dashboard");
      // toast.success("Registration Successful");
      // await sleep(10000);
      // window.location.replace('https://udghosh.org.in');

      // resetForm();
    } catch (err) {
      console.error(err);
    }
    setSubmitstate("notSubmitting");
    // window.location.reload();
  };

  const validate = () => {
    if (
      !values.facebook ||
      !values.instagram ||
      !values.linkedin ||
      !values.twitter
    ) {
      return false;
    } else {
      return true;
    }
  };
  //creating error state for validation
  const submitFormData = (e) => {
    e.preventDefault();
    if (validate()) submitFinalData();
    else toast.error("All fields are compulsory");
  };
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

      <Toaster toastOptions={{ duration: 4000 }} />

      <div className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="card border-0 shadow rounded-3 my-5 con2">
                <div className="img">
                  <img src={logo} alt="logo" />
                </div>
                <form className="card-body" onSubmit={submitFormData}>
                  <p className="signin">Social Media Details</p>
                  <div className="form">
                    <div className="form-floating mb-3">
                      <input
                        type="URL"
                        className="form-control"
                        name="facebook"
                        value={values.facebook}
                        onChange={handleFormData}
                        required="true"
                        placeholder="facebook"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Facebook URL
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="URL"
                        className="form-control"
                        name="instagram"
                        onChange={handleFormData}
                        value={values.instagram}
                        required="true"
                        placeholder="insta"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Instagram username
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="URL"
                        className="form-control"
                        name="linkedin"
                        value={values.linkedin}
                        onChange={handleFormData}
                        required="true"
                        placeholder="linkedin"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        LinkedIn URL
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="URL"
                        className="form-control"
                        name="twitter"
                        value={values.twitter}
                        onChange={handleFormData}
                        required="true"
                        placeholder="twitter"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Twitter handle
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="refid"
                        value={refid}
                        onChange={(e) => setrefId(e.target.value)}
                        placeholder="refId"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Referral Id (optional)
                      </label>
                    </div>
                    <label className="input" htmlFor="floatingInput">
                      Upload College ID
                    </label>
                    <div className=" mb-3">
                      <input
                        type="file"
                        className="file-upload"
                        name="id"
                        required="true"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                        placeholder="file"
                        autoComplete="off"
                      />
                      <button
                        className="text-uppercase button"
                        onClick={prevStep}
                        id="prev"
                      >
                        Prev
                      </button>
                      <button
                        disabled={submitstate === "submitting"}
                        className="text-uppercase button"
                        type="submit"
                        id="next"
                      >
                        Submit
                      </button>
                    </div>
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

export default SocialMedia;

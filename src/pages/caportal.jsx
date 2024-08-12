import "./caportal.css";
import { useEffect, useState } from "react";
import PersonalDetails from "./Components/PersonalDetails";
import SocialMedia from "./Components/SocialMedia";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { db, auth } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import { useAuthState } from 'react-firebase-hooks/auth';
import Auth from "./Components/auth";
import { useNavigate } from "react-router-dom";
import bg from "./media/ranger.png";

import { getDocs, collection, addDoc, setDoc, deleteDoc, updateDoc, doc, } from "firebase/firestore";

// import Progressbar from "./Components/ProgressBar";


function Caportal() {
  //state for steps
  const [step, setstep] = useState(1);
  const [firstload, setfirstload] = useState(true);


  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (loading && firstload) {
      toast.loading("Loading");
      setfirstload(false);
    }
  }, [loading]);


  useEffect(() => {
    if (!user)
    {
      toast.error("Please Login to continue");
      navigate("/register");
    }
  }, [user]);
  // invoke toaster when loading in Useeffect
  // useEffect(() => {
  //   if (loading && firstload) {
  //     toast.loading("Loading");
  //     setfirstload(false);
  //   }
  // }, [loading]);
  // const navigate=useNavigate();
  //state for form data
  // navigate to /register if user is not logged in






  const [formData, setFormData] = useState({
    name: "",
    college: "",
    phone: null,
    email: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    url: "",
    referralToken: "",
  });

  const resetForm = () => {
    formData.name = "";
    formData.college = "";
    formData.phone = null;
    formData.email = "";
    formData.facebook = "";
    formData.instagram = "";
    formData.linkedin = "";
    formData.twitter = "";
  }


  let key, value;
  const handleInputData = (e) => {
    // input value from the form
    // console.log(e.target.name);
    // console.log(e.target.value);
    //updating for data state taking previous state and then adding new value to create new object
    key = e.target.name;
    value = e.target.value;
    // set focus on the input field


    setFormData({
      ...formData,
      [key]: value
    });
    // console.log(formData);
    // form data going out of focus
  };


  const nextStep = () => {
    setstep(step + 1);
    toast.success("Saved Successfully");
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // toast

  // function for going to next step by increasing step state by 1


  // handling form input data by taking onchange value and updating our previous form data state

  // javascript switch case to show different form in each step
  // switch (step) {
  //   // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
  //   case 1:
  return (
    <div className="caportal" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      height: "100%",
      minHeight: "100vh",
      padding: "100px 0"
    }}>
      {
        (step === 1) ? <PersonalDetails
          page={1}
          nextStep={nextStep}
          handleFormData={handleInputData}
          values={formData}
        /> : <SocialMedia
          page={2}
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormData={handleInputData}
          values={formData}
          Setvalues={setFormData}
        />
      }
    </div>
  );
}
export default Caportal;

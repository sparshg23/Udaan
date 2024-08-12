import {
  auth,
  googleProvider,
  signInWithFacebook,
} from "../../config/firebase";
import { useState, useEffect } from "react";
import { getProfile, signInWithGoogle } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import bg from "../media/pic-bg2.jpeg";

const Auth = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      console.log("Loading...");
      return;
    }
    if (user) {
      async function callAsync() {
        // console.log(user.uid + "  gjj"); //
        const docRef = await getProfile(user.uid);
        // console.log("user data")
        // console.log(docRef);
        if (docRef.exists()) {
          // console.log(docRef.data(), "profile")
          window.location.href = "/dashboard";
        } else {
          // console.log(docRef.data())
          navigate("/login");
        }
      }
      callAsync();
    }
  }, [loading, user]);
  return (
    <>
      <div
  className="register"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <div
    className="regbox"
    style={{
      backdropFilter: "blur(2px)",
      border: "1px solid rgba(255,255,255,0.5)",
      backgroundColor: "rgba(255,255,255,0.5)",
      borderRadius: "10px",
      width: "90%",
      height: "400px",
      maxWidth: "400px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <h2
      className="text-center text-2xl font-bold text-black"
      style={{
        textShadow: "0 0 1px #000",
        paddingBottom: "20px", // Add spacing below the heading
      }}
    >
      Register with
    </h2>
    
    <div
      className="flex justify-center items-center"
      style={{
        paddingTop: "10px", // Reduce top spacing
        paddingBottom: "20px", // Add spacing below the button
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <button
        className="withGoogle"
        onClick={signInWithGoogle}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: "100%",
          boxShadow: "0 0 1px #000",
          padding: "10px 20px",
        }}
      >
        <img
          style={{
            margin: "0",
            padding: "0",
            width: "24px",
          }}
          src="https://img.icons8.com/color/48/000000/google-logo.png"
        />
        <p
          style={{
            paddingLeft: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Google
        </p>
      </button>
    </div>
      <button
        className="withGoogle"
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          position: "absolute",
          bottom: "20px",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "rgba(0,0,255,0.5)",
          borderRadius: "10px",
          width: "80%",
          boxShadow: "0 0 1px #000",
          padding: "10px 20px",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Go Back
        </p>
      </button>
    </div>
  </div>
    </>
  );
};

export default Auth;

import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar2 from "./components/Navbar2";
import Opsnsorss from "./components/sponsors";
import ProfileCards from "./components/ProfileCards";
import "./Home.css";
import ImageCarousel from "./components/ImagesCarousel";
import About from "./components/About";
const Home = () => {

  return (

    // preloader ? <div>
    //   <Preloader />
    // </div> :
    < div data-scroll-container>
      <Navbar2 />
      <Header />
      <About/>
      <ImageCarousel/>
      <ProfileCards />
      <Opsnsorss />
      <Footer />
    </div>
  );
};

export default Home;

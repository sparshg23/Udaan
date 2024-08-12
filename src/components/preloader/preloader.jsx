import React from "react";
import "./preloader.css";
import { useEffect } from "react";

function Preloader() {
  //   useEffect(() => {
  //     // Hide the preloader after a certain delay
  function load() {
    setTimeout(() => {
      const preloader = document.querySelector(".preloader");
      const preloaderText = document.querySelector(".preloader-text");
      preloader.style.opacity = "0";
      preloaderText.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500); // Delay hiding the preloader to match the transition duration
    }, 3000); // Adjust the delay (in milliseconds) as needed
    // });
  }
  return (
    <div class="preloader" onLoad={load()}>
      <div class="text">Udghosh'24</div>
      <div class="preloader-text delay">IIT Kanpur</div>
      <script src="script.js"></script>
    </div>
  );
}

export default Preloader;

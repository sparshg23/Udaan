import React, { useEffect } from "react";
import slides from "./imageUrl";
import "react-animated-slider/build/horizontal.css";
import "./style.css";
import "./animate.scss";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSliderStyles from "react-awesome-slider/src/styled/cube-animation";
import { FontWeight } from "@cloudinary/url-gen/qualifiers";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Gallery = () => {
  const record = slides.photoset.photo;

  return (
    <>
      <section style={{ textAlign: "center" }} id="gallery">
        <h3 id="gallery-heading">Gallery</h3>

        <AutoplaySlider
          play={true}
          cancelOnInteraction={true} // should stop playing on user interaction
          bullets={true}
          animation="cubeAnimation"
          cssModule={AwesomeSliderStyles}
          interval={5000}
        >
          {record.map((slide, index) => (
            <div className="images">
              <img
                key={index}
                src={`https://live.staticflickr.com/${slide.server}/${slide.id}_${slide.secret}_b.jpg`}
                className="design"
                alt=""
              />
            </div>
          ))}
        </AutoplaySlider>
      </section>
    </>
  );
};

export default Gallery;

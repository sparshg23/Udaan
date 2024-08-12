import React, { useEffect } from "react";
import slides from "./imageUrl";
import "react-animated-slider/build/horizontal.css";
import "./style.css";
// import "./animate.scss";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
// import AwesomeSliderStyles from "react-awesome-slider/src/styled/cube-animation";
import { FontWeight } from "@cloudinary/url-gen/qualifiers";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Testimonials = () => {
  const record = slides.photoset.photo;

  return (
    <>
      <section style={{ textAlign: "center" }} id="testimonials">
        <h3 id="gallery-heading">Testimonials</h3>

        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          bullets={false}
          showTimer={false}
          //   animation="cubeAnimation"
          //   cssModule={AwesomeSliderStyles}
          interval={5000}
        >
          {record.map((slide, index) => (
            <div className="testi">
              <div className="img_contain">
                <img
                  key={index}
                  src={`https://live.staticflickr.com/${slide.server}/${slide.id}_${slide.secret}_m.jpg`}
                  className="testim_image"
                  alt=""
                />
                <p>{slide.name}<br/> ({slide.college})</p>
                
              </div>

              <div className="testi_desc">
                <p>{slide.description}
                </p>
              </div>
            </div>
          ))}
        </AutoplaySlider>
      </section>
    </>
  );
};

export default Testimonials;

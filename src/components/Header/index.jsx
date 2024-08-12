import React, { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css';
import cn from "../../Assests/Corizo3.png";
import un from "../../Assests/Unstop.png";
import Carousel from 'react-bootstrap/Carousel';
const Header = () => {
  useEffect(() => {
    const t1 = gsap.timeline();
    const t2 = gsap.timeline();
    t1.from(".header-text", {
      opacity: 0,
      y: 300,
      duration: 1.5,
      ease: "back.out(1.8)",
      stagger: {
        amount: 0.4,
      },
    });
    t1.to(
      ".header-text",
      {
        opacity: 1,
        duration: 1.5,
        ease: "power1.out",
        stagger: {
          amount: 0.4,
        },
      },
      "<"
    );

    t1.from(
      "#foo-left",
      {
        x: -200,
        duration: 1.5,
        ease: "back.out(1.8)",
      },
      "-=0.5"
    );
    t1.to(
      "#foo-left",
      {
        opacity: 1,
        duration: 0.5,
        ease: CustomEase.create(
          "custom",
          "M0,0,C0,0,0.181,0.023,0.35,0.038,0.489,0.05,0.607,0.039,0.724,0.156,0.833,0.265,0.861,0.448,0.902,0.615,0.951,0.819,1,1,1,1"
        ),
      },
      "<"
    );
    t2.from(
      "#foo-right",
      {
        x: 200,
        duration: 1.5,
        ease: "back.out(1.8)",
      },
      "+=1.9"
    );
    t2.to(
      "#foo-right",
      {
        opacity: 1,
        duration: 0.5,
        ease: CustomEase.create(
          "custom",
          "M0,0,C0,0,0.181,0.023,0.35,0.038,0.489,0.05,0.607,0.039,0.724,0.156,0.833,0.265,0.861,0.448,0.902,0.615,0.951,0.819,1,1,1,1"
        ),
      },
      "<"
    );
    t2.to(
      ".foo-middle",
      {
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        ease: "none",
      }, "+=0.2"
    );
    t2.to(".partition", {
      opacity: 1,
      duration: 1,
      ease: "none",
    });

    t2.from(
      ".CA-logo",
      {
        opacity: 0,
        duration: 1,
        ease: "back.out(1.8)"
      }, "-=1.0"
    );
    t2.to(
      ".CA-logo",
      {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        ease: "none"
      }
    );

    t2.from(".word", {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.02
      }
    }, "-=1.5")

  }, []);
  
  return (
    <section className="header-container" id="header" data-scroll-container>
      <Carousel>
      <Carousel.Item interval={6500}>
        <img
          className="d-block w-100 carousel-image"
          src="pexels-rafael-guajardo-194140-604684.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100 carousel-image"
          src="pexels-korwongss-6949326.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100 carousel-image"
          src="pexels-marek-piwnicki-3907296-7920318.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>

      
      <div className="backblur">
        <div className="header-panel">
          <div className="partners">
            <div className="CA-logo partnersleft">
              <a href="https://unstop.com/"><img src={un} alt="Unstop logo" /></a>
              <div><p>Presents</p></div>
            </div>
            <div className="CA-logo partnersright">
              <div><p>Powered By</p></div>
              <a href="https://corizo.in/"><img src={cn} alt="Corizo LOGO" /></a>
            </div>
          </div>
          <h1 className="header-text">Udaan</h1>
          <h1 className="header-text">Program <span className="udghosh-span">Udghosh'24</span></h1>
          <div className="header-panel-foo">
            <span id="foo-left">Advertise</span>
            <span className="partition"></span>
            <span className="foo-middle">Organize</span>
            <span className="partition"></span>
            <span className="foo-middle">Conduct</span>
            <span className="partition"></span>
            <span id="foo-right">Coordinate</span>
          </div>
          <div className="represent-college">
            {
              "Where Courage ".split('').map((word, index) => (
                word === ' ' ? <div key={index} className="word">&nbsp;</div> : <div key={index} className="word">{word}</div>
              ))
            }
            {
              " and Strength ".split('').map((word, index) => (
                word === ' ' ? <div key={index} className="word">&nbsp;</div> : <div key={index} className="textHL word">{word}</div>
              ))
            }
            {
              " defy limits.".split('').map((word, index) => (
                word === ' ' ? <div key={index} className="word">&nbsp;</div> : <div key={index} className="word">{word}</div>
              ))
            }
          </div>
          <div className="represent-college">
            {
              " Join us in celebrating unstoppable spirit! ".split('').map((word, index) => (
                word === ' ' ? <div key={index} className="word">&nbsp;</div> : <div key={index} className="word">{word}</div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

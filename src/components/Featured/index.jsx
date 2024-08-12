import React from "react";
import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import p1 from "../../Assests/p-1.jpg";
import p2 from "../../Assests/p-2.jpg";
import p3 from "../../Assests/p-3.jpg";
import p4 from "../../Assests/p-4.jpg";


export default function Featured() {
  const isShort = useMediaQuery({ query: "(max-width: 980px)" });

  const el = useRef();
  const q = gsap.utils.selector(el);
  const tl = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const whycahead = gsap.timeline({paused:true});
    const whyca = gsap.timeline({paused:true});
    whycahead.to("#whyCA", {
      opacity: 1,
      ease: "ease-in",
      duration: 1,
    });
    ScrollTrigger.create({
      trigger: "#whyCA",
      start: "40% 100%",
      end: "40% 100%",
      onEnter: () => whycahead.play(),
    });
    whyca.from(".whyCA-point", {
      y: 200,
      ease: "ease-in-out",
      duration: 0.8,
      opacity: 0.5,
      stagger: {
        amount: 0.3,
      },
    });
    whyca.to(".whyCA-point", {
      opacity: 1,
      ease: "ease-in-out",
      duration: 0.8,
      stagger: {
        amount: 0.3,
      },
    },"<");
    ScrollTrigger.create({
      trigger: "#whyCA",
      start: "top 70%",
      end: "bottom 70%",
      onEnter: () => whyca.restart(),
    });

    if (isShort) {
      function animateFrom(elem, direction) {
        direction = direction || 1;
        var x = 0,
          y = direction * 100;
        if (elem.classList.contains("gs_reveal_fromLeft")) {
          x = -100;
          y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
          x = 100;
          y = 0;
        }
        elem.style.transform = "translate(" + x + "px, " + y + "px)";
        elem.style.opacity = "0";
        gsap.fromTo(
          elem,
          { x: x, y: y, autoAlpha: 0 },
          {
            duration: 1.5,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "ease-in-out",
            overwrite: "auto",
          }
        );
      }

      function hide(elem) {
        gsap.set(elem, { autoAlpha: 0 });
      }

      gsap.utils.toArray(".responsibilities").forEach(function (elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
          start: "25% 70%",
          trigger: elem,
          // markers: true,
          onEnter: function () {
            animateFrom(elem);
          },
          onEnterBack: function () {
            animateFrom(elem, -1);
          },
          onLeave: function () {
            hide(elem);
          }, // assure that the element is hidden when scrolled into view
        });
      });
    } else {
      let duration = 10,
        sections = gsap.utils.toArray(".responsibilities"),
        sectionIncrement = duration / (sections.length - 1),
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#parallex",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            start: "25% 40%",
            end: "+=1500",
          },
        });

      tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        duration: duration,
        ease: "none",
      });

      // everything below this is just for the fading/scaling up which is NOT scrubbed - it's all dynamic, triggered when each section enters/leaves so that the fading/scaling occurs at a consistent rate no matter how fast you scroll!
      sections.forEach((section, index) => {
        let tween = gsap.from(section, {
          opacity: 0,
          scale: 0.6,
          duration: 1,
          force3D: true,
          paused: true,
        });
        addSectionCallbacks(tl, {
          start: sectionIncrement * (index - 0.99),
          end: sectionIncrement * (index + 0.99),
          onEnter: () => tween.play(),
          onEnterBack: () => tween.play(),
        });
        index || tween.progress(1); // the first tween should be at its end (already faded/scaled in)
      });

      // helper function that lets us define a section in a timeline that spans between two times (start/end) and lets us add onEnter/onLeave/onEnterBack/onLeaveBack callbacks
      function addSectionCallbacks(
        timeline,
        { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }
      ) {
        let trackDirection = (animation) => {
            // just adds a "direction" property to the animation that tracks the moment-by-moment playback direction (1 = forward, -1 = backward)
            let onUpdate = animation.eventCallback("onUpdate"), // in case it already has an onUpdate
              prevTime = animation.time();
            animation.direction = animation.reversed() ? -1 : 1;
            animation.eventCallback("onUpdate", () => {
              let time = animation.time();
              if (prevTime !== time) {
                animation.direction = time < prevTime ? -1 : 1;
                prevTime = time;
              }
              onUpdate && onUpdate.call(animation);
            });
          },
          empty = (v) => v; // in case one of the callbacks isn't defined
        timeline.direction || trackDirection(timeline); // make sure direction tracking is enabled on the timeline
        start >= 0 &&
          timeline.add(
            () =>
              ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(
                param
              ),
            start
          );
        end <= timeline.duration() &&
          timeline.add(
            () =>
              ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(
                param
              ),
            end
          );
      }
    }

    //responsibility contents animation
    var t2 = gsap.timeline({defaults: {duration: 5, delay: 1}});
    t2.to(".img-advertise", {x: 50, repeat: -1, yoyo: true})
    t2.to(".content-advertise h3", {x: -50, repeat: -1, yoyo: true}, "-=5")
    t2.to(".content-advertise p", {x: -70, repeat: -1, yoyo: true, duration: 8}, "-=5")
  }, []);

  return (
    <section className="featured-container" id="featured" data-scroll-container>
      <div id="whyCA">
        <div className="transpantlayer">
        <h3 className="whyheading">Why Become CA?</h3>
        <ol className="list">
          <p className="whyCA-point listpt">
            <li><span id="whyyHead">BE A LEADER: </span> Represent your college as you help organize one of India's largest sports fests.</li>
          </p>
          <p className="whyCA-point listpt">
            <li>
            <span id="whyyHead">ENHANCE YOUR SKILLS:</span> Enhance your communication and managerial skills.

            </li>
          </p>
          <p className="whyCA-point listpt">
            <li>
            <span id="whyyHead">NETWORKING: </span> Interact with people coming from diverse fields across the country to develop your network.

            </li>
          </p>
          <p className="whyCA-point listpt">
            <li>
            <span id="whyyHead">FREE COURSES:</span> Top-performing CAs will get access to online courses and a performance-based earning opportunity.
            </li>
          </p>
        </ol>
      </div>
    
      </div>

  

      <div id="parallex" ref={el}>
      <div className="responsibilities headingres">
          <h3>Responsibilites </h3>
        </div>
        <div className="responsibilities gs_reveal_fromLeft" id="advertise">
          <img src={p1} alt="advertise" className="img-advertise" />
          <div className="content-advertise">
          <h3>Advertise</h3>
          <p>
            Publicize Udghosh and its sponsors in your college by sharing posts
            and promoting content by becoming a focal point for your respective
            college.
          </p>
          </div>
          
        </div>
        <div className="responsibilities gs_reveal_fromRight" id="organize">
        <img src={p2} alt="advertise" className="img-advertise" />
        <div className="content-advertise">
        <h3>Organize</h3>
          <p>
            Organize events, workshops and sessions regarding Udghosh and what
            it has to offer with assistance from mentors.
          </p>
        </div>

          
        </div>
        <div className="responsibilities gs_reveal_fromLeft" id="conduct">
        <img src={p3} alt="advertise" className="img-advertise" />
          <div className="content-advertise">
          <h3>Conduct</h3>
          <p>
            Help in management of elimination rounds in your college and city to
            select participants for the main event
          </p>
          </div>
          
        </div>
        <div className="responsibilities gs_reveal_fromRight" id="coordinate">
        <img src={p4} alt="advertise" className="img-advertise" />
        <div className="content-advertise">   
        <h3>Coordinate</h3>
          <p>
            Collaborate with the Udghosh team in organising on-ground events in
            your city.
          </p>
        </div>
          
        </div>
      </div>
    </section>
  );
}

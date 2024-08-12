import React from "react";
import "./style.css";
import sponsors from "./sponsors.json";

export default function Sponsors() {
  const record = sponsors.photoset.photo;

  return (
    <section className="sponsors" id="sponsors" data-scroll-container>
      <h3 className="sponsors_heading">Our Partners</h3>
      <div className="sponsors-list">
        {record.map((record, index) => {
          return (
            <div className="sponsor-cont" key={index}>
              <p className="sponsorType">{record.type}</p>
              <div className="sponsor">
                <div className="sponsor_logo">
                  <a href={record.link} target="_blank">
                    <img
                      src={`https://live.staticflickr.com/${record.server}/${record.id}_${record.secret}.jpg`}
                      alt={`${record.title}`}
                      className="sponsors_img"
                    />
                  </a>
                </div>
                {/* <div className="sponsorContent">
                  <p className="sponsorName">{record.name}</p>
                  <p className="sponsor-desc">
                    <ul className="description-list">
                      {record.description.split('<br/>').map((line, i) => (
                        <li className="desc-line" key={i}>{line}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="sponsor-desc" id="bottom-sponsor">
                    Click image to redirect
                  </p>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

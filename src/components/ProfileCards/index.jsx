import React from "react";
import "./style.css";
import Card from "./Card";
const ProfileCards = () => {
  return (
    <section className="profile-section">
      <div className="ContactUs bodyy" id='Contacts'>
        <div id="contactHead">
          <h3 className="sectionHeading">NEED HELP? WE GOT YOU!</h3>
        </div>
        <div className="cards flex gap-28">
          <Card name='Ujjwal Gautam' head="Web & App"/>
          <Card name='Shourya Trikha' head="Web & App"/>
          <Card name='Ujjwal Gautam' head="Web & App"/>
        </div>
      </div>
    </section>
  );
};

export default ProfileCards;

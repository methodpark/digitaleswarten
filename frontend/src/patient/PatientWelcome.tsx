import React from 'react';

import '../styles/Welcome.css';
import virusLogo from '../img/wirvsvirus.png';

export function PatientWelcome() {
  return(
    <div className="welcome-background-image">
      <div className="welcome-patient-text-wrapper">
        <h1 className="welcome-patient-headline">Digitales Nummern Ziehen</h1>
        <p className="welcome-patient-subheadline">Sie haben zwei Nummern erhalten. Bitte geben Sie die Wartebereichsnummer hier ein:</p>
      </div>
      <div className="welcome-input-wrapper">
        <input
          className="welcome-patient-id-input"
          type="text"
          name="patient-id"
          placeholder="Ihre Wartebereichsnummer">
        </input>
        <div className="welcome-patient-button"></div>
      </div>
      <div className="welcome-patient-footer">
        <img
          className="welcome-patient-virus-logo"
          src={virusLogo}
          alt="Wir VS Virus Logo"/>
      </div>
    <div className="welcome-background-overlay"></div>
  </div>
  );
}



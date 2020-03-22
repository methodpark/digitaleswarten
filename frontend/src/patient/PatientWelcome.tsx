import React from 'react';

import '../Welcome.css';
import virusLogo from '../img/wirvsvirus.png';

export function PatientWelcome() {
  return(
    <div className="welcome-background-image">
      <div className="welcome-patient-text-wrapper">
        <h1 className="welcome-patient-headline">Digitales Wartezimmer</h1>
        <p className="welcome-patient-subheadline">Bitte geben Sie die von Ihrer Praxis erhaltene Wartenummer in das untere Feld ein.</p>
      </div>
      <div className="welcome-input-wrapper">
        <input
          className="welcome-patient-id-input"
          type="text"
          name="patient-id"
          placeholder="Ihre Wartenummer">
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



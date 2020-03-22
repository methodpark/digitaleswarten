import React from 'react';

import uuid from 'uuid/v4';

import '../styles/Welcome.css';
import virusLogo from '../img/wirvsvirus.png';

export function PatientWelcome() {

  return(
    <main className="welcome-background-image">
      <header className="welcome-patient-text-wrapper">
        <h1 className="welcome-patient-headline">Digitales Nummern Ziehen</h1>
        <p className="welcome-patient-subheadline">Sie haben zwei Nummern erhalten. <br /> <br />Bitte geben Sie die Wartebereichsnummer hier ein:</p>
      </header>

      <div className="welcome-input-wrapper">
        <input
          className="welcome-patient-id-input"
          type="text"
          name="patient-id"
          placeholder="Ihre Wartebereichsnummer">
        </input>
        <div className="welcome-patient-button"></div>
      </div>
      <footer className="welcome-patient-footer">
        <img
          className="welcome-patient-virus-logo"
          src={virusLogo}
          alt="Wir VS Virus Logo"/>
      </footer>
    <div className="welcome-background-overlay"></div>
  </main>
  );
}



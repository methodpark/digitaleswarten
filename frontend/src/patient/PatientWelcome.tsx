import React from 'react';

import uuid from 'uuid/v4';

import '../styles/Welcome.css';
import virusLogo from '../img/wirvsvirus.png';
import { Link, useHistory } from 'react-router-dom';

export function PatientWelcome() {

  const numberInputRef = React.createRef<HTMLInputElement>();
  const history = useHistory();

  const openPlace = () => {
    const placeNumber = numberInputRef.current?.value;
    if(placeNumber !== undefined && placeNumber !== '') {
      history.push(`queues/${placeNumber}`);
    }
  }

  return(
    <main className="welcome-background-image">
      <header className="welcome-patient-text-wrapper">
        <h1 className="welcome-patient-headline">Digitales Nummern Ziehen</h1>
        <p className="welcome-patient-subheadline">Sie haben zwei Nummern erhalten. <br /> <br />Bitte geben Sie die Wartebereichsnummer hier ein:</p>
      </header>

      <div className="welcome-input-wrapper">
        <input
          className="welcome-patient-id-input"
          type="number"
          name="patient-id"
          ref={numberInputRef}
          placeholder="Ihre Wartebereichsnummer">
        </input>
        <div className="welcome-patient-button" onClick={openPlace}><span className="screenreader-text">Wartebereich durch anklicken öffnen</span></div>
      </div>

      <p>Sie sind Geschäftsinhaber? <Link className="create-new-area" to={`admin/${uuid()}`}>Legen Sie sich einen eigenen Wartebereich an.</Link></p>

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



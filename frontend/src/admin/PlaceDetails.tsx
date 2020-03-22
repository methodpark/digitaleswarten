import React from 'react';

import { SectionBox } from './Boxes';

import { AppState } from '../state/state';
import { connect, DispatchProp } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FetchPlaceDetailsAction, fetchPlaceDetailsCreator } from '../state/backend';

const PlaceDetails = (props: AppState & DispatchProp<FetchPlaceDetailsAction>) => {

  const locationParams = useParams() as {placeId: string};
  const {publicId = ''} = props.placeDetails;
  const {queues = []} = props;

  return (
    <SectionBox name="Hinweise">
      Hier können Sie Warteschlange und Wartende verwalten.
      Ein paar Hinweise:
      <ul>
        <li>Halten Sie <Link to={`/admin/${locationParams.placeId}`}>den Link zu dieser Seite</Link> <b>geheim</b>, er wurde <b>nur für Sie erstellt</b>.</li>
        <li><b>Speichern Sie diese Seite als Lesezeichen</b>. Wenn Sie die Seite verlassen, können Sie ansonsten vielleicht nicht mehr zurückkehren.</li>
        { publicId === '' ? <></> : <li>Ihre Wartebereichsnummer lautet <b>{publicId}</b>. Teilen Sie diese Ihren wartenden zusammen mit deren Ticket-Nummer mit oder nutzen Sie <Link to={`/queues/${publicId}`}>diesen Link</Link>.</li> }
        { queues.length > 0 ? <></> : <li>Beginnen Sie, indem Sie unten eine Warteschlange anlegen.</li>}
      </ul>
    </SectionBox>
  );
};

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(PlaceDetails);

import { DispatchProp, connect } from "react-redux";
import { FetchQueuesAction, fetchQueuesCreator, PersonDetails } from "./state/backend";
import React from "react";

export class QueueFetcher extends React.Component<DispatchProp<FetchQueuesAction> & { placeId: string; personDetails: PersonDetails }> {
  render() {
    console.log(this.props);
    const personDetails = this.props.personDetails;
    const placeId = this.props.placeId;
    const dispatchFetch = () => {
      this.props.dispatch(fetchQueuesCreator(placeId, personDetails));
      setTimeout(dispatchFetch, 3000);
    };

    dispatchFetch();

    return <></>;
  }
}

export default connect()(QueueFetcher);

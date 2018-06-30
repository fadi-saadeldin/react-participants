import React, { Component } from 'react';
import ParticipantsList from '../participant/ParticipantsList';
import CreateParticipant from '../participant/CreateParticipant';

class Landing extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4  className="main-title">List of participants</h4>
              <CreateParticipant/>
             <ParticipantsList/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default  Landing;

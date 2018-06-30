import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getParticipants, createParticipant, editParticipant, deleteParticipant } from '../../actions/participantActions';
import Spinner from '../common/Spinner';
import ParticipantItem from '../participant/ParticipantItem';
class ParticipantsList extends Component {
  state = {
    ParticipanList: ""
  }
  componentDidMount() {

    this.props.getParticipants();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
  sortBy(key) {
    let arrayCopy = [...this.props.participants.participants];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ ParticipanList: arrayCopy });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.participants.participants !== this.props.participants.participants) {
      //Perform some operation
      this.setState({ ParticipanList: nextProps.participants.participants });

    }
  }
  render() {
    const { participants, loading } = this.props.participants;
    let participantsContent;

    if (participants === null || loading) {
      participantsContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(participants).length > 0) {
        participantsContent = (
          <table class="table table-striped">
            <thead>
              <tr >
                <th onClick={() => this.sortBy('name')}>Full Name</th>
                <th onClick={() => this.sortBy('email')}>Email</th>
                <th onClick={() => this.sortBy('phone')}>Phone Number</th>

              </tr>
            </thead>
            <tbody>
              {this.state.ParticipanList.map(participant => (
                <ParticipantItem key={participant._id} participantItem={participant} />
              ))
              }
            </tbody>
          </table>
        );
      } else {
        participantsContent = (<div className="participants-list"></div>)
      }

    }
    return (
      <div className="participants-list">
        {participantsContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  participants: state.participants,
});

export default connect(mapStateToProps, { getParticipants, createParticipant, editParticipant, deleteParticipant })(
  ParticipantsList
);

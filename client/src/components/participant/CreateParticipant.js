import React, { Component } from 'react';
import InlineTextFieldGroup from '../common/InlineTextFieldGroup';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createParticipant,nameChanged,emailChanged,phoneChanged } from '../../actions/participantActions';

class CreateParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      errors: {},
      disabled: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const participantData = {
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
    };

    this.props.createParticipant(participantData);
  }
 
  onNameChange(event) {
    console.log(event)
    this.props.nameChanged(event.target.value);
  }
  onEmailChange(event) {
    this.props.emailChanged(event.target.value);
  }
  onPhoneChange(event) {
    this.props.phoneChanged(event.target.value);
  }
  render() {

    return (
      <div className="add-participant">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
              <form onSubmit={this.onSubmit}>
                <InlineTextFieldGroup
                  placeholder="Full Name"
                  name="name"
                  value={this.props.name}
                  onChange={event=>this.onNameChange(event)}
                  error={this.props.errors.name}
                />
                <InlineTextFieldGroup
                  placeholder="Email"
                  name="email"
                  value={this.props.email}
                  onChange={event=>this.onEmailChange(event)}
                  error={this.props.errors.email}
                />
                <InlineTextFieldGroup
                  placeholder="Phone Number"
                  name="phone"
                  value={this.props.phone}                
                 onChange={event=>this.onPhoneChange(event)}
                  error={this.props.errors.phone}
                />
            
                <input
                  type="submit"
                  value="Add New"
                  className="btn  btn-inline float-right"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateParticipant.propTypes = {
  createParticipant: PropTypes.func.isRequired,
}
const mapStateToProps = ({ participants}) => {
   const { email,phone,name, loading ,errors} = participants;
 return {  email,phone,name, loading,errors};
};

export default connect(mapStateToProps, {
  createParticipant ,nameChanged,emailChanged,phoneChanged
})(CreateParticipant);
import React, { Component } from 'react';
import InlineTextFieldGroup from '../common/InlineTextFieldGroup';
import { connect } from 'react-redux';
import { editParticipant, deleteParticipant } from '../../actions/participantActions';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';


class ParticipantItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayEditInputs: false,
      name: this.props.participantItem.name,
      email: this.props.participantItem.email,
      phone: this.props.participantItem.phone,
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
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
      id: this.props.participantItem._id,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
    };

    this.props.editParticipant(participantData);
  }
  onDeleteClick(id) {
    this.props.deleteParticipant(id);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displayEditInputs } = this.state;
    const { _id, name, email, phone } = this.props.participantItem;
    let editInputs;

    if (displayEditInputs) {
      editInputs = (

        <div className="inline-wrap">
          <div className="inline-wrap_inner">
            <form onSubmit={this.onSubmit}>
              <InlineTextFieldGroup
                placeholder="Full Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />

              <InlineTextFieldGroup
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />

              <InlineTextFieldGroup
                placeholder="Phone Number"
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
                error={errors.phone}
              />
              <input
                type="submit"
                value="Save"
                className="btn  float-right btn-primary"
              />
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displayEditInputs: !prevState.displayEditInputs
                  }));
                }}
                value="cancel"
                className="btn  btn-inline float-right mr-3"
              >Cancel</button>
            </form>
          </div>
        </div >
      );
    }
    return (
      <tr >
        <th>{name}</th>
        <th>{email}</th>
        <th>{phone}</th>
        <button className=" float-right icon-fa"
          onClick={this.onDeleteClick.bind(this, _id)}
        ><FaTrash size="24" color="#909090"/>
        </button>
        <button className=" float-right icon-fa"
          onClick={() => {
            this.setState(prevState => ({
              displayEditInputs: !prevState.displayEditInputs
            }));
          }}
        ><FaPencil color="#909090" size="24" />
        </button>
        {editInputs}
      </tr>
    );
  }
}

const mapStateToProps = ({ participants}) => {
  const { errors} = participants;
return { errors};
};

export default connect(mapStateToProps, {
  editParticipant, deleteParticipant 
})(ParticipantItem);

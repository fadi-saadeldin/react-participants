import axios from 'axios';
import {
GET_ERRORS,
GET_PARTICIPANTS,
 PARTICIPANT_LOADING,
 NAME_CHANGED,
 EMAIL_CHANGED,
 PHONE_CHANGED,
} from './types';

// on Change name 
export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};
// on Change email 
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
// on Change phone 
export const phoneChanged = (text) => {
  return {
    type: PHONE_CHANGED,
    payload: text
  };
};

// Get current profile
export const getParticipants = () => dispatch => {
  dispatch(setParticipantLoading());
  axios
    .get('/api/participant/all')
    .then(res =>
      dispatch({
        type: GET_PARTICIPANTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PARTICIPANTS,
        payload: {}
      })
    );
};

// Create Profile
export const createParticipant = (participantData) => dispatch => {
 
  axios
    .post('/api/participant', participantData)
    .then(res => dispatch(getParticipants())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Participant
export const editParticipant = (participantData) => dispatch => {
  axios
    .post(`/api/participant/${participantData.id}`, participantData)
      .then(res => dispatch(getParticipants())

    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// Delete Participant
export const deleteParticipant = id => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
  axios
    .delete(`/api/participant/${id}`)
  
      .then(res => dispatch(getParticipants())

    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
}


// Profile loading
export const setParticipantLoading = () => {
  return {
    type: PARTICIPANT_LOADING
  };
};



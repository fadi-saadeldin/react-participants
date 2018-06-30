import { combineReducers } from 'redux';
import participantReducer from './participantReducer';

export default combineReducers({

  participants: participantReducer
});

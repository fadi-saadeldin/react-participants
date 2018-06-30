import {
  GET_ERRORS,
  GET_PARTICIPANTS,
  PARTICIPANT_LOADING,
  NAME_CHANGED,
  EMAIL_CHANGED,
  PHONE_CHANGED,
} from '../actions/types';

const initialState = {
  participants: null,
  loading: false,
  email:"",
  phone:"",
  name:"",
  errors:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAME_CHANGED:
    return { ...state, errors:'',name: action.payload };
    case EMAIL_CHANGED:
    return { ...state,errors:'', email: action.payload };
  case PHONE_CHANGED:
    return { ...state, errors:'',phone: action.payload };
    case PARTICIPANT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload,
        name:"",
        email:"",
        phone:"",
        loading: false,
        errors:''
      };
      case GET_ERRORS:
      return { ...state, errors:action.payload };
    default:
      return state;
  }
}

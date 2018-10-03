const initalState = {
  hobbies: [],
  currentHobby: {},
  completedHobby: {},
  userId: '',
  hobbyId: '',
  userData: {},
  errors: {
    signup: '',
  },
  success: {
    signup: false,
  },
  token: ''
};

const reducer = (state = initalState, action) => {
  switch (action.type) {

  case 'DISCOVER_SUCCESS':
    return {
      ...state,
      hobbies: action.data
    };

  case 'LOG_IN_SUCCESS':
    return {
      ...state,
      token: action.data.token
    };

  case 'NEW_USER_ERROR':
    return {
      ...state,
      errors:{
        ...state.errors,
        signup: action.error
      }
    };

  case 'NEW_USER_SUCCESS':
    return {
      ...state,
      success:{
        ...state.success,
        signup: true
      }
    };

  case 'LIKE_SUCCESS':
    return {
      ...state,
      hobbies: state.hobbies.filter(hobby => hobby._id !== action.data.hobbyId),
      userId: action.data.userId,
      hobbyId: action.data.hobbyId
    };

  case 'DISLIKE_SUCCESS':
    return {
      ...state,
      hobbies: state.hobbies.filter(hobby => hobby._id !== action.data.hobbyId),
      userId: action.data.userId,
      hobbyId: action.data.hobbyId
    };

  case 'POSTHOBBY_SUCCESS':
    return {
      ...state,
      coompletedHobby: action.data
    };

  case 'CREATEHOBBY':
    return {
      ...state,
      currentHobby: action.data
    };

  case 'LOG_OUT':
    return {
      state: null
    };

  case 'FAVORITES_SUCCESS':
    return {
      ...state,
      hobbies: action.data
    };

  default:
    return state;
  }
};

export default reducer;

export default function userReducer(state = {}, action) {
    switch(action.type) {
      case 'UPDATE_USER': {
        return { ...state, user: action.data }
      }
      default: {
        return state
      }
    }
  }
  
  
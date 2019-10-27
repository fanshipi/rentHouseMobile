import { SAVE_COMMUNITY, GET_COMMUNITY } from './actionType'

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_COMMUNITY:
      state = action.community
      return state
    case GET_COMMUNITY:
      return state
    default:
      return state
  }
}

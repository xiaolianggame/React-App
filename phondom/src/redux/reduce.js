import {combineReducers} from 'redux'

function aa (state = 0, action) {
  return state
}
function bb (state = 1, action) {
    return state
  }

export default combineReducers({
    aa, bb
})
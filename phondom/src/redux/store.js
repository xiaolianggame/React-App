import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reduces from './reduce'

export default createStore(reduces, applyMiddleware(thunk))
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gowesHubLeaveRequest: ['data'],
  gowesHubLeaveSuccess: ['payload'],
  gowesHubLeaveFailure: ['errorMessages']
})

export const GowesHubLeaveTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GowesHubLeaveSelectors = {
  getData: (state) => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state) => state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GOWES_HUB_LEAVE_REQUEST]: request,
  [Types.GOWES_HUB_LEAVE_SUCCESS]: success,
  [Types.GOWES_HUB_LEAVE_FAILURE]: failure
})

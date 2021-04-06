import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setToken: ['token'],
  setEmail: ['email'],
  removeToken: null
})

export const TokenizerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  email: null
})

/* ------------- Selectors ------------- */

export const TokenizerSelectors = {
  getToken: (state) => state.token
}

/* ------------- Reducers ------------- */

export const set = (state, { token }) => {
  return state.merge({ token })
}

export const setEmail = (state, { email }) => {
  return state.merge({ email })
}

export const remove = (state) => {
  return state.merge({ token: null, email: null })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TOKEN]: set,
  [Types.SET_EMAIL]: setEmail,
  [Types.REMOVE_TOKEN]: remove
})

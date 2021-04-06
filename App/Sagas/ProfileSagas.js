/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put } from 'redux-saga/effects'
import ProfileActions from '../Redux/ProfileRedux'
import ChangePasswordActions from '../Redux/ChangePasswordRedux'
import TokenizerActions from '../Redux/TokenizerRedux'
import LogoutAction from '../Redux/LogoutReduxRedux'

import { responseWrapper } from '../Transforms/Api'
import { FlashMessage } from '../Presentational'
import { navigateBack, reset } from '../Services/Navigator'

// import { ProfileSelectors } from '../Redux/ProfileRedux'

export function* getProfile(api) {
  const response = responseWrapper(yield call(api.getProfile))
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(ProfileActions.profileSuccess(responseData))
    yield put(TokenizerActions.setToken(responseData.content))
  }
  if (response.FAILURE) {
    yield put(ProfileActions.profileFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(ProfileActions.profileFailure())
  }
}

export function* changePassword(api, action) {
  // const { OldPassword, CurrentPassword, ConfirmCurrentPassword } = action.data
  const response = responseWrapper(yield call(api.changePassword, action.data))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(ChangePasswordActions.changePasswordSuccess(responseData))
    FlashMessage.show(responseData.message)
    yield put(navigateBack())
  }
  if (response.FAILURE) {
    let errorMessages = null
    if (response.MESSAGE && response.MESSAGE.validationErrors) {
      errorMessages = response.MESSAGE.validationErrors
    }
    yield put(ChangePasswordActions.changePasswordFailure(errorMessages))
  }
  if (response.NETWORK_ERROR) {
    yield put(ChangePasswordActions.changePasswordFailure())
  }
}

export function* logout(api, action) {
  const response = responseWrapper(yield call(api.logout))
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(LogoutAction.logoutReduxSuccess(responseData))
    yield put(reset('MainTabScreen'))
  }
  if (response.FAILURE) {
    yield put(LogoutAction.logoutReduxFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(LogoutAction.logoutReduxFailure())
  }
}

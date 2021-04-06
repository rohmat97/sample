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
import UpdateProfileActions from '../Redux/UpdateProfileRedux'
import { responseWrapper } from '../Transforms/Api'
import { navigateBack } from '../Services/Navigator'
import { FlashMessage } from '../Presentational'
// import { UpdateProfileSelectors } from '../Redux/UpdateProfileRedux'

export function* updateProfile(api, action) {
  const response = responseWrapper(yield call(api.updateProfile, action.data))
  if (response.SUCCESS) {
    const responseData = response.DATA

    yield put(UpdateProfileActions.updateProfileSuccess(responseData))
    FlashMessage.show(responseData.message)
    yield put(navigateBack())
  }
  if (response.FAILURE) {
    let errorMessages = null
    if (response.MESSAGE && response.MESSAGE.validationErrors) {
      errorMessages = response.MESSAGE.validationErrors
    }
    yield put(UpdateProfileActions.updateProfileFailure(errorMessages))
  }
  if (response.NETWORK_ERROR) {
    yield put(UpdateProfileActions.updateProfileFailure())
  }
}

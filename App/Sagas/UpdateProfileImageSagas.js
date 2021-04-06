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
import UpdateProfileImageActions from '../Redux/UpdateProfileImageRedux'
import { responseWrapper } from '../Transforms/Api'
import { navigateBack } from '../Services/Navigator'
import { FlashMessage } from '../Presentational'
// import { UpdateProfileImageSelectors } from '../Redux/UpdateProfileImageRedux'

export function* updateProfileImage(api, action) {
  const { images } = action.data

  const file = new FormData()
  file.append('images', images)

  const response = responseWrapper(yield call(api.updateProfileImage, file))
  if (response.SUCCESS) {
    const responseData = response.DATA

    yield put(UpdateProfileImageActions.updateProfileImageSuccess(responseData))
    FlashMessage.show(responseData.message)
    yield put(navigateBack())
  }
  if (response.FAILURE) {
    let errorMessages = null
    if (response.MESSAGE && response.MESSAGE.validationErrors) {
      errorMessages = response.MESSAGE.validationErrors
    }
    yield put(UpdateProfileImageActions.updateProfileImageFailure(errorMessages))
  }
  if (response.NETWORK_ERROR) {
    yield put(UpdateProfileImageActions.updateProfileImageFailure())
  }
}

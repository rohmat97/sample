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
import UpgradeUserActions from '../Redux/UpgradeUserRedux'
import { responseWrapper } from '../Transforms/Api'
import { FlashMessage } from '../Presentational'
import { navigateBack } from '../Services/Navigator'

// import { UpgradeUserSelectors } from '../Redux/UpgradeUserRedux'

export function* upgradeUser(api, action) {
  const { ImageKTP, ImageUserAndKTP, IdCardNumber } = action.data

  const file = new FormData()
  file.append('IdCardNumber', IdCardNumber)
  file.append('ImageKTP', ImageKTP)
  file.append('ImageUserAndKTP', ImageUserAndKTP)

  const response = responseWrapper(yield call(api.upgradeUser, file))
  if (response.SUCCESS) {
    const responseData = response.DATA

    yield put(UpgradeUserActions.upgradeUserSuccess(responseData))
    FlashMessage.show(responseData.message)
    yield put(navigateBack())
  }
  if (response.FAILURE) {
    let errorMessages = null
    if (response.MESSAGE && response.MESSAGE.validationErrors) {
      errorMessages = response.MESSAGE.validationErrors
    }
    yield put(UpgradeUserActions.upgradeUserFailure(errorMessages))
  }
  if (response.NETWORK_ERROR) {
    yield put(UpgradeUserActions.upgradeUserFailure())
  }
}

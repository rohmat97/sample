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
import GowesHubActions from '../Redux/GowesHubRedux'
import GowesHubRegActions from '../Redux/GowesHubRegRedux'
import GowesHubLeaveActions from '../Redux/GowesHubLeaveRedux'
import { responseWrapper } from '../Transforms/Api'
import { reset } from '../Services/Navigator'
import { FlashMessage } from '../Presentational'
// import { GowesHubSelectors } from '../Redux/GowesHubRedux'

export function* gowesHubReg(api, action) {
  const {
    id,
    fullName,
    placeOfBirth,
    dateOfBirth,
    phoneNumber,
    job,
    gender,
    bikeType,
    bikeExperience,
    images
  } = action.data
  const file = new FormData()
  file.append('id', id)
  file.append('fullName', fullName)
  file.append('placeOfBirth', placeOfBirth)
  file.append('dateOfBirth', dateOfBirth)
  file.append('phoneNumber', phoneNumber)
  file.append('job', job)
  file.append('gender', gender)
  file.append('bikeType', bikeType)
  file.append('bikeExperience', bikeExperience)
  file.append('images', images)
  const response = responseWrapper(yield call(api.gowesHubReg, file))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GowesHubRegActions.gowesHubRegSuccess(responseData))
    FlashMessage.show(responseData.message)
    yield put(reset('MainTabScreen'))
  }
  if (response.FAILURE) {
    let errorMessages = null
    if (response.MESSAGE && response.MESSAGE.validationErrors) {
      errorMessages = response.MESSAGE.validationErrors
    }
    yield put(GowesHubRegActions.gowesHubRegFailure(errorMessages))
  }
  if (response.NETWORK_ERROR) {
    yield put(GowesHubRegActions.gowesHubRegFailure())
  }
}

export function* getAllBiker(api, action) {
  const { latitude, longitude } = action.data

  const response = responseWrapper(yield call(api.getAllBiker, latitude, longitude))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GowesHubActions.gowesHubSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GowesHubActions.gowesHubFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GowesHubActions.gowesHubFailure())
  }
}

export function* bikerLeave(api) {
  const response = responseWrapper(yield call(api.bikerLeave))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GowesHubLeaveActions.gowesHubLeaveSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GowesHubLeaveActions.gowesHubLeaveFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GowesHubLeaveActions.gowesHubLeaveFailure())
  }
}

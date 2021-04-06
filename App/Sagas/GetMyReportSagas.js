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
import GetMyReportActions from '../Redux/GetMyReportRedux'
import GetMyEmergencyReportActions from '../Redux/GetMyEmergencyReportRedux'
import { responseWrapper } from '../Transforms/Api'
// import { GetMyReportSelectors } from '../Redux/GetMyReportRedux'

export function* getMyReport(api) {
  const response = responseWrapper(yield call(api.getMyReport))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GetMyReportActions.getMyReportSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GetMyReportActions.getMyReportFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GetMyReportActions.getMyReportFailure())
  }
}

export function* getMyEmergencyReport(api) {
  const response = responseWrapper(yield call(api.getMyEmergencyReport))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GetMyEmergencyReportActions.getMyEmergencyReportSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GetMyEmergencyReportActions.getMyEmergencyReportFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GetMyEmergencyReportActions.getMyEmergencyReportFailure())
  }
}

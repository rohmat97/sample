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
import CreateEmergencyReportActions from '../Redux/CreateEmergencyReportRedux'
import { responseWrapper } from '../Transforms/Api'
import { FlashMessage } from '../Presentational'
import { navigateBack } from '../Services/Navigator'

export function* createEmergencyReport(api, action) {
  const { locationDetail, latitude, longitude, image, headline } = action.data
  const file = new FormData()
  file.append('locationDetail', locationDetail)
  file.append('latitude', latitude)
  file.append('longitude', longitude)
  file.append('image', image)
  file.append('category', headline)

  const response = responseWrapper(yield call(api.createEmergencyReport, file))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(CreateEmergencyReportActions.createEmergencyReportSuccess(responseData))
    FlashMessage.show(responseData.message)
    yield put(navigateBack())
  }
  if (response.FAILURE) {
    yield put(CreateEmergencyReportActions.createEmergencyReportFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(CreateEmergencyReportActions.createEmergencyReportFailure())
  }
}

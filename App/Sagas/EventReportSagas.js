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

import { put, select, call } from 'redux-saga/effects'
import AllEventReportActions from '../Redux/AllEventReportRedux'
import CreateEventReportActions from '../Redux/CreateEventReportRedux'
import GetTokenApiActions from '../Redux/GetTokenApiRedux'
import { responseWrapper } from '../Transforms/Api'
import { FlashMessage } from '../Presentational'
import { reset, navigate } from '../Services/Navigator'

export function* createEventReport(api, action) {
  const { headline, description, latitude, longitude, image } = action.data
  const file = new FormData()
  file.append('headline', headline)
  file.append('description', description)
  file.append('latitude', latitude)
  file.append('longitude', longitude)
  file.append('image', image)

  const response = responseWrapper(yield call(api.createEventReport, file))

  if (response.SUCCESS) {
    const responseData = response.DATA
    if (responseData.isSuccess === false) {
      yield put(reset('LoginScreen'))
    } else {
      yield put(CreateEventReportActions.createEventReportSuccess(responseData))
      FlashMessage.show(responseData.message)
      yield put(reset('MainTabScreen'))
    }
  }
  if (response.FAILURE) {
    yield put(CreateEventReportActions.createEventReportFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(CreateEventReportActions.createEventReportFailure())
  }
}

export function* getAllEventReport(api, action) {
  const { latitude, longitude } = action.data

  const response = responseWrapper(yield call(api.getAllEventReport, latitude, longitude))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(AllEventReportActions.allEventReportSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(AllEventReportActions.allEventReportFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(AllEventReportActions.allEventReportFailure())
  }
}

export function* getAllEventReportById(api, action) {
  const { Id } = action

  const userNameOrEmailAddress = 'bandunghubapi@api.com'
  const password = '3}X,U8sbht=[#H'
  const rememberClient = 'true'

  const response = responseWrapper(yield call(api.getTokenApi, userNameOrEmailAddress, password, rememberClient))

  if (response.SUCCESS) {
    const { tokenizer } = yield select()
    if (tokenizer && tokenizer.token) yield call(api.setUserToken, tokenizer.token.token)
    const responseData = response.DATA
    yield call(api.setAuthBearer, responseData.accessToken)
    yield put(GetTokenApiActions.getTokenApiSuccess(responseData))

    const response2 = responseWrapper(yield call(api.getAllEventReportById, Id))

    if (response2.SUCCESS) {
      const responseData = response2.DATA
      yield put(
        navigate('DetailEventScreen', {
          id: responseData.content.id,
          headline: responseData.content.headline,
          address: responseData.content.address,
          imagePost: responseData.content.imageUrl,
          description: responseData.content.description,
          userName: responseData.content.user.fullName,
          userImage: responseData.content.user.imageUrl
        })
      )
      yield put(AllEventReportActions.allEventReportSuccess(responseData))
    }
  }
  if (response.FAILURE) {
    yield put(GetTokenApiActions.getTokenApiFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GetTokenApiActions.getTokenApiFailure())
  }
}

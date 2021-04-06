/* eslint no-undef: "off" */
/* eslint no-console: "off" */
import { put, select, call } from 'redux-saga/effects'
import { responseWrapper } from '../Transforms/Api'
import GetTokenApiActions from '../Redux/GetTokenApiRedux'
// import GetAllBannerActions from '../Redux/GetAllBannerRedux'
// import TenantActions from '../Redux/TenantRedux'
import { reset } from '../Services/Navigator'

// process STARTUP actions
export function* startup(api) {
  if (__DEV__ && console.tron) {
    // only code dev will running in this condition
  }
  // const { tokenAPI } = yield select()
  // if(!tokenAPI.payload) {
  const userNameOrEmailAddress = 'bandunghubapi@api.com'
  const password = '3}X,U8sbht=[#H'
  const rememberClient = 'true'
  yield put(GetTokenApiActions.getTokenApiRequest({ userNameOrEmailAddress, password, rememberClient }))
  // } else {
  //   yield call(api.setAuthBearer, tokenAPI.payload.accessToken)
  // }
}

export function* getTokenApi(api, action) {
  // try {
  const { userNameOrEmailAddress, password, rememberClient } = action.data
  const response = responseWrapper(yield call(api.getTokenApi, userNameOrEmailAddress, password, rememberClient))

  if (response.SUCCESS) {
    const { tokenizer } = yield select()
    if (tokenizer && tokenizer.token) yield call(api.setUserToken, tokenizer.token.token)
    const responseData = response.DATA
    yield call(api.setAuthBearer, responseData.accessToken)
    yield put(GetTokenApiActions.getTokenApiSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GetTokenApiActions.getTokenApiFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GetTokenApiActions.getTokenApiFailure())
  }
  // } catch (error) {
  //   crashlytics.logError(0, 'AGENT_FLAG_FAILURE', null, error)
  // }
}

export function* routingStartUp() {
  const { tokenizer } = yield select()
  const { token } = tokenizer
  if (token) {
    const { isConfirmed } = token
    if (!isConfirmed) yield put(reset('VerificationScreen'))
  }
}

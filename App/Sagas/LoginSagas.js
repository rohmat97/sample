import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import TokenizerActions from '../Redux/TokenizerRedux'
import ForgotPasswordActions from '../Redux/ForgotPasswordRedux'
import { responseWrapper } from '../Transforms/Api'
import { reset } from '../Services/Navigator'
import { FlashMessage } from '../Presentational'

export function* login(api, action) {
  const { email, password } = action.data

  const response = responseWrapper(yield call(api.login, email, password))
  if (response.CODE === 400) {
    yield put(reset('VerificationScreen'))
  } else {
    if (response.SUCCESS) {
      const responseData = response.DATA
      if (responseData.isSuccess) {
        yield put(TokenizerActions.setToken(responseData.content))
        yield put(TokenizerActions.setEmail(email))
        yield call(api.setUserToken, responseData.content.token)
        yield put(LoginActions.loginSuccess(responseData))
        // yield put(navigate('OnBoardingStack'))
        if (responseData.content.isConfirmed === true) {
          yield put(reset('MainTabScreen'))
        } else {
          yield put(reset('VerificationScreen'))
        }
      } else {
        FlashMessage.show(responseData.message)
        yield put(LoginActions.loginFailure())
      }
    }
    if (response.FAILURE) {
      yield put(LoginActions.loginFailure())
    }
    if (response.NETWORK_ERROR) {
      yield put(LoginActions.loginFailure())
    }
  }
}

export function* forgotPassword(api, action) {
  const { email } = action.data

  const response = responseWrapper(yield call(api.forgotPassword, email))

  if (response.SUCCESS) {
    const responseData = response.DATA
    if (responseData.isSuccess) yield put(ForgotPasswordActions.forgotPasswordSuccess(responseData))
    else {
      FlashMessage.show(responseData.message)
      yield put(ForgotPasswordActions.forgotPasswordFailure())
    }
  }
  if (response.FAILURE) {
    yield put(ForgotPasswordActions.forgotPasswordFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(ForgotPasswordActions.forgotPasswordFailure())
  }
}

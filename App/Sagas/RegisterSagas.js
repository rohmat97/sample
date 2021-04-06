import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import VerificationActions from '../Redux/VerificationRedux'
import ResendVerificationActions from '../Redux/ResendVerificationRedux'
import TokenizerActions from '../Redux/TokenizerRedux'
import { responseWrapper } from '../Transforms/Api'
import { reset } from '../Services/Navigator'
import { FlashMessage } from '../Presentational'

export function* register(api, action) {
  const { fullname, gender, email, phonenumber, password, job } = action.data
  const response = responseWrapper(yield call(api.register, fullname, gender, email, phonenumber, password, job))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(RegisterActions.registerSuccess(responseData))
    yield put(TokenizerActions.setToken(responseData.content))
    yield put(TokenizerActions.setEmail(email))
    yield put(reset('VerificationScreen'))
  }
  if (response.FAILURE) {
    let errorMessages = null
    if (response.MESSAGE && response.MESSAGE.validationErrors) {
      errorMessages = response.MESSAGE.validationErrors
    }
    yield put(RegisterActions.registerFailure(errorMessages))
  }
  if (response.NETWORK_ERROR) {
    yield put(RegisterActions.registerFailure())
  }
}

export function* verification(api, action) {
  const { code } = action.data
  const response = responseWrapper(yield call(api.verification, code))

  if (response.SUCCESS) {
    const responseData = response.DATA
    if (responseData.isSuccess) {
      yield put(VerificationActions.verificationSuccess(responseData.message))
      yield put(TokenizerActions.setToken(responseData.content))
      yield put(reset('MainTabScreen'))
      FlashMessage.show(responseData.message)
    } else {
      yield put(VerificationActions.verificationFailure())
    }
  }
  if (response.FAILURE) {
    yield put(VerificationActions.verificationFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(VerificationActions.verificationFailure())
  }
}

export function* resendVerification(api, action) {
  // const { email } = action.data
  const response = responseWrapper(yield call(api.resendVerifcation, action.data))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(ResendVerificationActions.resendVerificationSuccess(responseData.message))
  }
  if (response.FAILURE) {
    yield put(ResendVerificationActions.resendVerificationFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(ResendVerificationActions.resendVerificationFailure())
  }
}

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
import GetAllDinasActions from '../Redux/GetAllDinasRedux'
import GetDetailDinasActions from '../Redux/GetDetailDinasRedux'
import AboutDinasActions from '../Redux/AboutDinasRedux'
import { responseWrapper } from '../Transforms/Api'
// import { BannerSelectors } from '../Redux/BannerRedux'

export function* getAllDinas(api) {
  const response = responseWrapper(yield call(api.getAllDinas))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GetAllDinasActions.getAllDinasSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GetAllDinasActions.getAllDinasFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GetAllDinasActions.getAllDinasFailure())
  }
}

export function* getDetailDinas(api, action) {
  const { id } = action.data
  const response = responseWrapper(yield call(api.getDetailDinas, id))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GetDetailDinasActions.getDetailDinasSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GetDetailDinasActions.getDetailDinasFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GetDetailDinasActions.getDetailDinasFailure())
  }
}

export function* getAboutDinas(api, action) {
  const { id } = action.data
  const response = responseWrapper(yield call(api.getAboutDinas, id))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(AboutDinasActions.aboutDinasSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(AboutDinasActions.aboutDinasFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(AboutDinasActions.aboutDinasFailure())
  }
}

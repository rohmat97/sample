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
import GetAllBannerActions from '../Redux/GetAllBannerRedux'
import { responseWrapper } from '../Transforms/Api'
// import { BannerSelectors } from '../Redux/BannerRedux'

export function* getAllBanner(api) {
  const response = responseWrapper(yield call(api.getAllBanner))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(GetAllBannerActions.getAllBannerSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(GetAllBannerActions.getAllBannerFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(GetAllBannerActions.getAllBannerFailure())
  }
}

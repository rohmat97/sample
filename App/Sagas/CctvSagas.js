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
import AllCctvActions from '../Redux/AllCctvRedux'
import SearchCctvActions from '../Redux/SearchCctvRedux'
import ReportCctvActions from '../Redux/ReportCctvRedux'
import EvacuationCctvAction from '../Redux/EvacuationCctvReduxRedux'
import EvacuationByCategoryAction from '../Redux/EvacuationByCategoryRedux'
import EvacuationByIdAction from '../Redux/EvacuationByIdRedux'
import EvacuationMessageAction from '../Redux/EvacuationMessageRedux'
import UploadGambarChatAction from '../Redux/UploadGambarChatRedux'
import UploadGambarGowesAction from '../Redux/UploadGambarGoweshubRedux'
import { responseWrapper } from '../Transforms/Api'
import { FlashMessage } from '../Presentational'
// import { CctvSelectors } from '../Redux/CctvRedux'

export function* getAllCctv(api, action) {
  const { tenantId } = action.data

  const response = responseWrapper(yield call(api.getAllCctv, tenantId))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(AllCctvActions.allCctvSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(AllCctvActions.allCctvFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(AllCctvActions.allCctvFailure())
  }
}

export function* searchCctv(api, action) {
  const { title } = action.data

  const response = responseWrapper(yield call(api.searchCctv, title))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(SearchCctvActions.searchCctvSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(SearchCctvActions.searchCctvFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(SearchCctvActions.searchCctvFailure())
  }
}

export function* reportCctv(api, action) {
  const { Cctvid } = action.data

  const response = responseWrapper(yield call(api.reportCctv, Cctvid))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(ReportCctvActions.reportCctvSuccess(responseData))
    FlashMessage.show(responseData.message)
  }
  if (response.FAILURE) {
    const responseData = response.DATA
    yield put(ReportCctvActions.reportCctvFailure())
    FlashMessage.show(responseData.message)
  }
  if (response.NETWORK_ERROR) {
    yield put(ReportCctvActions.reportCctvFailure())
  }
}

export function* evacuationCctv(api, action) {
  const { tenantId } = action.data
  const response = responseWrapper(yield call(api.evacuation, tenantId))
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(EvacuationCctvAction.evacuationCctvReduxSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(EvacuationCctvAction.evacuationCctvReduxFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(EvacuationCctvAction.evacuationCctvReduxFailure())
  }
}

export function* evacuationByCategory(api, action) {
  // const { Category, latitude, longitude } = action.data
  const response = responseWrapper(yield call(api.evacuationByCategory, action.data))
  // console.log('INI DATA BOY', response)
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(EvacuationByCategoryAction.evacuationByCategorySuccess(responseData.content))
  }
  if (response.FAILURE) {
    yield put(EvacuationByCategoryAction.evacuationByCategoryFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(EvacuationByCategoryAction.evacuationByCategoryFailure())
  }
}

export function* evacuationById(api, action) {
  // const { Category, latitude, longitude } = action.data
  const response = responseWrapper(yield call(api.evacuationById, action.data))
  // console.log('INI DATA BOY', response)
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(EvacuationByIdAction.evacuationByIdSuccess(responseData.content))
  }
  if (response.FAILURE) {
    yield put(EvacuationByIdAction.evacuationByIdFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(EvacuationByIdAction.evacuationByIdFailure())
  }
}

export function* evacuationMessageById(api, action) {
  const response = responseWrapper(yield call(api.evacuationMessagesById, action.data))
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(EvacuationMessageAction.evacuationMessageSuccess(responseData.content))
  }
  if (response.FAILURE) {
    yield put(EvacuationMessageAction.evacuationMessageFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(EvacuationMessageAction.evacuationMessageFailure())
  }
}

export function* sendGambarCctv(api, action) {
  const response = responseWrapper(yield call(api.uploadPhotoChat, action.data))
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(UploadGambarChatAction.uploadGambarChatSuccess(responseData.content))
  }
  if (response.FAILURE) {
    yield put(UploadGambarChatAction.uploadGambarChatFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(UploadGambarChatAction.uploadGambarChatFailure())
  }
}

export function* sendGambarGowes(api, action) {
  const response = responseWrapper(yield call(api.uploadPhotoChat, action.data))
  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(UploadGambarGowesAction.uploadGambarGoweshubSuccess(responseData.content))
  }
  if (response.FAILURE) {
    yield put(UploadGambarGowesAction.uploadGambarGoweshubFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(UploadGambarGowesAction.uploadGambarGoweshubFailure())
  }
}

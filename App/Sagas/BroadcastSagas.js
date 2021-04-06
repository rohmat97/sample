import { call, put } from 'redux-saga/effects'
import BroadcastDashboardActions from '../Redux/BroadcastDashboardRedux'
import { responseWrapper } from '../Transforms/Api'

export function* getBroadcastDashboard(api, action) {
  const { tenantId } = action.data

  const response = responseWrapper(yield call(api.getBroadcastDashboard, tenantId))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(BroadcastDashboardActions.broadcastDashboardSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(BroadcastDashboardActions.broadcastDashboardFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(BroadcastDashboardActions.broadcastDashboardFailure())
  }
}

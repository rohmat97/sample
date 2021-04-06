import { call, put } from 'redux-saga/effects'
import MenuActions from '../Redux/MenuRedux'
import TenantActions from '../Redux/TenantRedux'
import { responseWrapper } from '../Transforms/Api'

export function* getMenu(api, action) {
  const { tenantId, level } = action.data
  const apiMenu = level === 'kota' ? api.getMenu : api.getMenuBPBD
  const response = responseWrapper(yield call(apiMenu, tenantId))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(MenuActions.menuSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(MenuActions.menuFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(MenuActions.menuFailure())
  }
}

export function* getTenant(api) {
  const response = responseWrapper(yield call(api.getTenant))

  if (response.SUCCESS) {
    const responseData = response.DATA
    yield put(TenantActions.tenantSuccess(responseData))
  }
  if (response.FAILURE) {
    yield put(TenantActions.tenantFailure())
  }
  if (response.NETWORK_ERROR) {
    yield put(TenantActions.tenantFailure())
  }
}

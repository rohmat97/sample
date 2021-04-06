import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  tokenAPI: require('./GetTokenApiRedux').reducer,
  login: require('./LoginRedux').reducer,
  tokenizer: require('./TokenizerRedux').reducer,
  allBanner: require('./GetAllBannerRedux').reducer,
  allCctv: require('./AllCctvRedux').reducer,
  searchCctv: require('./SearchCctvRedux').reducer,
  reportCctv: require('./ReportCctvRedux').reducer,
  broadcastDashboard: require('./BroadcastDashboardRedux').reducer,
  menu: require('./MenuRedux').reducer,
  tenant: require('./TenantRedux').reducer,
  register: require('./RegisterRedux').reducer,
  verification: require('./VerificationRedux').reducer,
  forgotPassword: require('./ForgotPasswordRedux').reducer,
  resendVerification: require('./ResendVerificationRedux').reducer,
  evacuationCctv: require('./EvacuationCctvReduxRedux').reducer,
  evacuationCctvByCategory: require('./EvacuationByCategoryRedux.js').reducer,
  EvacuationById: require('./EvacuationByIdRedux').reducer,
  getAllDinas: require('./GetAllDinasRedux').reducer,
  getDetailDinas: require('./GetDetailDinasRedux').reducer,
  aboutDinas: require('./AboutDinasRedux').reducer,
  createEmergencyReport: require('./CreateEmergencyReportRedux').reducer,
  createEventReport: require('./CreateEventReportRedux').reducer,
  allEventReport: require('./AllEventReportRedux').reducer,
  allEventReportById: require('./AllEventReportRedux').reducer,
  profile: require('./ProfileRedux').reducer,
  changePassword: require('./ChangePasswordRedux').reducer,
  upgradeUser: require('./UpgradeUserRedux').reducer,
  version: require('./VersionRedux').reducer,
  getAllBiker: require('./GowesHubRedux').reducer,
  gowesHubReg: require('./GowesHubRegRedux').reducer,
  bikerLeave: require('./GowesHubLeaveRedux').reducer,
  getMyReport: require('./GetMyReportRedux').reducer,
  getMyEmergencyReport: require('./GetMyEmergencyReportRedux').reducer,
  logout: require('./LogoutReduxRedux').reducer,
  evacuationMessageId: require('./EvacuationMessageRedux').reducer,
  uploadGambar: require('./UploadGambarChatRedux').reducer,
  uploadGowes: require('./UploadGambarGoweshubRedux').reducer,
  updateProfile: require('./UpdateProfileRedux').reducer,
  updateProfileImage: require('./UpdateProfileImageRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}

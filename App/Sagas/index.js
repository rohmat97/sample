import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GetTokenApiTypes } from '../Redux/GetTokenApiRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { GetAllBannerTypes } from '../Redux/GetAllBannerRedux'
import { AllCctvTypes } from '../Redux/AllCctvRedux'
import { SearchCctvTypes } from '../Redux/SearchCctvRedux'
import { ReportCctvTypes } from '../Redux/ReportCctvRedux'
import { BroadcastDashboardTypes } from '../Redux/BroadcastDashboardRedux'
import { MenuTypes } from '../Redux/MenuRedux'
import { TenantTypes } from '../Redux/TenantRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { VerificationTypes } from '../Redux/VerificationRedux'
import { ForgotPasswordTypes } from '../Redux/ForgotPasswordRedux'
import { ResendVerificationTypes } from '../Redux/ResendVerificationRedux'
import { EvacuationCctvReduxTypes } from '../Redux/EvacuationCctvReduxRedux'
import { EvacuationByCategoryTypes } from '../Redux/EvacuationByCategoryRedux'
import { EvacuationByIdTypes } from '../Redux/EvacuationByIdRedux'
import { GetAllDinasTypes } from '../Redux/GetAllDinasRedux'
import { GetDetailDinasTypes } from '../Redux/GetDetailDinasRedux'
import { AboutDinasTypes } from '../Redux/AboutDinasRedux'
import { CreateEmergencyReportTypes } from '../Redux/CreateEmergencyReportRedux'
import { CreateEventReportTypes } from '../Redux/CreateEventReportRedux'
import { AllEventReportTypes } from '../Redux/AllEventReportRedux'
import { ProfileTypes } from '../Redux/ProfileRedux'
import { ChangePasswordTypes } from '../Redux/ChangePasswordRedux'
import { UpgradeUserTypes } from '../Redux/UpgradeUserRedux'
import { VersionTypes } from '../Redux/VersionRedux'
import { GowesHubTypes } from '../Redux/GowesHubRedux'
import { GowesHubRegTypes } from '../Redux/GowesHubRegRedux'
import { GowesHubLeaveTypes } from '../Redux/GowesHubLeaveRedux'
import { GetMyReportTypes } from '../Redux/GetMyReportRedux'
import { GetMyEmergencyReportTypes } from '../Redux/GetMyEmergencyReportRedux'
import { LogoutReduxTypes } from '../Redux/LogoutReduxRedux'
import { EvacuationMessageTypes } from '../Redux/EvacuationMessageRedux'
import { UpdateProfileTypes } from '../Redux/UpdateProfileRedux'
import { UploadGambarChatTypes } from '../Redux/UploadGambarChatRedux'
import { UploadGambarGoweshubTypes } from '../Redux/UploadGambarGoweshubRedux'
import { UpdateProfileImageTypes } from '../Redux/UpdateProfileImageRedux'

/* ------------- Sagas ------------- */

import { startup, getTokenApi, routingStartUp } from './StartupSagas'
import { login, forgotPassword } from './LoginSagas'
import { getAllBanner } from './BannerSagas'
import {
  getAllCctv,
  searchCctv,
  evacuationCctv,
  evacuationByCategory,
  evacuationById,
  reportCctv,
  evacuationMessageById,
  sendGambarCctv,
  sendGambarGowes
} from './CctvSagas'
import { getBroadcastDashboard } from './BroadcastSagas'
import { getMenu, getTenant } from './MenuSagas'
import { register, verification, resendVerification } from './RegisterSagas'
import { getAllDinas, getDetailDinas, getAboutDinas } from './DinasSagas'
import { createEmergencyReport } from './EmergencyReportSagas'
import { createEventReport, getAllEventReport, getAllEventReportById } from './EventReportSagas'
import { getProfile, changePassword, logout } from './ProfileSagas'
import { upgradeUser } from './UpgradeUserSagas'
import { getVersion } from './VersionSagas'
import { getAllBiker, gowesHubReg, bikerLeave } from './GowesHubSagas'
import { getMyReport, getMyEmergencyReport } from './GetMyReportSagas'
import { updateProfile } from './UpdateProfileSagas'
import { updateProfileImage } from './UpdateProfileImageSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(GetTokenApiTypes.GET_TOKEN_API_REQUEST, getTokenApi, api),
    takeLatest(GetTokenApiTypes.GET_TOKEN_API_SUCCESS, routingStartUp),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(GetAllBannerTypes.GET_ALL_BANNER_REQUEST, getAllBanner, api),
    takeLatest(AllCctvTypes.ALL_CCTV_REQUEST, getAllCctv, api),
    takeLatest(SearchCctvTypes.SEARCH_CCTV_REQUEST, searchCctv, api),
    takeLatest(ReportCctvTypes.REPORT_CCTV_REQUEST, reportCctv, api),
    takeLatest(BroadcastDashboardTypes.BROADCAST_DASHBOARD_REQUEST, getBroadcastDashboard, api),
    takeLatest(MenuTypes.MENU_REQUEST, getMenu, api),
    takeLatest(TenantTypes.TENANT_REQUEST, getTenant, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(VerificationTypes.VERIFICATION_REQUEST, verification, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ResendVerificationTypes.RESEND_VERIFICATION_REQUEST, resendVerification, api),
    takeLatest(EvacuationCctvReduxTypes.EVACUATION_CCTV_REDUX_REQUEST, evacuationCctv, api),
    takeLatest(EvacuationByCategoryTypes.EVACUATION_BY_CATEGORY_REQUEST, evacuationByCategory, api),
    takeLatest(EvacuationByIdTypes.EVACUATION_BY_ID_REQUEST, evacuationById, api),
    takeLatest(GetAllDinasTypes.GET_ALL_DINAS_REQUEST, getAllDinas, api),
    takeLatest(GetDetailDinasTypes.GET_DETAIL_DINAS_REQUEST, getDetailDinas, api),
    takeLatest(AboutDinasTypes.ABOUT_DINAS_REQUEST, getAboutDinas, api),
    takeLatest(CreateEmergencyReportTypes.CREATE_EMERGENCY_REPORT_REQUEST, createEmergencyReport, api),
    takeLatest(CreateEventReportTypes.CREATE_EVENT_REPORT_REQUEST, createEventReport, api),
    takeLatest(AllEventReportTypes.ALL_EVENT_REPORT_REQUEST, getAllEventReport, api),
    takeLatest(ProfileTypes.PROFILE_REQUEST, getProfile, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UpgradeUserTypes.UPGRADE_USER_REQUEST, upgradeUser, api),
    takeLatest(VersionTypes.VERSION_REQUEST, getVersion, api),
    takeLatest(GowesHubTypes.GOWES_HUB_REQUEST, getAllBiker, api),
    takeLatest(GowesHubRegTypes.GOWES_HUB_REG_REQUEST, gowesHubReg, api),
    takeLatest(GowesHubLeaveTypes.GOWES_HUB_LEAVE_REQUEST, bikerLeave, api),
    takeLatest(AllEventReportTypes.ALL_EVENT_REPORT_SHARE, getAllEventReportById, api),
    takeLatest(GetMyReportTypes.GET_MY_REPORT_REQUEST, getMyReport, api),
    takeLatest(GetMyEmergencyReportTypes.GET_MY_EMERGENCY_REPORT_REQUEST, getMyEmergencyReport, api),
    takeLatest(LogoutReduxTypes.LOGOUT_REDUX_REQUEST, logout, api),
    takeLatest(EvacuationMessageTypes.EVACUATION_MESSAGE_REQUEST, evacuationMessageById, api),
    takeLatest(UploadGambarChatTypes.UPLOAD_GAMBAR_CHAT_REQUEST, sendGambarCctv, api),
    takeLatest(UploadGambarGoweshubTypes.UPLOAD_GAMBAR_GOWESHUB_REQUEST, sendGambarGowes, api),
    takeLatest(UpdateProfileTypes.UPDATE_PROFILE_REQUEST, updateProfile, api),
    takeLatest(UpdateProfileImageTypes.UPDATE_PROFILE_IMAGE_REQUEST, updateProfileImage, api)
  ])
}

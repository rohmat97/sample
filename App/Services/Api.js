// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import {
  TIMEOUT_API,
  API_MOBILE_BASE_URL,
  API_MOBILE_GET_TOKEN,
  API_MOBILE_LOGIN,
  API_MOBILE_BANNER_GETALL,
  API_MOBILE_CCTV_GETALL,
  API_MOBILE_CCTV_SEARCH,
  API_MOBILE_REPORT_CCTV,
  API_MOBILE_BROADCST_GET_DASHBOARD,
  API_MOBILE_SEGMENT_GET_MENU,
  API_MOBILE_SEGMENT_GET_MENU_BPBD,
  API_MOBILE_SEGMENT_GET_TENANT,
  API_MOBILE_REGISTER,
  API_MOBILE_VERIFICATION,
  API_MOBILE_FORGOT_PASSWORD,
  API_MOBILE_RESEND_VERIFICATION,
  API_EVACUATION_API,
  API_EMERGENCY_CATEGORY,
  API_EVACUATION_BY_ID,
  API_MOBILE_DINAS_GET_ALL,
  API_MOBILE_DINAS_GET_DETAIL,
  API_MOBILE_DINAS_ABOUT,
  API_MOBILE_EMERGENCY_REPORT_CREATE,
  API_MOBILE_EVENT_REPORT_CREATE,
  API_MOBILE_EVENT_REPORT_GETALL,
  API_MOBILE_EVENT_REPORT_GETBYID,
  API_MOBILE_PROFILE,
  API_MOBILE_CHANGE_PASSWORD,
  API_MOBILE_UPGRADE_USER,
  API_MOBILE_VERSION,
  API_GOWES_HUB_REGISIRATION,
  API_GOWES_HUB,
  API_GOWES_HUB_LEAVE,
  API_GET_MY_REPORT,
  API_GET_MY_EMERGENCY_REPORT,
  API_MOBILE_LOGOUT,
  API_EVACUATION_MESSAGES_BY_ID,
  API_MOBILE_UPDATE_PROFILE,
  API_UPLOAD_PHOTO,
  API_MOBILE_UPDATE_PROFILE_IMAGE
} from '../Config/ApiConfig'
import { headerJSON, headerFormData } from '../Transforms/Api'

// our "constructor"
const create = (baseURL = API_MOBILE_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    // headers: {
    //   'Cache-Control': 'no-cache'
    // },
    timeout: TIMEOUT_API
  })

  /**
   * UTILITY
   */
  const typeJSON = () => {
    api.setHeader('Content-Type', 'application/json')

    return true
  }

  const typeFormData = () => {
    api.setHeader('Content-Type', 'multipart/form-data')

    return true
  }

  const setUserToken = (token) => {
    api.setHeader('Token', `${token}`)

    return true
  }

  const removeUserToken = () => {
    api.deleteHeader('Token')

    return true
  }

  const setAuthBearer = (bearer) => {
    api.setHeader('Authorization', `bearer ${bearer}`)

    return true
  }

  const removeAuthBearer = () => {
    api.deleteHeader('Authorization')

    return true
  }

  /**
   * USER
   */
  const getTokenApi = (userNameOrEmailAddress, password, rememberClient) =>
    headerJSON(api.post(API_MOBILE_GET_TOKEN, { userNameOrEmailAddress, password, rememberClient }))
  const login = (email, password) => headerJSON(api.post(API_MOBILE_LOGIN, { email, password }))
  const register = (fullname, gender, email, phonenumber, password, job) =>
    headerJSON(api.post(API_MOBILE_REGISTER, { fullname, gender, email, phonenumber, password, job }))
  const verification = (code) => headerJSON(api.post(API_MOBILE_VERIFICATION, { code }))
  const forgotPassword = (email) => headerJSON(api.post(API_MOBILE_FORGOT_PASSWORD, { email }))
  const resendVerifcation = (payload) => headerJSON(api.post(API_MOBILE_RESEND_VERIFICATION, payload))
  const getProfile = () => headerJSON(api.get(API_MOBILE_PROFILE))
  const changePassword = (payload) => headerJSON(api.post(API_MOBILE_CHANGE_PASSWORD, payload))
  const upgradeUser = (file) => headerFormData(api.post(API_MOBILE_UPGRADE_USER, file))
  const getVersion = () => headerJSON(api.get(API_MOBILE_VERSION))
  const logout = () => headerJSON(api.post(API_MOBILE_LOGOUT))
  const updateProfile = (file) => headerFormData(api.post(API_MOBILE_UPDATE_PROFILE, file))
  const updateProfileImage = (file) => headerFormData(api.post(API_MOBILE_UPDATE_PROFILE_IMAGE, file))

  /**
   * Banner
   */
  const getAllBanner = (tenantId) => headerJSON(api.post(API_MOBILE_BANNER_GETALL, { tenantId }))

  /**
   * CCTV
   */
  const getAllCctv = (tenantId) => headerJSON(api.post(API_MOBILE_CCTV_GETALL, { tenantId, type: 0 }))
  const searchCctv = (title) => headerJSON(api.post(API_MOBILE_CCTV_SEARCH, { title }))
  const reportCctv = (Cctvid) => headerJSON(api.post(API_MOBILE_REPORT_CCTV, { Cctvid }))
  /*
Evacuation
*/
  const evacuation = (tenantId) => headerJSON(api.post(API_EVACUATION_API, { tenantId }))
  /* Evacuation by Category */
  const evacuationByCategory = (payload) =>
    headerJSON(
      api.post(API_EMERGENCY_CATEGORY, payload)
      // console.log('KIRIMANNYA', payload)
    )
  const evacuationById = (payload) => headerJSON(api.post(API_EVACUATION_BY_ID, payload))
  const evacuationMessagesById = (payload) => headerJSON(api.post(API_EVACUATION_MESSAGES_BY_ID, payload))
  /**
   * GowesHub
   */
  const getAllBiker = (latitude, longitude) =>
    headerJSON(api.post(API_GOWES_HUB, { Latitude: latitude, Longitude: longitude }))
  const gowesHubReg = (file) => headerFormData(api.post(API_GOWES_HUB_REGISIRATION, file))
  const bikerLeave = () => headerJSON(api.get(API_GOWES_HUB_LEAVE))

  /**
   * Broadcast
   */
  const getBroadcastDashboard = (tenantId) => headerJSON(api.post(API_MOBILE_BROADCST_GET_DASHBOARD, { tenantId }))

  /**
   * Segment
   */
  const getMenu = (tenantId) => headerJSON(api.post(API_MOBILE_SEGMENT_GET_MENU, { tenantId }))
  const getMenuBPBD = (tenantId) => headerJSON(api.post(API_MOBILE_SEGMENT_GET_MENU_BPBD, { tenantId }))
  const getTenant = () => headerJSON(api.get(API_MOBILE_SEGMENT_GET_TENANT))

  /**
   * EmergencyReport
   */
  const createEmergencyReport = (file) => headerFormData(api.post(API_MOBILE_EMERGENCY_REPORT_CREATE, file))

  /**
   * EventReport
   */
  const createEventReport = (file) => headerFormData(api.post(API_MOBILE_EVENT_REPORT_CREATE, file))
  const getAllEventReport = (latitude, longitude) =>
    headerJSON(api.post(API_MOBILE_EVENT_REPORT_GETALL, { Latitude: latitude, Longitude: longitude }))
  const getAllEventReportById = (Id) => headerJSON(api.post(API_MOBILE_EVENT_REPORT_GETBYID, { Id: Id }))

  /**
   * Dinas
   */
  const getAllDinas = () => headerJSON(api.get(API_MOBILE_DINAS_GET_ALL))
  const getDetailDinas = (id) => headerJSON(api.post(API_MOBILE_DINAS_GET_DETAIL, { id }))
  const getAboutDinas = (id) => headerJSON(api.post(API_MOBILE_DINAS_ABOUT, { id }))

  const getMyReport = () => headerJSON(api.get(API_GET_MY_REPORT))
  const getMyEmergencyReport = () => headerJSON(api.get(API_GET_MY_EMERGENCY_REPORT))

  const uploadPhotoChat = (file) => headerFormData(api.post(API_UPLOAD_PHOTO, file))

  return {
    typeJSON,
    typeFormData,
    setUserToken,
    removeUserToken,
    setAuthBearer,
    removeAuthBearer,
    getTokenApi,
    login,
    getAllBanner,
    getAllCctv,
    searchCctv,
    reportCctv,
    getBroadcastDashboard,
    getMenu,
    getMenuBPBD,
    getTenant,
    register,
    verification,
    forgotPassword,
    resendVerifcation,
    evacuation,
    evacuationByCategory,
    evacuationById,
    getAllDinas,
    getDetailDinas,
    getAboutDinas,
    createEmergencyReport,
    createEventReport,
    getAllEventReport,
    getAllEventReportById,
    getProfile,
    changePassword,
    upgradeUser,
    getVersion,
    getAllBiker,
    gowesHubReg,
    bikerLeave,
    getMyReport,
    getMyEmergencyReport,
    logout,
    evacuationMessagesById,
    updateProfile,
    uploadPhotoChat,
    updateProfileImage
  }
}

// let's return back our create method as the default.
export default {
  create
}

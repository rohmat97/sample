import DeviceInfo from 'react-native-device-info'
import Config from 'react-native-config'

export const API_MOBILE_BASE_URL = Config.API
export const BASE_IMAGE = Config.IMAGE
export const AUTHORIZATION_API = Config.AUTHORIZATION

/** File upload */
export const FILE_UPLOAD = '/file'

/** Auth */
export const API_MOBILE_GET_TOKEN = '/TokenAuth/Authenticate'

/** User */
export const API_MOBILE_LOGIN = '/Users/Login'
export const API_MOBILE_REGISTER = '/Users/Register'
export const API_MOBILE_VERIFICATION = '/Users/ConfirmationEmail'
export const API_MOBILE_FORGOT_PASSWORD = '/Users/ForgotPassword'
export const API_MOBILE_RESEND_VERIFICATION = '/Users/ResendOTP'
export const API_MOBILE_PROFILE = '/Users/GetProfile'
export const API_MOBILE_CHANGE_PASSWORD = '/Users/ChangePassword'
export const API_MOBILE_UPGRADE_USER = '/Users/UpgradeUser'
export const API_MOBILE_VERSION = '/Configuration'
export const API_MOBILE_LOGOUT = '/Users/Logout'
export const API_MOBILE_UPDATE_PROFILE = '/Users/UpdateProfile'
export const API_UPLOAD_PHOTO = '/Chat/UploadImageChat'
export const API_MOBILE_UPDATE_PROFILE_IMAGE = '/Users/UpdateProfileImage'
/** Banner */
export const API_MOBILE_BANNER_GETALL = '/Banner/GetAll'

/** CCTV */
export const API_MOBILE_CCTV_GETALL = '/Cctv/GetAll'
export const API_MOBILE_CCTV_SEARCH = '/Cctv/Search'
export const API_MOBILE_REPORT_CCTV = '/Cctv/CreateReport'

/** GowesHub */
export const API_GOWES_HUB = '/Bike/GetAll'
export const API_GOWES_HUB_REGISIRATION = '/Bike/BikeVerification'
export const API_GOWES_HUB_LEAVE = '/Bike/Leave'

/** Broadcast */
export const API_MOBILE_BROADCST_GET_DASHBOARD = '/Broadcast/GetBroadcastDashboard'

/** Segment */
export const API_MOBILE_SEGMENT_GET_MENU = '/Segment/GetMenu'
export const API_MOBILE_SEGMENT_GET_MENU_BPBD = '/Segment/GetMenuBPBD'
export const API_MOBILE_SEGMENT_GET_TENANT = '/Segment/GetTenant'

/** EmergencyReport */
export const API_MOBILE_EMERGENCY_REPORT_CREATE = '/VictimReport/Create'

/** EventReport */
export const API_MOBILE_EVENT_REPORT_CREATE = '/EventReport/Create'
export const API_MOBILE_EVENT_REPORT_GETALL = '/EventReport/GetAll'
export const API_MOBILE_EVENT_REPORT_GETBYID = '/EventReport/GetById'
export const API_GET_MY_REPORT = '/EventReport/MyEventReport'
export const API_GET_MY_EMERGENCY_REPORT = '/VictimReport/GetMyReport'

/*
Titik Evakuasi dan Peta Emergency 
*/
export const API_EVACUATION_API = '/EvacuationSite/GetAll'
export const API_EMERGENCY_CATEGORY = '/EvacuationSite/GetEvacuationSiteByCategory'
export const API_EVACUATION_BY_ID = '/EvacuationSite/GetEvacuationSiteById'
export const API_EVACUATION_MESSAGES_BY_ID = '/MessageEvacuationSite/GetAllMessageByEvacuationSiteId'

/* Dinas */
export const API_MOBILE_DINAS_GET_ALL = '/Dinas/GetAllDinas'
export const API_MOBILE_DINAS_GET_DETAIL = '/Dinas/GetDetailDinas'
export const API_MOBILE_DINAS_ABOUT = '/Dinas/GetAboutUsById'

/*
DEVICE INFO
 */
export const DEVICE_ID = DeviceInfo.getDeviceId()
export const DEVICE_BRAND = DeviceInfo.getBrand()
export const DEVICE_SERIAL = DeviceInfo.getSerialNumber()
export const DEVICE_MODEL = DeviceInfo.getModel()
export const DEVICE_VERSION = DeviceInfo.getVersion()

/**
 * TIMEOUT
 */
export const TIMEOUT_API = 10000

/**
 * INIT MAP
 * MONAS, JAKARTA PUSAT
 */
export const defaultRegion = {
  latitude: -6.1725826,
  longitude: 106.8210129,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5
}

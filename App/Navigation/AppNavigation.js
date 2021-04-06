import { createStackNavigator } from 'react-navigation'
import CctvChatScreen from '../Containers/CCTV/CctvChatScreen'
import DetailMenu from '../Containers/CCTV/DetailMenu'
import DetailEventScreen from '../Containers/CCTV/DetailEventScreen'
import Main from '../Containers/Main'
import Login from '../Containers/Login'
import CCTV from '../Containers/CCTV'
import Register from '../Containers/Register'
import Verification from '../Containers/Register/Verification'
import ForgotPassword from '../Containers/Login/ForgotPassword'
import MainTab from '../Containers/MainTab'
import TakePhoto from '../Containers/Report/TakePhoto'
import TakePhotoPreview from '../Containers/Report/Preview'
import Category from '../Containers/Report/Category'
import Report from '../Containers/Report'
import TitikEvakuasi from '../Containers/Evakuasi'
import AboutDinas from '../Containers/CCTV/AboutDinas'
import EmergencyReport from '../Containers/EmergencyReport'
import MyProfile from '../Containers/Profile/MyProfileScreen'
import ChangePassword from '../Containers/Profile/ChangePasswordScreen'
import UpgradeUserScreen from '../Containers/Profile/UpgradeUserScreen'
import AboutUs from '../Containers/Profile/AboutUsScreen'
import GowesHub from '../Containers/GowesHub'
import GowesHubReg from '../Containers/GowesHub/Register'
import GowesHubChat from '../Containers/GowesHub/GowesHubChatScreen'
import CommentsDetailEventScreen from '../Containers/CCTV/CommentsDetailEventScreen'
import CommentEmergencyScreen from '../Containers/CCTV/CommentEmergency'
import CommentEmergencyReportScreen from '../Containers/CCTV/CommentEmergencyReport'
import styles from './Styles/NavigationStyles'
import Profile from '../Containers/Profile'
import MyReport from '../Containers/MyReport'
import DetailEmergencyScreen from '../Containers/CCTV/DetailEmergencyScreen'
import UpdateProfileScreen from '../Containers/Profile/UpdateProfileScreen'
// import transitionConfig from './TransitionConfig'

const BeforeAuthRoutes = () => {
  const routes = {
    ...TakePhotoRoutes(),
    MainScreen: { screen: Main },
    LoginScreen: { screen: Login },
    CctvScreen: { screen: CCTV },
    CctvChatScreen: { screen: CctvChatScreen },
    DetailMenuScreen: { screen: DetailMenu },
    DetailEventScreen: { screen: DetailEventScreen },
    RegistrationScreen: { screen: Register },
    VerificationScreen: { screen: Verification },
    ForgotPasswordScreen: { screen: ForgotPassword },
    ReportScreen: { screen: Report },
    AboutDinasScreen: { screen: AboutDinas },
    MainTabScreen: { screen: MainTab },
    TitikEvakuasi: { screen: TitikEvakuasi },
    EmergencyReportScreen: { screen: EmergencyReport },
    CategoryScreen: { screen: Category },
    MyProfileScreen: { screen: MyProfile },
    ChangePasswordScreen: { screen: ChangePassword },
    UpgradeUserScreen: { screen: UpgradeUserScreen },
    ProfileScreen: { screen: Profile },
    AboutUsScreen: { screen: AboutUs },
    GowesHubRegScreen: { screen: GowesHubReg },
    GowesHubScreen: { screen: GowesHub },
    MyReportScreen: { screen: MyReport },
    DetailEmergencyScreen: { screen: DetailEmergencyScreen },
    GowesHubChatScreen: { screen: GowesHubChat },
    CommentsDetailEventScreen: { screen: CommentsDetailEventScreen },
    CommentEmergencyScreen: { screen: CommentEmergencyScreen },
    UpdateProfileScreen: { screen: UpdateProfileScreen },
    CommentEmergencyReportScreen: { screen: CommentEmergencyReportScreen }
  }

  return createStackNavigator(routes, {
    initialRouteName: 'MainTabScreen',
    defaultNavigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.tintColor,
      headerBackTitleStyle: '#ffffff',
      headerTintColor: '#02020B'
    }
  })
}

const TakePhotoRoutes = () => {
  const routes = {
    TakePhotoScreen: { screen: TakePhoto },
    TakePhotoPreviewScreen: { screen: TakePhotoPreview }
  }

  return routes
}

export default BeforeAuthRoutes()

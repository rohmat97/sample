/* eslint-disable no-prototype-builtins */
/* eslint camelcase: "off" */
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import relativeTime from 'dayjs/plugin/relativeTime'
import Config from 'react-native-config'

dayjs.locale('id')

export const thousandSeparator = (x) => {
  if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  else return x
}

export const dateFormater = (x) => {
  if (!x) return null

  const temp = x.split('T')[0]
  const date = temp.split('-')
  return date[2] + '/' + date[1] + '/' + date[0]
}

export const dateToShortString = (x) => {
  return dayjs(x).format('DD MMM YYYY')
}

export const dateForNews = (x) => {
  return dayjs(x).format('MMM DD, YYYY')
}

export const dateToLongString = (x) => {
  return dayjs(x).format('DD MMM YYYY HH:mm:ss')
}

export const getSecondsUnixTimeStamp = () => {
  var d = new Date()
  return Math.round(d.getTime() / 1000)
}

export const dateFormat = (x, formatString) => {
  return dayjs(x).format(formatString)
}

export const timeFormat = (x) => {
  return dayjs(x).format('HH:mm')
}

export const getCurrentLocation = (callback) => {
  return navigator.geolocation.getCurrentPosition(
    (position) => {
      callback(position)
    },
    (error) => {
      callback(error)
    },
    {
      enableHighAccuracy: false,
      timeout: 10000
    }
  )
}

export const flatListHeaderInjector = (data, groupBy, helper = null) => {
  let temp
  let selector = null

  data.map((resData) => {
    const fieldGroupBy = helper !== null ? helper(resData[groupBy]) : resData[groupBy]

    if (!temp.length || fieldGroupBy !== selector) {
      selector = fieldGroupBy
      temp.push({
        header: true,
        data: selector
      })
    }
    if (fieldGroupBy === selector) {
      temp.push({
        header: false,
        data: resData
      })
    }
  })

  return temp
}

export const sliceHeaderFromFlatListData = (data) => {
  let arrIdx
  data.map((res, idx) => {
    if (res.header) {
      arrIdx.push(idx)
    }
  })

  return arrIdx
}

export const getEnvironment = (wrapText) => {
  if (Config.ENV === 'production') {
    return wrapText
  } else {
    return `${Config.ENV}-${wrapText}`
  }
}

export const isVersionUpdate = (deviceVersion, firestoreVersion) => {
  const oldSplit = deviceVersion.split('.')
  const newSplit = firestoreVersion.split('.')

  if (~~oldSplit[0] < ~~newSplit[0]) {
    return true
  } else if (~~oldSplit[0] <= ~~newSplit[0] && ~~oldSplit[1] < ~~newSplit[1]) {
    return true
  } else if (~~oldSplit[1] <= ~~newSplit[1] && ~~oldSplit[2] < ~~newSplit[2]) {
    return true
  }

  return false
}

export const isEmptyObject = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

export const isArray = (input) => {
  return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]'
}

export const relativeTimeConvert = (start, end) => {
  dayjs.extend(relativeTime)
  dayjs().from(start)
  return dayjs().to(end, true)
}

export const getFileName = (uri) => {
  const splitter = uri.split('/')
  const fileName = splitter[splitter.length - 1]
  return fileName
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const capitalize = (string) => {
  return string.toLowerCase().replace(/([^a-z])([a-z])(?=[a-z]{0})|^([a-z])/g, function(_, g1, g2, g3) {
    return typeof g1 === 'undefined' ? g3.toUpperCase() : g1 + g2.toUpperCase()
  })
}

export const uppercase = (string) => {
  return string.toUpperCase()
}

export function translateCurrency(money) {
  return `Rp${thousandSeparator(money)}`
}

export const setLimitUsername = (text) => {
  if (text.length && text !== null) {
    if (text.length <= 20) {
      return text
    }
    if (text.length > 20) {
      const splitText = text.split(' ')
      const firstName = splitText[0]
      if (firstName <= 20) {
        return firstName
      } else {
        return firstName.substring(0, 20)
      }
    }
  }

  return null
}

export const getNextDate = (dayOfTheWeek) => {
  const now = dayjs().day()
  let nextDay = 0
  const specialDate1 = dayjs('2019-05-27')
  const specialDate2 = dayjs('2019-06-09')
  const nowFulldate = dayjs()

  if (
    nowFulldate.format('YYYY-MM-DD') === specialDate1.format('YYYY-MM-DD') ||
    nowFulldate.format('YYYY-MM-DD') === specialDate2.format('YYYY-MM-DD') ||
    (nowFulldate.isAfter(specialDate1) && nowFulldate.isBefore(specialDate2))
  )
    return dayjs('2019-06-11').format('DD MMMM YYYY')
  else if (now >= dayOfTheWeek) {
    nextDay = 7 - now + dayOfTheWeek
  } else {
    nextDay = dayOfTheWeek - now
  }
  return dayjs()
    .add(nextDay, 'day')
    .format('DD MMMM YYYY')
}

export const getDayName = (dayOfTheWeek) => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  if (dayOfTheWeek <= 6) return days[dayOfTheWeek]
  else return null
}

export const getScreenName = (code) => {
  switch (code) {
    case 'MAPS':
      return { screen: 'CctvScreen' }
    case 'CCTV PROVINSI':
      return { screen: 'CctvScreen' }
    default:
      return { screen: '' }
  }
}

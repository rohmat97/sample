import { BASE_IMAGE } from '../Config/ApiConfig'
import Api from '../Services/Api'
import { FlashMessage } from '../Presentational'

export const getImage = (url) => {
  return BASE_IMAGE + url
}

export const isSuccess = (response) => {
  return response.status.toLowerCase() === 'success'
}

export const isFailure = (response) => {
  return response.status.toLowerCase() === 'failed'
}

export const getApiMessage = (response) => {
  if (response) {
    if (response.hasOwnProperty('error')) {
      if (response.error) return response.error
      return ''
    } else {
      return ''
    }
  }
  return null
}

export const getApiData = (response) => {
  return response ? response.result : null
}

export const getApiCode = (response) => {
  return response.status
}

export const responseWrapper = (response) => {
  const { data, problem, status } = response
  let callback = null

  if (status >= 400) {
    const responseData = getApiData(data)
    if (responseData && responseData.message) {
      FlashMessage.show(getApiData(data).message)
    }
    callback = { FAILURE: true }
  }
  if (data) {
    if (status === 200) {
      callback = { SUCCESS: true }
    } else {
      callback = { FAILURE: true }
    }
  }
  if (problem === 'NETWORK_ERROR' || problem === 'TIMEOUT_ERROR') {
    FlashMessage.show('Periksa kembali koneksi internet Anda')
    callback = { NETWORK_ERROR: true }
  }

  return Object.assign(callback, {
    DATA: getApiData(data),
    MESSAGE: getApiMessage(data),
    CODE: getApiCode(response)
  })
}

export const headerJSON = (obj) => {
  Api.create().typeJSON()
  return obj
}

export const headerFormData = (obj) => {
  Api.create().typeFormData()
  return obj
}

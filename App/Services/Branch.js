/* eslint node/no-deprecated-api: off  */
import branch from 'react-native-branch'
import qs from 'querystringify'
import { Base64 } from 'js-base64'
const urlHelper = require('url')

export async function subscribe(dispatch) {
  await branch.subscribe(({ error, params }) => {
    if (error) {
      return null
    }

    handleLink(params, dispatch)
  })
}

function urlParser(urlData) {
  let params = null
  let action = null

  if (urlData && typeof urlData !== 'undefined') {
    const url = urlHelper.parse(urlData)
    const { query, pathname } = url

    if (query) {
      params = qs.parse(query)
    }

    if (pathname) {
      const name = pathname.split('/')
      action = name[1]
    }
  }

  return {
    params,
    action
  }
}

function checkAction(link) {
  if (link['+clicked_branch_link'] === true || typeof link['+clicked_branch_link'] !== 'undefined') {
    if (typeof link.action !== 'undefined') {
      return link.action
    }
    if (typeof urlParser(link['~referring_link']).action !== 'undefined') {
      return urlParser(link['~referring_link']).action
    }
    if (typeof urlParser(link['+non_branch_link']).action !== 'undefined') {
      return urlParser(link['+non_branch_link']).action
    }

    return null
  }

  return null
}

function checkParams(link, param) {
  if (link['+clicked_branch_link'] === true || typeof link['+clicked_branch_link'] !== 'undefined') {
    if (typeof link[param] !== 'undefined') {
      return link[param]
    }
    if (typeof urlParser(link['~referring_link']).params[param] !== 'undefined') {
      return urlParser(link['~referring_link']).params[param]
    }
    if (typeof urlParser(link['+non_branch_link']).params[param] !== 'undefined') {
      return urlParser(link['+non_branch_link']).params[param]
    }

    return null
  }

  return null
}

export function listenInstallAndFirstOpen() {
  branch.getLatestReferringParams(true)
}

export function logout() {
  branch.logout()
}

function handleLink(params, dispatch) {
  if (params && typeof params !== 'undefined') {
    if (checkAction(params)) {
      const action = checkAction(params)

      if (action === 'event-report') {
        const token = checkParams(params, 'Id')
        const decodeToken = Base64.decode(token)
        dispatch({
          type: 'ALL_EVENT_REPORT_SHARE',
          Id: decodeToken
        })
      }

      if (action === 'verification') {
        const token = checkParams(params, 'token')
        dispatch({
          type: 'EMAIL_VERIFICATION_REQUEST',
          token: token
        })
      }
    }
  }
}

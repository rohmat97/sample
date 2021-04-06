import { NavigationActions, StackActions } from 'react-navigation'

export function navigate(routeName, params = {}) {
  return NavigationActions.navigate({
    routeName,
    params
  })
}

export function reset(routeName, params = {}) {
  return StackActions.reset({
    index: 0,
    routeName: routeName,
    actions: [NavigationActions.navigate({ routeName: routeName, params: params })]
  })
}

export function navigateBack() {
  return NavigationActions.back()
}

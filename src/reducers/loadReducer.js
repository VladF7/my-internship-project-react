const LOADING = 'LOADING'
const LOADED = 'LOADED'

const defaultState = {
  isLoading: true
}

export const loadReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }
    case LOADED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export const actionLoading = () => ({ type: LOADING })
export const actionLoaded = () => ({ type: LOADED })

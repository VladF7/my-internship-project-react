const LOADING = 'LOADING'
const LOADED = 'LOADED'

const defaultState = {
    isLoading: true,
}

export default function loadReducer (state = defaultState, action){
    switch (action.type){
        case LOADING:
            return{
                ...state,
                isLoading: true
            }
        case LOADED:
            return{
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export const actionLoading = user => ({type: LOADING})
export const actionLoaded = () => ({type: LOADED})
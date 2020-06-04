import { createStore } from 'redux'

const storeActions = {
    'Buiding.add': (state, action) => {
        return {
            ...state,
        }
    },
}

const initialStore = {
    selected: null,
    buildings: window.localStorage.getItem('buildings') || {},
    settings: window.localStorage.getItem('settings') || {},
}

export default createStore(
    (state, action) => {
        return action && storeActions[action.type] ?
            storeActions[action.type](state, action) :
            state
    },
    initialStore,
    typeof devToolsExtension === 'function' ? devToolsExtension() : undefined
)

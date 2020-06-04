import { createStore } from 'redux'
import Storage from './storage'
import throttle from 'lodash/throttle'

const storeActions = {
    'Building.add': (state, action) => {
        return {
            ...state,
            buildings: state.buildings.concat([action.building]),
        }
    },
    'Building.select': (state, action) => {
        return {
            ...state,
            selected: action.building,
        }
    },
}

const storage = new Storage()
const initialStore = {
    selected: null,
    buildings: storage.load('buildings') || [],
    settings: storage.load('settings') || [],
}

const store = createStore(
    (state, action) => {
        return action && storeActions[action.type] ?
            storeActions[action.type](state, action) :
            state
    },
    initialStore,
    typeof devToolsExtension === 'function' ? devToolsExtension() : undefined
)

store.subscribe(throttle(() => {
    storage.save('buildings', store.getState().buildings)
    storage.save('settings', store.getState().settings)
}, 1000))

export default store

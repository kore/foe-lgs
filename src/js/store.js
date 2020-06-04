import { createStore } from 'redux'
import Storage from './storage'
import throttle from 'lodash/throttle'

const storeActions = {
    'Buiding.add': (state, action) => {
        return {
            ...state,
        }
    },
}

const storage = new Storage()
const initialStore = {
    selected: null,
    buildings: storage.load('buildings') || {},
    settings: storage.load('settings') || {},
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
    console.log('Store to storage')
    storage.save('buildings', store.getState.buildings)
    storage.save('settings', store.getState.settings)
}, 1000))

export default store

import { createStore } from 'redux'
import Storage from './storage'
import throttle from 'lodash/throttle'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'

const storeActions = {
    'Building.add': (state, action) => {
        return {
            ...state,
            buildings: state.buildings.concat([action.building]),
        }
    },
    'Building.update': (state, action) => {
        const buildingIndex = findIndex(state.buildings, { id: action.id })
        const building = {
            ...state.buildings[buildingIndex],
            level: action.level,
            fps: action.fps,
        }
        let buildings = [...state.buildings]
        buildings[buildingIndex] = building

        return {
            ...state,
            buildings,
        }
    },
    'Building.remove': (state, action) => {
        return {
            ...state,
            buildings: filter(state.buildings, (building) => {
                return building.id !== action.building
            }),
        }
    },
    'Building.select': (state, action) => {
        return {
            ...state,
            selected: action.building,
        }
    },
    'Settings.set': (state, action) => {
        return {
            ...state,
            settings: {
                ...state.settings,
                [action.key]: action.value,
            }
        }
    },
}

const storage = new Storage()
const initialStore = {
    selected: storage.load('selected') || null,
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
    storage.save('selected', store.getState().selected)
    storage.save('buildings', store.getState().buildings)
    storage.save('settings', store.getState().settings)
}, 1000))

export default store

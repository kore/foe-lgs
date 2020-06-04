import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'react-redux'
import find from 'lodash/find'

import known from './data/buildings'

const Overview = ({ selected, buildings, addBuidling, removeBuilding, selectBuidling }) => {
    const [value, setValue] = useState()

    return <div>
        <h1>Legendäre Gebäude</h1>
        <div className="grid grid-cols-3 sm:grid-cols-2 m:grid-cols-3 gap-4">
            {buildings.map((building) => {
                let buildingData = find(known, { id: building.id })
                return <div
                    key={building.id}
                    className="card grid grid-rows-1">
                    <h3>{buildingData.name}</h3>
                    <h4 className="text-sm font-hairline">Level {building.level}</h4>
                    <div className="flex justify-around mt-4">
                        <button
                            onClick={() => { removeBuilding(building.id)} }>
                            🚮
                        </button>
                        <button
                            className="button--primary"
                            onClick={() => { selectBuidling(building.id)} }>
                            Select
                        </button>
                    </div>
                </div>
            })}
        </div>
        <div className="mt-4 flex justify-around">
            <select
                value={value}
                onChange={(event) => {
                    setValue(event.currentTarget.value)
                }}>
                <option value="">Please Select</option>
            {known.map((building) => {
                if (find(buildings, { id: building.id })) {
                    return null
                }

                return <option key={building.id} value={building.id}>{building.name}</option>
            })}
            </select>
            <button
                disabled={!value}
                onClick={() => {
                    setValue(null)
                    addBuidling(value)
                }}>
                Add
            </button>
        </div>
    </div>
}

export default connect(
    ({ selected, buildings }, props) => {
        return {
            selected,
            buildings,
            ...props,
        }
    },
    (dispatch) => {
        return {
            addBuidling: (building) => {
                dispatch({
                    type: 'Building.add',
                    building: {
                        id: building,
                        level: 1,
                        fps: 0,
                    },
                })
            },
            removeBuilding: (buildingId) => {
                dispatch({
                    type: 'Building.remove',
                    building: buildingId,
                })
            },
            selectBuidling: (buildingId) => {
                dispatch({
                    type: 'Building.select',
                    building: buildingId,
                })
            },
        }
    }
)(Overview)

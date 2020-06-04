import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'react-redux'
import find from 'lodash/find'

import known from './data/buildings'

const Overview = ({ selected, buildings, addBuidling }) => {
    const [value, setValue] = useState()

    console.log(buildings)

    return <div>
        <h1>Legendäre Gebäude</h1>
        <div className="container grid grid-cols-3 sm:grid-cols-4">
            {buildings.map((building) => {
                let buildingData = find(known, { id: building.id })
                return <div key={building.id}>
                    <h3>{buildingData.name}</h3>
                    <h4>Level {building.level}</h4>
                </div>
            })}
        </div>
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
            selectBuidling: (buildingId) => {
                dispatch({
                    type: 'Building.select',
                    building: buildingId,
                })
            },
        }
    }
)(Overview)

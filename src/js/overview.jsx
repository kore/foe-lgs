import { h, render } from 'preact'
import { connect } from 'react-redux'

import known from './data/buildings'

const Overview = ({ selected, buildings }) => {
    console.log(selected, buildings)
    return <div>
        <h1>Legendäre Gebäude</h1>
        <select>
        {known.map((building) => {
            return <option key={building.name}>{building.name}</option>
        })}
        </select>
    </div>
}

export default connect(
    ({ selected, buildings }) => {
        return {
            selected,
            buildings
        }
    }
)(Overview)

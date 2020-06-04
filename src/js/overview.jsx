import { h, render } from 'preact'
import { connect } from 'react-redux'

import buildings from './data/buildings'

const Overview = ({ selected, buildings }) => {
    console.log(selected, buildings)
    return <div>
        <h1>Legendäre Gebäude</h1>
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

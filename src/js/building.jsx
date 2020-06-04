import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'react-redux'
import find from 'lodash/find'

import known from './data/buildings'

const Building = ({ building, data }) => {
    if (!building) {
        return null
    }
    
    return <div>
        <h1>{data.name}</h1>
    </div>
}

export default connect(
    ({ selected, buildings }, props) => {
        return {
            building: find(buildings, { id: selected }),
            data: find(known, { id: selected }),
            ...props,
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Building)

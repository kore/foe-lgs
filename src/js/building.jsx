import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'react-redux'
import find from 'lodash/find'

import known from './data/buildings'
import Input from './settings/input'

const Building = ({ building, data, percent, updateBuilding }) => {
    if (!building || !data) {
        return null
    }

    let sum = 0
    let lastShare = 0
    
    return <div>
        <h1>{data.name}</h1>
        <Input
            key={building.id}
            name="Level"
            initialValue={"" + building.level}
            type="number"
            update={(value) => {
                updateBuilding({
                    id: building.id,
                    fps: 0,
                    level: +value,
                })
            }} />
        <Input
            key={building.id}
            name="Invested FPs"
            initialValue={"" + building.fps}
            type="number"
            update={(value) => {
                updateBuilding({
                    id: building.id,
                    fps: +value,
                    level: building.level,
                })
            }} />
        <h2>Ranks</h2>
        {data.levels[building.level] && <table className="w-full">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Required</th>
                    <th>To Pay</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {data.levels[building.level].ranks.map((rank) => {
                let invest = Math.ceil(rank.fp * (1 + (percent / 100)))
                let ownShare = Math.max(
                    lastShare,
                    data.levels[building.level].required - sum - 2 * invest
                )

                lastShare = ownShare
                sum += invest

                return <tr key={rank.rank}>
                    <td>{rank.rank}</td>
                    <td className="text-right">
                        {Math.max(0, ownShare)}
                        {ownShare < 0 ? <span className="text-red-500"> ({ownShare})</span> : ''}
                        {ownShare > building.fps ? <span className="text-sm text-gray-500"> (+{ownShare - building.fps})</span> : ''}
                    </td>
                    <td className="text-right">
                        {invest}
                        <span className="text-sm text-gray-500"> ({rank.fp})</span>
                    </td>
                    <td className="text-right">
                        <button
                            className="p-1"
                            onClick={() => {
                                updateBuilding({
                                    id: building.id,
                                    fps: Math.max(building.fps, ownShare),
                                    level: building.level,
                                })
                            }}>
                            ⏫
                        </button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>}
    </div>
}

export default connect(
    ({ selected, buildings, settings }, props) => {
        return {
            building: find(buildings, { id: selected }),
            data: find(known, { id: selected }),
            percent: settings.percent || 90,
            ...props,
        }
    },
    (dispatch) => {
        return {
            updateBuilding: (building) => {
                dispatch({
                    type: 'Building.update',
                    ...building,
                })
            }
        }
    }
)(Building)

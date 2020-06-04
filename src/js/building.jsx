import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'react-redux'
import find from 'lodash/find'

import known from './data/buildings'
import Input from './settings/input'
import Checkbox from './settings/checkbox'

const Building = ({ building, data, name, percent, updateBuilding }) => {
    let [ include = null, setInclude] = useState()
    if (!building || !data) {
        return null
    }

    let sum = 0
    let lastShare = 0

    if (!include && data.levels[building.level]) {
        let initialInclude = {}
        data.levels[building.level].ranks.map((rank) => {
            let invest = Math.ceil(rank.fp * (1 + (percent / 100)))
            let ownShare = Math.max(
                lastShare,
                data.levels[building.level].required - sum - 2 * invest
            )
            lastShare = ownShare
            sum += invest

            initialInclude[rank.rank] = ownShare === building.fps
        })
        setInclude(initialInclude)
    }

    let investString = name + ' ' + data.name
 
    sum = lastShare = 0
    return <div>
        <h1>{data.name}</h1>
        <Input
            key={building.id}
            name="Level"
            initialValue={"" + building.level}
            type="number"
            update={(value) => {
                setInclude(null)
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
                setInclude(null)
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

                if (include && include[rank.rank]) {
                    investString += ' P' + rank.rank + ' (' + invest + ')'
                }

                return <tr key={rank.rank}>
                    <td>
                        {include ?
                            <Checkbox
                                value={include[rank.rank]}
                                name={rank.rank}
                                update={(value) => {
                                    setInclude({
                                        ...include,
                                        [rank.rank]: value,
                                    })
                                }}/> :
                            rank.rank
                        }
                    </td>
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
                                setInclude(null)
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
        <Input name="Announcement" initialValue={investString} update={() => {}} />
    </div>
}

export default connect(
    ({ selected, buildings, settings }, props) => {
        return {
            building: find(buildings, { id: selected }),
            data: find(known, { id: selected }),
            name: settings.name || 'Player',
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

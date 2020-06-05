import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'react-redux'
import find from 'lodash/find'

import known from './data/buildings'
import Input from './settings/input'
import Checkbox from './settings/checkbox'

const calculateRankRequirements = (required, ranks, percent) => {
    let sum = 0
    let lastShare = -required

    let calculatedRanks = ranks.map((rank) => {
        let invest = Math.ceil(rank.fp * (1 + (percent / 100)))

        let ownShare = Math.max(
            lastShare,
            required - sum - 2 * invest
        )

        lastShare = ownShare
        sum += invest

        return {
            ...rank,
            invest,
            ownShare,
        }
    })

    return calculatedRanks
}

const Building = ({ building, data, name, percent, updateBuilding }) => {
    let [ include = null, setInclude] = useState()
    if (!building || !data) {
        return null
    }

    let ranks = null
    if (data.levels[building.level]) {
        ranks = calculateRankRequirements(
            data.levels[building.level].required,
            data.levels[building.level].ranks,
            percent
        )
    }

    if (!include && ranks) {
        let initialInclude = {}
        ranks.map((rank) => {
            initialInclude[rank.rank] = Math.max(0, rank.ownShare) === building.fps
        })
        setInclude(initialInclude)
    }

    let investString = 'No level information available'
    if (ranks) {
        investString = name + ' ' + data.name
        for (let i = ranks.length - 1; i >= 0 ; --i) {
            let rank = ranks[i]
            if (include && include[rank.rank]) {
                investString += ' P' + rank.rank + ' (' + rank.invest + (rank.ownShare < building.fps ? ' ⚠' : '') + ')'
            }
        }
    }
 
    return <div>
        <h1>{data.name}</h1>
        <div className="mt-4 flex justify-around items-end">
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
            <button
                className="px-4 py-2 ml-2 h-10"
                onClick={() => {
                    setInclude(null)
                    updateBuilding({
                        id: building.id,
                        fps: 0,
                        level: building.level + 1,
                    })
                }}>
                +
            </button>
        </div>
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
        {ranks && <table className="w-full">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Required</th>
                    <th>To Pay</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {ranks.map((rank) => {
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
                        {Math.max(0, rank.ownShare)}
                        {rank.ownShare < 0 ? <span className="text-red-500"> ⚠</span> : ''}
                        {rank.ownShare > building.fps ? <span className="text-sm text-gray-500"> (+{rank.ownShare - building.fps})</span> : ''}
                    </td>
                    <td className="text-right">
                        {rank.invest}
                        <span className="text-sm text-gray-500"> ({rank.fp})</span>
                    </td>
                    <td className="text-right">
                        <button
                            className="p-1"
                            onClick={() => {
                                setInclude(null)
                                updateBuilding({
                                    id: building.id,
                                    fps: Math.max(building.fps, rank.ownShare),
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
        <div className="mt-4 flex justify-around items-end">
            <div className="flex-grow">
                <span className="input-adornment">Announcement</span>
                <input id='announcement' value={investString} />
            </div>
            <button
                title="Copy to clipboard"
                className="px-4 py-2 ml-2 h-10"
                onClick={(event) => {
                    let inputField = document.getElementById("announcement")
                    console.log(inputField)

                    inputField.select()
                    inputField.setSelectionRange(0, 99999)

                    document.execCommand("copy")
                }}>
                📋
            </button>
        </div>
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

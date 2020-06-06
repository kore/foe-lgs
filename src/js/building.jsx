import { h } from 'preact'
import { useState, useEffect, useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'
import find from 'lodash-es/find'

import Input from './settings/input'
import Checkbox from './settings/checkbox'

const calculateRankRequirements = (required, ranks, percent) => {
    let sum = 0
    let lastShare = -required

    const calculatedRanks = ranks.map((rank) => {
        const invest = Math.ceil(rank.fp * (1 + (percent / 100)))

        const ownShare = Math.max(
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

const Building = ({ building, name, percent, updateBuilding }) => {
    const [include = null, setInclude] = useState()
    const [data = null, setData] = useState()
    const { t } = useContext(TranslateContext)

    if (!building) {
        return null
    }

    useEffect(() => {
        fetch('/assets/building.' + building.id + '.json')
            .then((response) => {
                return response.json()
            }).then((data) => {
                setData(data)
            })
    }, [building])

    if (!data) {
        return null
    }

    let ranks = null
    let fullOwnInvest = 1
    if (data.levels[building.level]) {
        ranks = calculateRankRequirements(
            data.levels[building.level].required,
            data.levels[building.level].ranks,
            percent
        )
        fullOwnInvest = data.levels[building.level].required -
            ranks.map((rank) => {
                return rank.invest
            }).reduce((a, c) => {
                return a + c
            })
    }

    if (!include && ranks) {
        const initialInclude = {}
        ranks.map((rank) => {
            initialInclude[rank.rank] = Math.max(0, rank.ownShare) === building.fps
        })
        setInclude(initialInclude)
    }

    let investString = t('No level information available')
    if (ranks) {
        investString = `${name} ${t(data.name)}`
        for (let i = ranks.length - 1; i >= 0; --i) {
            const rank = ranks[i]
            if (include && include[rank.rank]) {
                investString += ` P${rank.rank} (${rank.invest}${rank.ownShare < building.fps ? ' ⚠' : ''})`
            }
        }
    }

    const investPercentage = (building.fps / fullOwnInvest * 100).toFixed(0)
    return <div>
        <h1>{t(data.name)}</h1>
        <div className="mt-4 flex justify-around items-end">
            <Input
                key={building.id}
                name={t("Level")}
                initialValue={`${building.level}`}
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
            name={t("Invested FPs")}
            initialValue={`${building.fps}`}
            type="number"
            update={(value) => {
                setInclude(null)
                updateBuilding({
                    id: building.id,
                    fps: +value,
                    level: building.level,
                })
            }} />
        <h2 className="mt-4">{t("Progress")}</h2>
        <div className="shadow w-full bg-grey-light flex">
            <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white" style={{ width: investPercentage + '%' }}>
                {investPercentage > 50 ? building.fps + t(" of ") + fullOwnInvest + ' (' + data.levels[building.level].required + ')' : ''}
            </div>
            {investPercentage <= 50 ?
                <div className="text-xs leading-none py-1 text-right" style={{ width: (100 - investPercentage) + '%' }}>
                    {building.fps + t(" of ") + fullOwnInvest + ' (' + data.levels[building.level].required + ')'}
                </div> : ''}
        </div>
        <h2 className="mt-4">{t("Ranks")}</h2>
        {ranks && <table className="w-full">
            <thead>
                <tr>
                    <th>{t("Rank")}</th>
                    <th>{t("Required")}</th>
                    <th>{t("To Pay")}</th>
                    <th />
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
                                }} /> :
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
                <span className="input-adornment">{t("Announcement")}</span>
                <input id='announcement' value={investString} />
            </div>
            <button
                title="Copy to clipboard"
                className="px-4 py-2 ml-2 h-10"
                onClick={() => {
                    const inputField = document.getElementById("announcement")

                    inputField.select()
                    inputField.setSelectionRange(0, 99999)

                    document.execCommand("copy")

                    inputField.blur()
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
            },
        }
    }
)(Building)

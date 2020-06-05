import { h } from 'preact'
import { useState, useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'
import find from 'lodash/find'

import known from './data/buildings'

const Overview = ({ selected, buildings, addBuidling, removeBuilding, selectBuidling }) => {
    const [value, setValue] = useState()
    const { t } = useContext(TranslateContext)

    buildings.sort((a, b) => {
        return t(find(known, { id: a.id }).name).localeCompare(t(find(known, { id: b.id }).name))
    })

    known.sort((a, b) => {
        return t(a.name).localeCompare(t(b.name))
    })

    return <div>
        <a href="https://github.com/kore/foe-lgs" className="beta">beta</a>
        <h1>{t('Great Buildings')}</h1>
        <div className="grid grid-cols-3 sm:grid-cols-2 m:grid-cols-3 gap-4">
            {buildings.map((building) => {
                const buildingData = find(known, { id: building.id })
                return <div
                    key={building.id}
                    className={`card grid grid-rows-1${building.id === selected ? ' card--selected' : ''}`}>
                    <h3>{t(buildingData.name)}</h3>
                    <h4 className="text-sm font-hairline">Level {building.level}</h4>
                    <div className="flex justify-around mt-4">
                        <button
                            onClick={() => { removeBuilding(building.id) } }>
                            🚮
                        </button>
                        <button
                            className="button--primary"
                            onClick={() => { selectBuidling(building.id) } }>
                            {t("Select")}
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
                <option value="">{t("Please Select")}</option>
                {known.map((building) => {
                if (find(buildings, { id: building.id })) {
                    return null
                }

                return <option key={building.id} value={building.id}>{t(building.name)}</option>
            })}
            </select>
            <button
                className="ml-2"
                disabled={!value}
                onClick={() => {
                    setValue(null)
                    addBuidling(value)
                }}>
                {t("Add")}
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

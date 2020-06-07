import { h } from 'preact'
import { useState, useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'
import find from 'lodash-es/find'

import Building from './overview/building'
import Select from './settings/select'
import known from './data/buildings.json'

const Overview = ({ selected, buildings, addBuidling }) => {
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
        <h2>{t('Great Buildings')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-2 m:grid-cols-3 gap-4">
            {buildings.map((building) => {
                return <Building
                    building={building}
                    data={find(known, { id: building.id })}
                    selected={building.id === selected}
                    key={building.id}
                />
            })}
        </div>
        <div className="mt-4 flex justify-around items-end">
            <Select
                name={t("Great Buildings")}
                value={value}
                values={[
                    { key: null, value: t('Please Select') },
                ].concat(known.map((building) => {
                    return { key: building.id, value: t(building.name) }
                }))}
                update={(value) => {
                    setValue(value)
                }} />
            <button
                className="px-4 py-2 ml-2 h-10"
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
        }
    }
)(Overview)

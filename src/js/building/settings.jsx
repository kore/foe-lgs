import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'

import Input from '../settings/input'

const Settings = ({ building, setInclude, updateBuilding }) => {
    const { t } = useContext(TranslateContext)

    if (!building) {
        return null
    }

    return <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-around items-end">
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
    </div>
}

export default connect(
    ({}, props) => {
        return {
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
)(Settings)

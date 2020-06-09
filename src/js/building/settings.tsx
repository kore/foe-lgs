import { h, FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'

import Input from '../settings/input'

import { Building, SetInclude, UpdateBuilding } from '../types'

export interface Props {
    building: Building,
    setInclude: SetInclude,
    updateBuilding: UpdateBuilding,
}

const Settings: FunctionalComponent<Props> = ({ building, setInclude, updateBuilding }: Props) => {
    const { t } = useContext(TranslateContext)

    if (!building) {
        return null
    }

    return <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-around items-end">
            <Input
                key={JSON.stringify(building)}
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
            key={JSON.stringify(building)}
            name={t("Invested FPs")}
            initialValue={`${building.fps}`}
            type="number"
            update={((value) => {
                setInclude(null)
                updateBuilding({
                    id: building.id,
                    fps: +value,
                })
            }).bind(building)} />
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

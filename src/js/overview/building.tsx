import { h, FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'

import { Building, SelectBuidling } from '../types'

export interface Props {
    building: Building,
    data: Building,
    selected: boolean,
    selectBuidling: SelectBuidling,
}

const BuildingCard: FunctionalComponent<Props> = ({ building, data, selected = false, selectBuidling }: Props) => {
    const { t } = useContext(TranslateContext)

    return <div className={`card grid p-1 grid-rows-1${selected ? ' card--selected' : ''}`}>
        <button
            className="appearance-none"
            onClick={() => { selectBuidling(building.id) } }>
            <h3 className="text-base">{t(data.name)}</h3>
            <h4 className="text-sm font-normal">Level {building.level - 1} → <strong>{building.level}</strong></h4>
        </button>
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
            selectBuidling: (buildingId) => {
                dispatch({
                    type: 'Building.select',
                    building: buildingId,
                })
            },
        }
    },
)(BuildingCard)

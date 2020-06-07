import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'

const Building = ({ building, data, selected = false, removeBuilding, selectBuidling }) => {
    const { t } = useContext(TranslateContext)

    return <div className={`card grid grid-rows-1${building.id === selected ? ' card--selected' : ''}`}>
        <button
            className="appearance-none"
            onClick={() => { selectBuidling(building.id) } }>
            <h3>{t(data.name)}</h3>
            <h4 className="text-sm font-hairline">Level {building.level}</h4>
        </button>
        <div className="flex justify-end mt-4">
            <button
                onClick={() => { removeBuilding(building.id) } }>
                🚮
            </button>
        </div>
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
)(Building)

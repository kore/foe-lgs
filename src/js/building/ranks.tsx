import { h, FunctionalComponent, Fragment } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'

import Checkbox from '../settings/checkbox'

import { Building, Rank, SetInclude, UpdateBuilding } from '../types'

export interface Props {
    building: Building,
    ranks: Rank[],
    include: boolean[],
    setInclude: SetInclude,
    updateBuilding: UpdateBuilding,
}

const Ranks: FunctionalComponent<Props> = ({ building, ranks, include, setInclude, updateBuilding }: Props) => {
    const { t } = useContext(TranslateContext)

    if (!ranks) {
        return null
    }

    return <Fragment>
        <h3 className="mt-4">{t("Ranks")}</h3>
        <table className="w-full">
            <thead>
                <tr>
                    <th>{t("Rank")}</th>
                    <th className="text-right">{t("Required")}</th>
                    <th className="text-right">{t("To Pay")}</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {ranks.map((rank) => {
                    return <tr key={rank.rank} className={!rank.fp ? 'text-gray-500' : ''}>
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
                            {rank.ownShare > building.fps ? <span className="text-sm text-gray-500">(+{rank.ownShare - building.fps}) </span> : ''}
                            {Math.max(0, rank.ownShare)}
                            {rank.ownShare < 0 ? <span className="text-red-500"> ⚠</span> : ''}
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
                                    fps: Math.max(0, rank.ownShare),
                                    level: building.level,
                                })
                            }}>
                                ⏫
                            </button>
                        </td>
                    </tr>
            })}
            </tbody>
        </table>
    </Fragment>
}

export default connect(
    ({}, props) => {
        return {
            ...props,
        }
    },
    (dispatch) => {
        return {
            updateBuilding: (building: Building) => {
                dispatch({
                    type: 'Building.update',
                    ...building,
                })
            },
        }
    },
)(Ranks)

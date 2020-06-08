import { h, FunctionalComponent, Fragment } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'

import { Building, Rank } from '../types'

export interface Props {
    building: Building,
    required: number,
    ranks: Rank[],
}

export const Progress: FunctionalComponent<Props> = ({ building, required, ranks }: Props) => {
    const { t } = useContext(TranslateContext)

    const fullOwnInvest = required -
        ranks.map((rank: Rank) => {
            return rank.invest
        }).reduce((a: number, c: number) => {
            return a + c
        })

    const investPercentage: number = +(building.fps / fullOwnInvest * 100).toFixed(0)
    return <Fragment>
        <h3 className="mt-4">{t("Progress")}</h3>
        <div className="shadow w-full bg-grey-light flex">
            <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white" style={{ width: `${investPercentage}%` }}>
                {investPercentage > 50 ? `${building.fps + t(" of ") + fullOwnInvest} (${required})` : ''}
            </div>
            {investPercentage <= 50 ?
                <div className="text-xs leading-none py-1 text-right" style={{ width: `${100 - investPercentage}%` }}>
                    {`${building.fps + t(" of ") + fullOwnInvest} (${required})`}
                </div> : ''}
        </div>
    </Fragment>
}

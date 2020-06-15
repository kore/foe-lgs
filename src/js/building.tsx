import { h, FunctionalComponent } from 'preact'
import { useState, useEffect, useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'
import find from 'lodash-es/find'

import Settings from './building/settings'
import { Progress } from './building/progress'
import Ranks from './building/ranks'
import Announcement from './building/announcement'

import { Building, Rank } from './types'

export interface Props {
    building: Building,
    percent: number,
}

const calculateRankRequirements = (required: number, ranks: Rank[], percent: number): Rank[] => {
    let sum = 0
    let lastShare = -required

    const calculatedRanks = ranks.map((rank) => {
        const invest = Math.ceil(rank.fp * (1 + (percent / 100)))

        const ownShare = Math.max(
            lastShare,
            required - sum - 2 * invest,
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

const BuildingOverview: FunctionalComponent<Props> = ({ building, percent }: Props) => {
    const [include, setInclude] = useState(null)
    const [ranks, setRanks] = useState(null)
    const [data, setData] = useState(null)
    const { t } = useContext(TranslateContext)

    useEffect(() => {
        if (!building) {
            return null
        }

        fetch(`/assets/building.${building.id}.json`)
            .then((response) => {
                return response.json()
            }).then((data) => {
                setData(data)
            })
    }, [building])

    useEffect(() => {
        if (!data) {
            return null
        }

        let rankRequirements = null
        if (data.levels[building.level]) {
            rankRequirements = calculateRankRequirements(
                data.levels[building.level].required,
                data.levels[building.level].ranks,
                percent,
            )
        }

        if (rankRequirements) {
            const initialInclude = {}
            rankRequirements.map((rank) => {
                initialInclude[rank.rank] = Math.max(0, rank.ownShare) === building.fps
            })

            setInclude(initialInclude)
        }
        setRanks(rankRequirements)
    }, [building, data, percent])

    if (!building || !data) {
        return null
    }

    return <div>
        <h2>{t(data.name)}</h2>
        <Settings
            building={building}
            setInclude={setInclude}
        />
        {ranks && <Progress
            building={building}
            ranks={ranks}
            required={data.levels[building.level].required}
        />}
        {ranks && <Ranks
            building={building}
            ranks={ranks}
            include={include}
            setInclude={setInclude}
        />}
        {ranks && <Announcement
            building={{ ...data, ...building }}
            ranks={ranks}
            include={include}
        />}
    </div>
}

export default connect(
    ({ selected, buildings, settings }, props) => {
        return {
            building: find(buildings, { id: selected }),
            percent: settings.percent || 90,
            ...props,
        }
    },
)(BuildingOverview)

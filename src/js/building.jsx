import { h } from 'preact'
import { useState, useEffect, useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'
import find from 'lodash-es/find'

import Settings from './building/settings'
import Progress from './building/progress'
import Ranks from './building/ranks'
import Announcement from './building/announcement'

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

const Building = ({ building, percent }) => {
    const [include = null, setInclude] = useState()
    const [data = null, setData] = useState()
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

    if (!building || !data) {
        return null
    }

    let ranks = null
    if (data.levels[building.level]) {
        ranks = calculateRankRequirements(
            data.levels[building.level].required,
            data.levels[building.level].ranks,
            percent
        )
    }

    if (!include && ranks) {
        const initialInclude = {}
        ranks.map((rank) => {
            initialInclude[rank.rank] = Math.max(0, rank.ownShare) === building.fps
        })
        setInclude(initialInclude)
    }

    return <div>
        <h2>{t(data.name)}</h2>
        <Settings
            building={building}
            setInclude={setInclude}
        />
        <Progress
            building={building}
            ranks={ranks}
            required={data.levels[building.level].required}
        />
        <Ranks
            building={building}
            ranks={ranks}
            include={include}
            setInclude={setInclude}
        />
        <Announcement
            building={{ ...data, ...building }}
            ranks={ranks}
            include={include}
        />
    </div>
}

export default connect(
    ({ selected, buildings, settings }, props) => {
        return {
            building: find(buildings, { id: selected }),
            percent: settings.percent || 90,
            ...props,
        }
    }
)(Building)

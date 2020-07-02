import { h, FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'
import { connect } from 'react-redux'

import { Building, Rank } from '../types'

export interface Props {
    name: string,
    building: Building,
    ranks: Rank[],
    include: boolean[],
}

const Announcement: FunctionalComponent<Props> = ({ name, building, ranks, include }: Props) => {
    const { t } = useContext(TranslateContext)

    let investString = t('No level information available')
    if (ranks) {
        investString = `${name} ${t(building.name)}`
        for (let i = ranks.length - 1; i >= 0; --i) {
            const rank = ranks[i]
            if (include && include[rank.rank]) {
                investString += ` P${rank.rank} (${rank.invest})`
            }
        }
    }

    return <div className="mt-4 flex justify-around items-end">
        <div className="flex-grow">
            <span className="input-adornment">{t("Announcement")}</span>
            <input id='announcement' value={investString} />
        </div>
        <button
            title="Copy to clipboard"
            className="px-4 py-2 ml-2 h-10"
            onClick={() => {
                const inputField = document.getElementById("announcement") as HTMLInputElement

                inputField.select()
                inputField.setSelectionRange(0, 99999)

                document.execCommand("copy")

                inputField.blur()
            }}>
            📋
        </button>
    </div>
}

export default connect(
    ({ settings }, props) => {
        return {
            name: settings.name || 'Player',
            ...props,
        }
    },
)(Announcement)

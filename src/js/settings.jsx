import { h } from 'preact'
import { useState, useContext } from 'preact/hooks'
import { connect } from 'react-redux'
import { TranslateContext } from '@denysvuika/preact-translate'

import Input from './settings/input'
import Select from './settings/select'

const Settings = ({ settings, setSetting }) => {
    const [visible, setVisible] = useState()
    const { setLang, t } = useContext(TranslateContext)

    if (!settings.name) {
        setVisible(true)
    }

    if (settings.language) {
        setLang(settings.language)
    }

    return <div>
        <button
            className="float-right"
            onClick={() => {
                setVisible(!visible)
            }}>
            {visible ? '-' : '+'}
        </button>
        <h2>{t("Settings")}</h2>
        <div style={{ display: visible ? 'block' : 'none' }}>
            <Input
                name={t("Name")}
                initialValue={settings.name}
                update={(value) => {
                    setSetting('name', value)
}
                } />
            <Input
                name={t("Advance (%)")}
                initialValue={settings.percent || "90"}
                update={(value) => {
                    setSetting('percent', +value)
}
                } />
            <Select
                name={t("Language")}
                value={settings.language || "de"}
                values={[
                    { key: 'de', value: 'Deutsch' },
                    { key: 'en', value: 'English' },
                ]}
                update={(value) => {
                    setSetting('language', value)
                    setLang(value)
                }} />
        </div>
    </div>
}

export default connect(
    ({ settings }) => {
        return {
            settings,
        }
    },
    (dispatch) => {
        return {
            setSetting: (key, value) => {
                dispatch({
                    type: 'Settings.set',
                    key,
                    value,
                })
            },
        }
    }
)(Settings)

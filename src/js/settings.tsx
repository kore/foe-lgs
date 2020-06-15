import { h, FunctionalComponent } from 'preact'
import { useState, useContext } from 'preact/hooks'
import { connect } from 'react-redux'
import { TranslateContext } from '@denysvuika/preact-translate'

import Input from './settings/input'
import Select from './settings/select'

import { SettingValues, SetSetting } from './types'

export interface Props {
    settings: SettingValues,
    setSetting: SetSetting,
}

const Settings: FunctionalComponent<Props> = ({ settings, setSetting }: Props) => {
    const [visible, setVisible] = useState(false)
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
                update={(value: string) => {
                    setSetting('name', value)
                }} />
            <Input
                name={t("Advance (%)")}
                type="number"
                initialValue={`${settings.percent || 90}`}
                update={(value: string) => {
                    setSetting('percent', +value)
                }} />
            <Select
                name={t("Language")}
                value={settings.language || "de"}
                values={[
                    { key: 'de', value: 'Deutsch' },
                    { key: 'en', value: 'English' },
                ]}
                update={(value: string) => {
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
    },
)(Settings)

import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'react-redux'

import Input from './settings/input'

const Settings = ({ settings, setSetting }) => {
    const [visible, setVisible] = useState()

    if (!settings.name) {
        setVisible(true)
    }

    return <div>
        <button
            className="float-right mt-4"
            onClick={() => {
                setVisible(!visible)
            }}>
            {visible ? '-' : '+'}
        </button>
        <h1>Settings</h1>
        <div style={{ display: visible ? 'block' : 'none' }}>
            <Input
                name="Name"
                initialValue={settings.name}
                update={(value) => {
                    setSetting('name', value)}
                } />
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

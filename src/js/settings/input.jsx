import { h } from 'preact'
import { useState, useRef } from 'preact/hooks'
import debounce from 'lodash/debounce'

const Input = ({ update, name, initialValue, type = 'text', disabled = false }) => {
    const [value = initialValue, setValue] = useState()
    const delayedUpdate = useRef(debounce(update, 500)).current

    return <div className="flex-grow">
        <span className="input-adornment">{name}</span>
        <input
            type={type}
            value={value}
            placeholder={name}
            disabled={disabled}
            onChange={(event) => {
                setValue(event.target.value)
                delayedUpdate(event.target.value)
            }} />
    </div>
}

export default Input

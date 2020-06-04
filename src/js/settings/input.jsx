import { h, render } from 'preact'
import { useState, useRef } from 'preact/hooks'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

const Input = ({ update, name, initialValue }) => {
    const [value = initialValue, setValue] = useState()
    const delayedUpdate = useRef(debounce(update, 500)).current

    return <input
        type="text"
        value={value}
        placeholder={name}
        onChange={(event) => {
            setValue(event.target.value)
            delayedUpdate(event.target.value)
        }} />
}

export default Input

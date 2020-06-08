import { h, FunctionalComponent } from 'preact'
import { useState, useRef } from 'preact/hooks'
import debounce from 'lodash-es/debounce'

import { UpdateFunction } from '../types'

export interface Props {
    update: UpdateFunction<string>,
    name: string,
    initialValue: string,
    type?: string,
    disabled?: boolean,
}

const Input: FunctionalComponent<Props> = ({ update, name, initialValue, type = 'text', disabled = false }: Props) => {
    const [value, setValue] = useState(initialValue)
    const delayedUpdate = useRef(debounce(update, 500)).current
    const id = (`input_${btoa(name)}`).replace(/=/g, '')

    return <div className="flex-grow">
        <label htmlFor={id} className="input-adornment">{name}</label>
        <input
            id={id}
            type={type}
            value={value}
            placeholder={name}
            disabled={disabled}
            onChange={(event) => {
                const target = event.target as HTMLInputElement

                setValue(target.value)
                delayedUpdate(target.value)
            }} />
    </div>
}

export default Input

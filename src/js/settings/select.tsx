import { h, FunctionalComponent } from 'preact'

import { UpdateFunction } from '../types'

export interface Props {
    update: UpdateFunction<string>,
    name: string,
    value: string,
    values: { key: string, value: string}[],
    disabled?: boolean,
}

const Select: FunctionalComponent<Props> = ({ update, name, value, values, disabled = false }: Props) => {
    const id = (`select_${btoa(name)}`).replace(/=/g, '')

    return <div className="flex-grow">
        <label htmlFor={id} className="input-adornment">{name}</label>
        <select
            id={id}
            value={value}
            disabled={disabled}
            onChange={(event) => {
                update(event.currentTarget.value)
            }}>
            {values.map((item) => {
                return <option key={item.key} value={item.key}>{item.value}</option>
            })}
        </select>
    </div>
}

export default Select

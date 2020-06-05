import { h, render, Fragment } from 'preact'

const Select = ({ update, name, value, values, disabled = false }) => {
    return <div className="flex-grow">
        <span className="input-adornment">{name}</span>
        <select
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

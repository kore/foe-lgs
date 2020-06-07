import { h } from 'preact'

const Select = ({ update, name, value, values, disabled = false }) => {
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

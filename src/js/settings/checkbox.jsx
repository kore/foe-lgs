import { h, Fragment } from 'preact'

const Checkbox = ({ update, name = '', value }) => {
    return <Fragment>
        <input
            type="checkbox"
            checked={!!value}
            onChange={(event) => {
                update(!!event.target.checked)
            }} /> {name}
    </Fragment>
}

export default Checkbox

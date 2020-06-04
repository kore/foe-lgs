import { h, render, Fragment } from 'preact'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

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

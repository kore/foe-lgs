import { h, FunctionalComponent, Fragment } from 'preact'

import { UpdateFunction } from '../types'

export interface Props {
    update: UpdateFunction<boolean>,
    name: string,
    value: boolean,
}

const Checkbox: FunctionalComponent<Props> = ({ update, name = '', value }: Props) => {
    return <Fragment>
        <input
            type="checkbox"
            checked={!!value}
            onChange={(event) => {
                const target = event.target as HTMLInputElement
                update(!!target.checked)
            }} /> {name}
    </Fragment>
}

export default Checkbox

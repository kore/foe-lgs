import { render, h } from 'preact'
import { Provider } from 'react-redux'

import store from './store'
import '../scss/app.scss'

import Overview from './overview'
import Settings from './settings'
import Building from './building'

const App = () => {
    return <Provider store={store}>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Overview />
            <Building />
            <Settings />
        </div>
    </Provider>
}

render(<App />, document.getElementById('root'))

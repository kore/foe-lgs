import { render, h } from 'preact'
import { Provider } from 'react-redux'
import { TranslateProvider } from '@denysvuika/preact-translate'

import store from './store'
import '../scss/app.scss'

import Overview from './overview'
import Settings from './settings'
import Building from './building'

import translations from './data/translations'

(function() {
    if('serviceWorker' in navigator) {
        // navigator.serviceWorker.register('/service-worker.js')
    }
})()

const App = () => {
    return <Provider store={store}>
        <TranslateProvider lang="de" translations={translations}>
            <div className="container mx-auto px-2 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Overview />
                <Building />
                <Settings />
            </div>
        </TranslateProvider>
    </Provider>
}

render(<App />, document.getElementById('root'))

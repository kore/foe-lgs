import { render, h } from 'preact'
import { Provider } from 'react-redux'
import { TranslateProvider } from '@denysvuika/preact-translate'

import store from './store'
import '../scss/app.scss'

import Overview from './overview'
import Settings from './settings'
import Building from './building'
import Footer from './footer'

import translations from './data/translations'

(function() {
    if (PRODUCTION && 'serviceWorker' in navigator) { // eslint-disable-line no-undef
        navigator.serviceWorker.register('/service-worker.js')
    }
})()

const App = () => {
    return <Provider store={store}>
        <TranslateProvider lang="de" translations={translations}>
            <h1 className="text-center">FoE Calculator</h1>
            <div className="container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Overview />
                <Building />
                <Settings />
            </div>
            <Footer />
        </TranslateProvider>
    </Provider>
}

render(<App />, document.getElementById('root'))

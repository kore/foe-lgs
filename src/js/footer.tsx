import { h, FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'

const Footer: FunctionalComponent<Props> = () => {
    const { t } = useContext(TranslateContext)

    return <footer>
        <p>
            <a href="https://github.com/kore/foe-lgs">Forge of Empires
                Calculator</a> by <a href="https://kore-nordmann.de">Kore
                    Nordmann</a>
        </p>
        <p>{t('All rights reserved &amp; no guarantee for the data – this is a playground project.')}</p>
        <p>{t('This page needs no data privacy statement: All data is stored in your browser and never leaves your system.')}</p>
    </footer>
}

export default Footer

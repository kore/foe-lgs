const merge = require('webpack-merge')
const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = (config, PRODUCTION, SERVER) => {
    // Add tailwind configuration to SCSS compilation
    for (let rule of config.module.rules) {
        if (rule.use && Array.isArray(rule.use)) {
            for (let loader of rule.use) {
                if (loader.loader && loader.loader.match('postcss-loader') && loader.options) {
                    // @TODO: There is no way to sensibly adapt this plugin
                    // list in a callback, right? So we just overwrite it for
                    // now…
                    loader.options.plugins = () => {
                        return [
                            require('postcss-flexbugs-fixes'),
                            require('tailwindcss')(__dirname + '/tailwind.config.js'),
                            autoprefixer(),
                        ]
                    }
                }
            }
        }
    }

    return config
}

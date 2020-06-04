const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('../paths')

module.exports = (config, PRODUCTION, SERVER) => {
    return merge(config, {
        plugins: [
            new HtmlWebpackPlugin({
                template: paths.appTemplates + '/index.html',
                title: 'FoE: LGs',
                meta: {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    'theme-color': '#4285f4'
                },
            })
        ],
    })
}

const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const paths = require('../paths')

module.exports = (config, PRODUCTION, SERVER) => {
    return merge(config, {
        plugins: [
            new HtmlWebpackPlugin({
                template: paths.appTemplates + '/index.html',
                title: 'FoE Calculator',
                meta: {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    'description': 'Calculator for Forge of Empires Greate Bilding Investments',
                },
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/assets', to: 'assets', }
                ],
            }),
        ],
    })
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const StatsPlugin = require('stats-webpack-plugin')
const merge = require('webpack-merge')

module.exports = (config, PRODUCTION, SERVER) => {
    return merge.smart(
        {
            plugins: [
                // Anlyze bundle size
                new BundleAnalyzerPlugin({
                    reportFilename: '../build/bundleSize.html',
                    analyzerMode: 'static',
                }),

                // Webpack dependency graph and other stats as JSON
                new StatsPlugin('../build/bundleStats.json', {
                    chunkModules: true,
                    exclude: [/node_modules[\\\/]react/],
                }),
            ]
        },
        config,
    )
}

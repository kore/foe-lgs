const merge = require('webpack-merge')

module.exports = (config, PRODUCTION, SERVER) => {
    return merge.smart(
        config,
        {
            resolve: {
                alias: {
                    'react': 'preact/compat',
                    'react-dom': 'preact/compat',
                },
            },
        }
    )
}

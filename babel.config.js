module.exports = function (api) {
    api.cache(true)

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/transform-react-jsx', { 'pragma': 'h' }],
        'lodash'
    ]

    return {
        presets: [
            // modules:false is required to enable webpack chunk splitting
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-react',
        ],
        plugins: plugins,
        env: {
            test: {
                presets: [
                    // modules:false must be removed for test env when using jest
                    '@babel/preset-env',
                    '@babel/preset-react',
                ],
                plugins: plugins,
            }
        }
    }
}

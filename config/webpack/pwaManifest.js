const WebpackPwaManifest = require('webpack-pwa-manifest')
const merge = require('webpack-merge')
const path = require('path')

module.exports = (config, PRODUCTION, SERVER) => {
    return merge.smart(
        {
            plugins: [
                new WebpackPwaManifest({
                    name: 'FoE – Calculator',
                    short_name: 'FoE Calculator',
                    description: 'Calculator for Forge of Empires Greate Bilding Investments',
                    background_color: '#ffffff',
                    crossorigin: 'use-credentials',
                    theme_color: '#2b6cb0',
                    ios: true,
                    inject: true,
                    icons: [
                        {
                            src: path.resolve('src/assets/icon.png'),
                            sizes: [96, 128, 192, 256, 384, 512],
                        },
                        {
                            src: path.resolve('src/assets/icon.png'),
                            size: '1024x1024',
                        },
                        {
                            src: path.resolve('src/assets/icon.png'),
                            size: '1024x1024',
                            purpose: 'maskable',
                        },
                    ],
                }),
            ],
        },
        config,
    )
}

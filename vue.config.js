const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/registration',
    outputDir: 'registration',
    assetsDir: 'static',
    pwa: {
        iconPaths: {
            favicon32: 'logo_square_black.ico',
            favicon16: 'logo_square_black.ico',
            appleTouchIcon: 'logo_square_black.ico',
            maskIcon: 'logo_square_black.ico',
            msTileImage: 'logo_square_black.ico',
        },
    },
});

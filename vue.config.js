const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/registration',
    outputDir: 'index',
    assetsDir: 'static',
});

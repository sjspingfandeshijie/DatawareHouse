const webpack = require("webpack");
module.exports = {
    pluginOptions: new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    }),
    publicPath: './', // 加入这行就可以了
    devServer: {
        open: false,
        port: 8080,
        // 代理
        proxy: {
            '/': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    }
};

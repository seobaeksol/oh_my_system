module.exports = {
    entry: './src/app/react-main.js',

    output: {
        path: __dirname + '/src/public/',
        filename: 'bundle.js'
    },

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
};
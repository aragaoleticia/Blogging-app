const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
          process: require.resolve('process/browser'),
          // Add other core modules here if needed
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
    },
  },
};

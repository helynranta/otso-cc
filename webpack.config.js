module.exports = {
  entry: './client/src/App.jsx',
  output: {
    filename: './client/dist/bundle.js'
  },
  module: {
    loaders: [
      // jsx
      { test: /\.jsx$/, loader: 'babel-loader' },

      // css
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
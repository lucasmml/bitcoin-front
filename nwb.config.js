module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'BitcoinFrontend',
      externals: {
        react: 'React'
      }
    }
  }
}

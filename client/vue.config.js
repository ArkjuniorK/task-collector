module.exports = {
  transpileDependencies: ['vue-clamp', 'resize-detector'],
  pages: {
    index: {
      entry: 'src/main.js', // must be included
      title: 'Room' // web title
    }
  },
  pwa: {
    name: 'Room',
    themeColor: '#f7fafc',
    msTileColor: '#f7fafc',
    backgroundColor: '#f0f0f0',
    appleMobileWebAppCapable: 'yes',
    appMobileWebAppStatusBarStyle: 'white'
  }
}

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  'plugins': [
    ['module-resolver', {
      'root': ['./'],
      'alias': {
        '@scenes': './src/ui/scenes'
        ,
        '@components':
          './src/ui/components'
        ,
        '@lib':
          './src/ui/lib'
        ,
        '@screens':
          './src/screens'
        ,
        '@navigation':
          './src/navigation'
        ,
      },
    }],
  ],
};

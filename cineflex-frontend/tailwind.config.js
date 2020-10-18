// require('dotenv').config();
// const enablePurge = process.env.ENABLE_PURGE || false;
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    // enabled: enablePurge,
    // content: [
    //   './src/**/*.html',
    //   './src/**/*.scss'
    // ]
  },
  theme: {
    extend: {
      colors: {
        primary: '#ff0000'
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    transitionDuration: ['responsive', 'hover', 'focus'],
    textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'group-focus']
  },
  plugins: [],
}

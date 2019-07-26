import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken2,
    secondary: colors.indigo.lighten5,
    accecnt: colors.indigo.accent1,
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  iconfont: 'mdi'
})

// Vue.use(Vuetify, {
//   theme: {
//     primary: colors.indigo.darken2,
//     secondary: colors.indigo.lighten4,
//     accecnt: colors.indigo.accent1
//   }
// })

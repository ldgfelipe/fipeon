import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - FLTools',
    title: 'FLTools',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon1.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/firebase',{
      config: {
        apiKey: "AIzaSyBfajGFXwdIYtIB8pWnTHg_qz_vbC0aVJM",
        authDomain: "fipeon.firebaseapp.com",
        projectId: "fipeon",
        storageBucket: "fipeon.appspot.com",
        messagingSenderId: "70029987665",
        appId: "1:70029987665:web:bb3b00b770b6c6d3070d70",
        measurementId: "G-9ZYLC67S0Q"
      },
      services: {
        auth:{
            persistence: 'local',
            initialize: {
                  onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
                  onAuthStateChangedAction: 'onAuthStateChangedAction',
                  subscribeManually: false
            }

        }, // Just as example. Can be any other service.
        firestore:true,
        storage:true
      }
    }],
     // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
     icon:[{
          "src": "icon.png", 
          "type": "image/png"
        }]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

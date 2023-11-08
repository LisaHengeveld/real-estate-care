// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const realEstateCareLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#00AAA2',
    'primary-darken-1': '#006661',
    'primary-lighten-1': '#cceeec',
    secondary: '#475E6C',
    'secondary-darken-1': '#141B1F',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    defaultTheme: 'realEstateCareLightTheme',
    themes: {
      realEstateCareLightTheme,
    },
  },
})

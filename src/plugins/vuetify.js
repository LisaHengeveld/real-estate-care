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

const realEstateCareDarkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
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

// Retrieve user's theme preference from localStorage
const savedTheme = localStorage.getItem('user-theme-preference') || 'realEstateCareLightTheme';


export default createVuetify({
  theme: {
    defaultTheme: savedTheme,
    themes: {
      realEstateCareLightTheme,
      realEstateCareDarkTheme
    },
  },
})

/** @type {import('tailwindcss').Config} */
module.exports = {
 mode:'jit',
  darkMode : 'class',
  content: [
    "./src/**/*.{html,jsx}","./node_modules/flowbite/**/*.(js,jsx,html)" ,'./public/index.html',
  ], safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white' : '#ffffff',
      'black-light' : '#00000082',
      'transparent' : '#fff0',
      'sombra':'#00000054',
      upla : {
        100:'#007cbc',
        200 : '#0B5CD4'
      },
      gray: {
        50: '#F9FAFB',
        900: '#111827',
        800: '#1F2937',
        700: '#374151',
        600: '#4B5563',
        500: '#6B7280',
        400: '#9CA3AF',
        300: '#D1D5DB',
        200: '#E5E7EB',
        100: '#F3F4F6',
      },
      red: {        
        900: '#771D1D',
        800: '#9B1C1C',
        700: '#C81E1E',
        600: '#E02424',
        500: '#F05252',
        400: '#F98080',
        300: '#F8B4B4',
        200: '#FBD5D5',
        100: '#FDE8E8',
        50:  '#FDF2F2'        
      },
      amber:{
        50:'#FDFDEA',
        100:'#FDF6B2',
        200:'#FCE96A',
        300:'#FACA15',
        400: '#E3A008',
        500: '#C27803',
        600: '#9F580A',
        700: '#8E4B10',
        800: '#723B13',
        900: '#633112'
      },
      emerald:{
        50: '#F3FAF7',        
        100: '#DEF7EC',        
        200: '#BCF0DA',        
        300: '#84E1BC',        
        400: '#31C48D',        
        500: '#0E9F6E',        
        600: '#057A55',        
        700: '#046C4E',        
        800: '#03543F',        
        900: '#014737'        
      },
      blue:{
        50: '#EBF5FF',        
        100: '#E1EFFE',        
        200: '#C3DDFD',        
        300: '#A4CAFE',        
        400: '#76A9FA',        
        500: '#3F83F8',        
        600: '#1C64F2',        
        700: '#1A56DB',        
        800: '#1E429F',        
        900: '#233876'        
      },
      indigo:{
        50: '#F0F5FF',        
        100: '#E5EDFF',        
        200: '#CDDBFE',       
        300: '#B4C6FC',        
        400: '#8DA2FB',        
        500: '#6875F5',        
        600: '#5850EC',        
        700: '#5145CD',        
        800: '#42389D',        
        900: '#362F78'        
      },
      violet:{
        50: '#F6F5FF',        
        100: '#EDEBFE',        
        200: '#DCD7FE',        
        300: '#CABFFD',        
        400: '#AC94FA',        
        500: '#9061F9',        
        600: '#7E3AF2',        
        700: '#6C2BD9',        
        800: '#5521B5',        
        900: '#4A1D96'        
      },
      pink:{
        50: '#FDF2F8',        
        100: '#FCE8F3',        
        200: '#FAD1E8',        
        300: '#F8B4D9',        
        400: '#F17EB8',        
        500: '#E74694',
        600: '#D61F69',        
        700: '#BF125D',        
        800: '#99154B',        
        900: '#751A3D'        
      }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mont:['Montserrat','sans-serif']
    },
    extend: {
      spacing: {
        88: '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }, scrollMargin: {
        '96': '24rem',
      },
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
],
variants: {  
  scrollbar: ['dark']
}
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens:{
         'sm': '460px',
        'md': '785px',
        'lg': '900px',
        'xl': '1100px',
        'xxl': '1440px', // Custom breakpoint
        'xxxl': '1600px',
        'xsm':"600px"
      },
      fontFamily: {
        roboto: ['Roboto'],
      }
    },
    
  },
  
  plugins: [require('tailwind-scroll-behavior')(),
      require('tailwind-scrollbar-hide')
   ],
  variants: {
	scrollBehavior: ['motion-safe', 'motion-reduce', 'responsive']
}
}

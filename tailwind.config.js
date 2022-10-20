module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/**/*.{js,ts,jsx,tsx}',
    './src/common/navbar/navbar2.tsx',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'new-primary': '#efc811',
        'bg-primary': '#4b4b4a',
        'new-black': '#2D2D2D',
        'new-gray': '#AEAEAE',
        'new-bg': '#282735',
      },
      height: {
        highlight: '30rem',
        mangaWall: '35rem',
        reading: '11.5rem',
        hover: '28rem',
      },
      width: {
        reading: '16,5rem',
      },
      maxWidth: {
        grid: '15rem',
      },
      borderWidth: {
        3: '3px',
      },
      screens: {
        noneDisplay: '0px',
        'xs-h': {
          raw: '(min-height: 475px)',
        },
        'sm-h': {
          raw: '(min-height: 640px)',
        },
        'md-h': {
          raw: '(min-height: 768px)',
        },
        'lg-h': {
          raw: '(min-height: 1024px)',
        },
        xxs: '320px',
        xs: '480px',
        phone: '320px',
        // => @media (min-width: 320px) { ... }
        tablet: '640px',
        // => @media (min-width: 640px) { ... }
        window: '850px',
        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1280px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
}

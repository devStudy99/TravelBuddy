const range = (length) => Array.from({ length }, (_, i) => i);

const pixels = range(1000 + 1).map((x) => [x, `calc(${x}rem / 16)`]);

const px0To1000 = Object.fromEntries(pixels);
const px0To64 = Object.fromEntries(pixels.slice(0, 64 + 1));
const px0To30 = Object.fromEntries(pixels.slice(0, 30 + 1));

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'skyblue-100': '#54E2DB',
        'skyblue-200': '#52E0D9',
        'skyblue-300': '#50DED7',
        'skyblue-400': '#4EDCD5',
        'skyblue-500': '#4CDAD3',
        'skyblue-600': '#4AD8D1',
        'skyblue-700': '#48D6CF',
        'skyblue-800': '#46D4CD',
        'skyblue-900': '#44D2CB',

        'black-025': '#F8F9F9',
        'black-050': '#F1F2F3',
        'black-070': '#E3E5E8',
        'black-100': '#D6D9DC',
        'black-150': '#D8DBDE',
        'black-200': '#BABFC4',
        'black-350': '#9199A1',
        'black-500': '#6A737C',
        'black-600': '#525960',
        'black-700': '#434343',
        'black-750': '#3B4045',
        'black-800': '#232629',
        'black-900': '#121210',
      },
      boxShadow: {
        headerShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
      },
      screens: {
        onlyMobile: { max: '767px' },
      },
      minWidth: px0To1000,
      minHeight: px0To1000,
      maxWidth: px0To1000,
      maxHeight: px0To1000,
      width: px0To1000,
      height: px0To1000,
      padding: px0To1000,
      margin: px0To1000,
      borderRadius: px0To30,
      fontSize: px0To64,
    },
  },
  '@tailwind base': {
    '*': {
      boxSizing: 'border-box',
    },
  },
};

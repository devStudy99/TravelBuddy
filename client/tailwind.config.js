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
      screens: {
        onlyMobile: { max: '767px' },
      },
    },
  },
  '@tailwind base': {
    '*': {
      boxSizing: 'border-box',
    },
  },
};

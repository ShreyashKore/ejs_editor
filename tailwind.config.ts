import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const colors = {
  primary: {
    DEFAULT: '#8c4c89',
    light: '#8c4c89',
    dark: '#303f9f',
  },
  onPrimary: {
    DEFAULT: '#000000',
    light: '#000000',
    dark: '#ffffff',
  },
  secondary: {
    DEFAULT: '#ff4081',
    light: '#ff4081',
    dark: '#c51162',
  },
  onSecondary: {
    DEFAULT: '#000000',
    light: '#000000',
    dark: '#ffffff',
  },
  surface: {
    DEFAULT: '#ff4081',
    light: '#ff4081',
    dark: '#c51162',
  },
  onSurface: {
    DEFAULT: '#000000',
    light: '#000000',
    dark: '#ffffff',
  },
  background: {
    DEFAULT: '#ff4081',
    light: '#ff4081',
    dark: '#c51162',
  },
  onBackground: {
    DEFAULT: '#000000',
    light: '#000000',
    dark: '#ffffff',
  },
  error: {
    DEFAULT: '#7a2f32',
    light: '#7a2f32',
    dark: '#e8797e',
  },
  warning: {
    DEFAULT: '#ffb74d',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  info: {
    DEFAULT: '#64b5f6',
    light: '#64b5f6',
    dark: '#1976d2',
  },
  success: {
    DEFAULT: '#81c784',
    light: '#81c784',
    dark: '#388e3c',
  },
};


export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: colors
    },
  },
  plugins: [],
} satisfies Config;

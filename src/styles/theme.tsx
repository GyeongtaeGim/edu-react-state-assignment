/* eslint-disable react-hooks/rules-of-hooks */
import useTheme from "styles/useTheme";
import Theme, { BreakpointsVariant } from "types/Theme";

function up(key: BreakpointsVariant) {
  const { values, unit } = useTheme().breakpoints;
  const value = typeof values[key] === 'number' ? values[key] : key;
  return `@media (min-width:${value}${unit})`;
}

function down(key: BreakpointsVariant) {
  const { values, unit, step } = useTheme().breakpoints;
  const value = values[key];
  return `@media (max-width:${value - step / 100}${unit})`;
}

function between(start: BreakpointsVariant, end: BreakpointsVariant) {
  const { values, unit, step, keys } = useTheme().breakpoints;
  const endIndex = keys.indexOf(end);

  return (
    `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` +
    `(max-width:${values[keys[endIndex]] - step / 100}${unit})`
  );
}

function only(key: BreakpointsVariant) {
  const { keys } = useTheme().breakpoints;
  if (keys.indexOf(key) + 1 < keys.length) {
    return between(key, keys[keys.indexOf(key) + 1]);
  }

  return up(key);
}

function not(key: BreakpointsVariant) {
  const { keys } = useTheme().breakpoints;
  const keyIndex = keys.indexOf(key);
  if (keyIndex === 0) {
    return up(keys[1]);
  }
  if (keyIndex === keys.length - 1) {
    return down(keys[keyIndex]);
  }

  return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
}


const theme: Theme = {
  palette: {
    primary: {
      main: '#FE6A89',
    },
    secondary: {
      main: '#FF5DCA',
      light: '#FF85CB',
    },
    success: {
      main: '#0085FF',
    },
    error: {
      main: '#FF5542',
    },
    warning: {
      main: '#D9D9D9',
    },
    info: {
      main: 'green',
    },
    system: {
      white: '#ffffff',
      black: '#000000',
      background: '#FDFDFD',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#F2F2F2',
      300: '#F2F2F2',
      400: '#cccccc',
      500: '#BBBBBB',
      600: '#666666',
      700: '#333333',
      800: '#1A1A1A',
      900: '#000000',
    },
  },
  fontFamily: 'Inter',
  typography: {
    h1: {
      sx: {
        fontSize: '2.75rem',
        lineHeight: '3.25rem',
        fontWeight: 'bold',
      },
      component: 'h1',
    },
    h2: {
      sx: { fontSize: '2.25rem', fontWeight: 'bold', lineHeight: '2.75rem' },
      component: 'h2',
    },
    h3: {
      sx: { fontSize: '1.5rem', fontWeight: 700, lineHeight: '2rem' },
      component: 'h3',
    },
    h4: {
      sx: { fontSize: '1.25rem', fontWeight: 'bold', lineHeight: '1.75rem' },
      component: 'h4',
    },
    h5: {
      sx: { fontSize: '1rem', fontWeight: 700, lineHeight: '20px' },
      component: 'h5',
    },
    h6: {
      sx: { fontSize: '0.75rem', fontWeight: 'bold', lineHeight: '24px' },
      component: 'h6',
    },
    subtitle1: {
      sx: { fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: 400 },
      component: 'h6',
    },
    subtitle2: {
      sx: { fontSize: '0.875rem', lineHeight: '1.5rem', fontWeight: 400 },
      component: 'h6',
    },
    body1: {
      sx: { fontSize: '1.25rem', lineHeight: '2rem' },
      component: 'p',
    },
    body2: {
      sx: { fontSize: '1rem', lineHeight: '1.25rem' },
      component: 'p',
    },
    caption: {
      sx: { fontSize: '0.75rem', lineHeight: '1.25rem' },
      component: 'p',
    },
    button: {
      sx: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 700 },
      component: 'span',
    },
  },
  component: {
    Button: {
      typography: {
        sx: {
          fontSize: '1rem',
          textTransform: 'uppercase',
          lineHeight: '1.5rem',
          fontWeight: 'bold',
        },
      },
    },
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
    5: '32px',
    6: '40px',
    7: '48px',
    8: '56px',
    9: '64px',
    10: '72px',
    11: '80px',
    12: '88px',
    13: '96px',
    14: '104px',
  },
  radius: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
    5: '32px',
  },
  effect: {
    boxShadow: {
      0: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      1: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      2: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      3: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      4: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    unit: 'px',
    step: 0,
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up,
    down,
    only,
    not,
    between,
  },
};

export default theme
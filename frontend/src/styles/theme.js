import { createMuiTheme } from '@material-ui/core/styles';

const dark1 = '#060629';
const dark2 = '#121421';
const dark3 = '#1b1d2f';
const light1 = '#ffffff';
const light2 = '#707281';
const pink1 = '#fb3b64';
// const purple = '#ba01e2';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: pink1,
    },
    background: {
      default: dark1,
      secondary: dark2,
    },
    text: {
      primary: light1,
      secondary: light2,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'],
    body2: {
      fontWeight: 500,
    },
  },
  appBar: {
    color: dark2,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: dark1,
        },
      },
    },
    MuiDialogContent: {
      root: {
        backgroundColor: dark2,
      },
    },
    MuiDialogTitle: {
      root: {
        backgroundColor: dark2,
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: 'white',
        },
        '&focused': {
          color: 'white',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        position: 'relative',
        '& $notchedOutline': {
          borderColor: light2,
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: 'white',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: light2,
          },
        },
        '&$focused $notchedOutline': {
          borderColor: light1,
          borderWidth: 1,
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 5, // square corners
      },
      outlinedPrimary: {
        color: light1,
        background: 'linear-gradient(90deg, #fb3b64 30%, #ba01e2 70%)',
        '&:hover': {
          // changes colors for hover state
          background: dark1,
          borderColor: pink1,
        },
      },
      outlinedSecondary: {
        color: light1,
        '&:hover': {
          // changes colors for hover state
          background: 'linear-gradient(90deg, #fb3b64 30%, #ba01e2 70%)',
          borderColor: pink1,
        },
      },
    },
    MuiAutocomplete: {
      listbox: {
        backgroundColor: dark3,
      },
      option: {
        backgroundColor: dark3,
      },
      noOptions: {
        backgroundColor: dark3,
      },
    },
  },
});

export default theme;

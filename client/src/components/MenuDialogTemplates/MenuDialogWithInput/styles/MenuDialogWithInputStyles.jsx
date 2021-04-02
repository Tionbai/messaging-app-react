import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '30rem',
    maxWidth: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    '& > * + *': { margin: '1.5rem' },
  },
  formControl: { padding: '0.75rem' },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

export default useStyles;

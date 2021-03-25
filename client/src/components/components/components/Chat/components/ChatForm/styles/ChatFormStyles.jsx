import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: '1rem 0',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '1rem',
  },
  textarea: {
    display: 'flex',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    maxWidth: '92.5%',
    width: '92.5%',
    border: '1px solid lightgrey',
    borderRadius: '30px',
    padding: '1rem 2rem',
    backgroundColor: 'white',
    '&[contentEditable="true"]:empty:not(:focus):before': {
      content: 'attr(placeholder)',
    },
  },
  iconfield: {
    width: '7.5%',
    textAlign: 'center',
  },
  icon: {
    backgroundColor: '#2979ff',
    color: 'white',
    '&:hover': {
      backgroundColor: 'white',
      color: '#2979ff',
    },
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textfield: {
    width: '92.5%',
    resize: 'none',
    margin: '5px 5px',
    padding: '2px 10px',
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '30px',
    height: '70px',
  },
  iconfield: {
    width: '7.5%',
    textAlign: 'center',
  },
  icon: {
    backgroundColor: '#2979ff',
    color: 'white',
  },
}));

export default useStyles;

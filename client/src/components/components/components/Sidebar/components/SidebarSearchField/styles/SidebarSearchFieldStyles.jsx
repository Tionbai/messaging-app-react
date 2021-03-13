import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px 10px 0px 10px',
    padding: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '30px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default useStyles;

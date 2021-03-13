import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  messages: {
    '&::-webkit-scrollbar': { width: 0, backgroundColor: 'transparent' },
    flex: 1,
    overflow: 'scroll',
  },
}));

export default useStyles;

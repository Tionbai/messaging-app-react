import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  message: {
    width: 'fit-content',
    borderRadius: '10px',
    padding: '5px 10px',
  },
  sender: {
    margin: '2px 3px',
    color: 'grey',
  },
  fromMe: {
    backgroundColor: '#2979ff',
    color: 'white',
  },
  toMe: {
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  messageMenuLeft: {
    order: 0,
  },
  messageMenuRight: {
    order: 1,
  },
}));

export default useStyles;

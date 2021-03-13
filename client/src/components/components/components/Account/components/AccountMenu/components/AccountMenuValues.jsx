import { useUser } from '../../../../../../../contexts/UserProvider';

const AccountMenuValues = () => {
  const { deleteUser } = useUser();
  const values = {
    deleteUser: {
      title: 'Delete account',
      content: 'Are you sure you want to delete account? This action is irreversible.',
      placeholder: ['Type in your username or email', 'Type in your password'],
      submitFunc: deleteUser,
    },
  };
  return values;
};

export default AccountMenuValues;

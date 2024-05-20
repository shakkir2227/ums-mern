import UserHeader from './UserHeader';
import { Table } from '@/components/ui/table';
import UserBody from './UserBody';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFetchedUsers } from "../redux/user/usersListSlice"

const UsersList = () => {
  const {users} = useSelector((state) => state.usersList);
  const dispatch = useDispatch();

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/view-users');
      const users = await res.json();

      dispatch(setFetchedUsers(users));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Table>
      <UserHeader />

      {users.map((user,  index) => {
        return <UserBody key={user._id} username={user.username} email={user.email} index = {index} />;
      })}
    </Table>
  );
};

export default UsersList;

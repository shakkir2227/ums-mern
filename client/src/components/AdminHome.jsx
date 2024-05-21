import UsersList from './UsersList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserHeader from './UserHeader';
import { Table } from './ui/table';
import UserBody from './UserBody';
import CreateUserSheet from './CreateUserSheet';

const AdminHome = () => {
  const [searchText, setSearchText] = useState(undefined);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const users = useSelector((state) => state.usersList.users);

  function handleChangeInSearch(e) {
    setSearchText(e.target.value);
  }

  function findAndSetUsers() {
    const regexPattern = new RegExp(searchText, 'i');
    setFilteredUsers(
      users.filter((user) => {
        return (
          regexPattern.test(user.username) || regexPattern.test(user.email)
        );
      })
    );
  }

  useEffect(() => {
    if(!searchText?.trim()) {
     setFilteredUsers(null);
    }
  }, [searchText])

  return (
    <div className="w-full max-w-xl  mx-auto p-5">
      <div className="flex w-full max-w-lg items-center space-x-3 p-6">
        <Input
          type="text"
          placeholder="Search Users..."
          value={searchText}
          onChange={handleChangeInSearch}
        />
        <Button type="button" onClick={findAndSetUsers}>
          Search
        </Button>
        
        <CreateUserSheet/>

      </div>
      {filteredUsers ? (
        <Table>
          <UserHeader />

          {filteredUsers?.map((user, index) => {
            return (
              <UserBody
                key={user._id}
                id={user._id}
                username={user.username}
                email={user.email}
                index={index}
                profilePicture={user.profilePicture}
              />
            );
          })}
        </Table>
      ) : (
        <UsersList />
      )}
    </div>
  );
};

export default AdminHome;

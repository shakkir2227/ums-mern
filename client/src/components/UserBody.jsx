import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import EditSheet from './EditSheet';


const UserBody = ({ id, username, email, index, profilePicture }) => {

  // a sheet with user details will be shown. and admin
  // can edit the details and delete the user itself.
  // updating include username and profile picture.
  // will reuse the old profile pic updating logic

  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{username}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>
            <EditSheet id= {id} username={username} email= {email} profilePicture= {profilePicture} />
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default UserBody;

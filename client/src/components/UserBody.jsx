import { Button } from '@/components/ui/button';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
const UserBody = ({key, username, email, index}) => {

    const clickHandler = () => {
        console.log(`Button clicked`)
    }

  return (
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">{index+1}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>
          <Button variant="default" onClick = {clickHandler} >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default UserBody;

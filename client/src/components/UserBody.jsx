import { Button } from '@/components/ui/button';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
const UserBody = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">1</TableCell>
        <TableCell>john123</TableCell>
        <TableCell>john123@mail.com</TableCell>
        <TableCell className="text-right">10:01:11 IST</TableCell>
        <TableCell>
          <Button variant="default">
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default UserBody;

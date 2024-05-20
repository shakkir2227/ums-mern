import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Index</TableHead>
        <TableHead>Username</TableHead>
        <TableHead>Email</TableHead>
        <TableHead className="text-right">Last LoggedIn</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default UserHeader;

import UserHeader from './UserHeader';
import { Button } from '@/components/ui/button';
import {
  Table,
} from '@/components/ui/table';
import UserBody from './UserBody';

const UserItem = () => {
  return (
      <Table>
          <UserHeader/>
          {[1, 2, 3, 4].map((e) => {
             return <UserBody/>

          })}
          
      </Table>
  )
}

export default UserItem

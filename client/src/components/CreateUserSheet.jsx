import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

const CreateUserSheet = () => {
  const side = 'top';
  const [formData, setFormData] = useState({ email: '', username: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const createUser = async (e) => {
    e.preventDefault();

    // validating the values
    const { username, email } = formData;
    if (!username || !email) {
      toast({
        title: 'All fields fields are mandatory !!! .',
        description:
          'Oops! Looks like you missed a few mandatory fields. Please fill them out to proceed. ',
      });
      return;
    }
    if (username.trim() === '' || email.trim() === '') {
      toast({
        title: 'All fields fields are mandatory !!! .',
        description:
          'Oops! Looks like you missed a few mandatory fields. Please fill them out to proceed. ',
      });
      return;
    }

    if (username.length < 3 || !email.match(/^\S+@\S+\.\S+$/)) {
      toast({
        title: 'All fields fields are mandatory !!! .',
        description: 'Username must be at least 3 characters long.',
      });
      return;
    }

    try {
      const res = await fetch(`/api/admin/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        toast({
          title: 'Oops! 🛑 It seems an error occurred.',
          description: data.error,
        });
        return;
      }

      toast({
        title: 'Account creation successful! 🌟 ',
        description: data.message,
      });

      navigate('/admin/signin');
    } catch (error) {
      toast({
        title: ' "Oops! 🛑 It seems an error occurred.',
        description: error.message,
      });
    }
  };

  return (
    <Sheet key={side}>
      <SheetTrigger>
        <Button>Create User</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Create User</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={formData?.email}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={formData?.username}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>

          <Button onClick={createUser} className="max-w-xs mx-auto">
            CREATE
          </Button>
        </div>
      </SheetContent>
      <Toaster />
    </Sheet>
  );
};

export default CreateUserSheet;

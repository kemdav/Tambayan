import { TambayanIcon } from '../../icons';
import { Button } from "@/app/components/ui/button";
import { PasswordInput } from '../password-input';
import { Input } from '../input';
import { SearchIcon } from 'lucide-react';
import { UserPofileLoginIcon } from '../../icons';

export default function AuthLoginCard() {
    return <div className="bg-neutral-linen-white ring-1 select-none ring-action-forest-green w-110 h-100 p-10 rounded-4xl">

        <div className="flex flex-col justify-center items-center">
            <h1 className="text-action-forest-green text text-2xl font-bold">Log In to Your Account</h1>
            <p className="text-action-forest-green text-xs">Please sign in to proceed</p>
        </div>

        <div className='flex flex-col gap-5 mt-3'>
            <div>
                <p className='text-action-forest-green'>Email</p>
                <Input rightIcon={<UserPofileLoginIcon />} className='bg-neutral-ivory-white'></Input>
            </div>
            <div>
                <p className='text-action-forest-green'>Password</p>
                <PasswordInput className='bg-neutral-ivory-white'></PasswordInput>
            </div>
        </div>

        <div className='flex items-center justify-between'>
            {/*TODO put the actual checkbox component here*/}
            <p className='text-action-forest-green text-xs'>[] Remember Me?</p>
            <Button variant="link" className='text-action-forest-green text-xs'>Forgot your password?</Button>
        </div>

        <Button className='text-neutral-linen-white 
        bg-linear-to-r from-action-seafoam-green to-action-forest-green
         hover:from-action-seafoam-green/90 hover:to-action-forest-green/90 
         font-bold text-xl w-full mt-3'>Log In</Button>

        <div className='flex items-center justify-center'>
            <p className='text-action-forest-green'>Don't have an account?</p>
            <Button variant="link" className='text-action-forest-green'>Sign up</Button>
        </div>

    </div>;
}
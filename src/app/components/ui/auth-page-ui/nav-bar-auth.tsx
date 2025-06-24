import { TambayanIcon } from '../../icons';
import {Button} from "@/app/components/ui/button";


export default function AuthNavBar(){
    return <div className="bg-secondary-muted-sage grid grid-cols-2 p-3">
        <div>
            <TambayanIcon size={40}/>
        </div>
        <div className='flex flex-row-reverse gap-10 mr-20'>
            <Button variant="navigation" className='text-neutral-ivory-white bg-secondary-muted-sage rounded-4xl'>Register</Button>
            <Button variant="navigation" className='bg-primary-moss-green text-neutral-ivory-white rounded-4xl'>Login</Button>
            <Button variant="navigation" className='rounded-4xl bg-secondary-muted-sage'>Home</Button>
        </div>
    </div>;
}
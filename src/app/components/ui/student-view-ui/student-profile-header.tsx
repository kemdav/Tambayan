import { UniversityIcon } from "../../icons";
import { AvatarIcon } from "../general/avatar-icon-component";
import { Button } from "../general/button";
import { TagComponent } from "../general/tag-component";


export default function StudentProfileHeader(){
    return (
        <main className="bg-white relative w-full h-73">
            <div className="absolute flex flex-col w-full h-full">
                <div className="z-0 aspect-[16/9] bg-action-light-blue overflow-hidden w-full rounded-2xl">
                    <AvatarIcon className="border-0 rounded-2xl object-center object-cover w-full h-full" isEditable></AvatarIcon>
                    
                </div>
                <div className="min-h-20 max-h-25 h-full">
                    <div className="flex flex-col">
                        <h1 className="ml-37 text-primary-forest-green font-bold text-2xl">Excel Duran</h1>
                        {/* <div className="flex ml-37 gap-2">
                            <UniversityIcon className="size-7"/>
                       </div> */}
                    </div>
                </div>
                <div className="flex absolute size-35 w-full bottom-0">
                    <AvatarIcon className="size-35 bg-white" isEditable></AvatarIcon>
                </div>
            </div>
        </main>
    );
}
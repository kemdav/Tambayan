
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
import { Button } from "../general/button";

interface Props {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
}

const AboutPage = () => {
    return (<div className="flex flex-col sm:flex-row">
        <div className="flex flex-col">

            <div className="flex flex-col sm:flex-row sm:gap-10">
                <div>
                    <p className="text-action-forest-green"><strong>Student ID:</strong>23-3788-246</p>
                    <p className="text-action-forest-green"><strong>Major:</strong> Computer Science</p>
                    <p className="text-action-forest-green"><strong>Email:</strong> kemdavid10@gmail.com</p>
                    <p className="text-action-forest-green"><strong>Year:</strong> 2nd Year</p>
                </div>
                <div>
                    <p className="text-action-forest-green"><strong>Joined:</strong> September 2021</p>
                    <p className="text-action-forest-green"><strong>Events Joined:</strong> 13 events</p>
                    <p className="text-action-forest-green"><strong>Joined Organizations:</strong> 5</p>
                </div>
            </div>

            <div>
                <p className="text-action-forest-green"><strong>Description </strong><Button>Edit Description</Button></p>
                <p className="max-w-250 text-action-forest-green">Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3"03' tall and 63.9 pounds. this means they're large enough to be able to handle human d--ks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there's no doubt in my mind that an aroused Vaporeon would be incredibly </p>
            </div>

        </div>

        <div className="bg-action-seafoam-green sm:mx-10 sm:my-5 w-full h-full">
            Upcoming Event Component
        </div>
    </div>
    );
}


export default function StudentProfileCard({ className, myButtons, selectedButtonId, onButtonSelect }: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "about" && AboutPage()}
        </div>
    );
}
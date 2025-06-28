
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
import { Button } from "../general/button";

interface Props extends studentProps {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
}

interface studentProps {
    studentId: string;
    studentCourse: string;
    studentEmail: string;
    studentYear: string;
    studentJoinDate: string;
    studentEventsJoined: string;
    studentTotalOrg: string;
}

const AboutPage = ({studentId, studentCourse, studentEmail, studentYear, studentJoinDate, studentEventsJoined, studentTotalOrg}: studentProps) => {
    return (<div className="flex flex-col sm:flex-row">
        <div className="flex flex-col">

            <div className="flex flex-col sm:flex-row sm:gap-10">
                <div>
                    <p className="text-action-forest-green"><strong>Student ID:</strong> {studentId}</p>
                    <p className="text-action-forest-green"><strong>Major:</strong> {studentCourse}</p>
                    <p className="text-action-forest-green"><strong>Email:</strong> {studentEmail}</p>
                    <p className="text-action-forest-green"><strong>Year:</strong> {studentYear}</p>
                </div>
                <div>
                    <p className="text-action-forest-green"><strong>Joined:</strong> {studentJoinDate}</p>
                    <p className="text-action-forest-green"><strong>Events Joined:</strong> {studentEventsJoined} events</p>
                    <p className="text-action-forest-green"><strong>Joined Organizations:</strong> {studentTotalOrg}</p>
                </div>
            </div>

            <div>
                <p className="text-action-forest-green"><strong>Description </strong><Button>Edit Description</Button></p>
                <p className="max-w-250 text-action-forest-green">This is a placeholder description for the student profile. You can edit this description to provide more details about the student.</p>
            </div>

        </div>

        <div className="bg-action-seafoam-green sm:mx-10 sm:my-5 w-full h-full">
            Upcoming Event Component
        </div>
    </div>
    );
}


export default function StudentProfileCard({ className, myButtons, selectedButtonId, onButtonSelect,studentId, studentCourse, studentEmail, studentYear, studentJoinDate, studentEventsJoined, studentTotalOrg  }: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "about" && <AboutPage studentId={studentId} studentCourse={studentCourse} studentEmail={studentEmail} studentYear={studentYear} studentJoinDate={studentJoinDate} studentEventsJoined={studentEventsJoined} studentTotalOrg={studentTotalOrg}/>}
        </div>
    );
}
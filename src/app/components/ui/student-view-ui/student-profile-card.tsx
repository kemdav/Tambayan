import StudentProfileHeader from "./student-profile-header";

interface Props {
    className?:string;
}


export default function StudentProfileCard({className}: Props){
    const combinedClassName = `${className || ''}`;

    return (
        <div className={combinedClassName}></div>
    );
}
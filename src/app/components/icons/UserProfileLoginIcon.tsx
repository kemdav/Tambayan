import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement>{
    size?: number;
}

export function UserPofileLoginIcon({size = 24, className, ...props}: Props){
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z" stroke="#4E625A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 16.25C17.0711 16.25 18.75 14.5711 18.75 12.5C18.75 10.4289 17.0711 8.75 15 8.75C12.9289 8.75 11.25 10.4289 11.25 12.5C11.25 14.5711 12.9289 16.25 15 16.25Z" stroke="#4E625A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.75 25.8275V23.75C8.75 23.087 9.01339 22.4511 9.48223 21.9822C9.95107 21.5134 10.587 21.25 11.25 21.25H18.75C19.413 21.25 20.0489 21.5134 20.5178 21.9822C20.9866 22.4511 21.25 23.087 21.25 23.75V25.8275" stroke="#4E625A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}
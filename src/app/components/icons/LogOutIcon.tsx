import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> { }

export function LogOutIcon({ className, ...props }: Props) {
    return (
        <svg
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path d="M12 10V8H7V6H12V4L15 7L12 10ZM11 9V13H6V16L0 13V0H11V5H10V1H2L6 3V12H10V9H11Z" fill="white"/></svg>
    );
}

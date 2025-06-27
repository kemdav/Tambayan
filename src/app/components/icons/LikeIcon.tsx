import * as React from "react";

const LikeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // The viewBox is adjusted to match the new path's coordinate system
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    // A strokeWidth of 2 is standard for a 24x24 icon
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

export default LikeIcon;
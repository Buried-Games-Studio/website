import type { SVGProps } from 'react';

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(var(--primary))" fillOpacity="0.2" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
    <path d="M18 4.5l-6 3-6-3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <path d="M12 22V12" stroke="hsl(var(--primary))" />
    <path d="M22 7l-10 5" />
    <path d="M2 7l10 5" />
  </svg>
);

export default LogoIcon;

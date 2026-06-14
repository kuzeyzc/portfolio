import type { CSSProperties } from "react";

export function BehanceIcon({
  size = 18,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M6.5 7.5H0V16.5H6.5C9.2 16.5 10.8 15.1 10.8 13.2C10.8 11.9 10 11 8.8 10.6C9.9 10.2 10.6 9.2 10.6 8.1C10.6 6.3 9 7.5 6.5 7.5ZM2.5 9.5H5.8C6.7 9.5 7.2 9.9 7.2 10.6C7.2 11.3 6.7 11.7 5.8 11.7H2.5V9.5ZM2.5 13.3H6C7.1 13.3 7.8 13.8 7.8 14.7C7.8 15.6 7.1 16.1 6 16.1H2.5V13.3ZM14.2 9.5H20.5V11H14.2V9.5ZM14.2 12.5H20.5V14H14.2V12.5ZM15.5 7.5C12.2 7.5 9.8 9.9 9.8 13.2C9.8 16.5 12.2 18.9 15.5 18.9C18.8 18.9 21.2 16.5 21.2 13.2C21.2 9.9 18.8 7.5 15.5 7.5Z" />
    </svg>
  );
}

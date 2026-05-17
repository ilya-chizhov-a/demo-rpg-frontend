import type { PrimaryNavigationIcon } from 'src/shared/config';

export function BrandCompassIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="30" viewBox="0 0 32 32" width="30">
      <circle cx="16" cy="16" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M16 2.8v26.4M2.8 16h26.4M6.7 6.7l18.6 18.6M25.3 6.7 6.7 25.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="m16 5.6 2.4 8-2.4 2.4-2.4-2.4L16 5.6ZM26.4 16l-8 2.4L16 16l2.4-2.4 8 2.4ZM16 26.4l-2.4-8L16 16l2.4 2.4-2.4 8ZM5.6 16l8-2.4L16 16l-2.4 2.4-8-2.4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

interface HeaderNavIconProps {
  readonly name: PrimaryNavigationIcon;
  readonly size?: number;
}

export function HeaderNavIcon({ name, size = 26 }: HeaderNavIconProps) {
  const iconProps = {
    'aria-hidden': true,
    fill: 'none',
    height: size,
    style: { height: size, width: size },
    viewBox: '0 0 24 24',
    width: size,
  } as const;

  if (name === 'home') {
    return (
      <svg {...iconProps}>
        <path
          d="M4 10.7 12 4l8 6.7V20a1 1 0 0 1-1 1h-4.4v-6.3H9.4V21H5a1 1 0 0 1-1-1v-9.3Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === 'data') {
    return (
      <svg {...iconProps}>
        <ellipse cx="12" cy="6" rx="6.5" ry="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5.5 6v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3V6M5.5 12v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-6"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === 'regions') {
    return (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M3.7 12h16.6M12 3.5c2.3 2.3 3.5 5.1 3.5 8.5s-1.2 6.2-3.5 8.5M12 3.5C9.7 5.8 8.5 8.6 8.5 12s1.2 6.2 3.5 8.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (name === 'classes') {
    return (
      <svg {...iconProps}>
        <path
          d="M12 3.7 19 6v5.7c0 4.4-2.6 7.2-7 8.6-4.4-1.4-7-4.2-7-8.6V6l7-2.3Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M12 8.2v6.4M8.9 11.4h6.2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (name === 'search') {
    return (
      <svg {...iconProps}>
        <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m15.4 15.4 4.4 4.4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === 'about') {
    return (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 10.8v5.5M12 7.7h.01"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    );
  }

  const exhaustiveName: never = name;
  return exhaustiveName;
}

export function RevisiumSourceIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="44"
      style={{ height: 44, width: 44 }}
      viewBox="0 0 64 64"
      width="44"
    >
      <rect fill="var(--revisium-logo-bg, currentColor)" height="64" rx="12" width="64" />
      <path
        d="M45.2706 28.7332C45.2706 25.7854 42.8292 23.3959 39.8175 23.3959C39.8175 23.3959 37.1795 23.3962 34.0664 23.3959C32.4999 23.3957 30.9418 21.4895 30.9418 19.5834C30.9418 18.4395 31.3313 17.2961 32.5084 17.2961C36.0108 17.296 39.8175 17.2961 39.8175 17.2961C46.2711 17.2961 51.5028 22.4166 51.5028 28.7332C51.5028 33.9379 47.9504 38.3294 43.0895 39.7145L52.342 49.5456C53.3637 50.6312 52.613 52.4139 51.1224 52.4414L48.1866 52.4958C47.219 52.5137 46.2886 52.1228 45.6242 51.4191L35.0026 40.1702C35.0026 40.1702 34.9057 40.1701 33.7372 40.1702C32.1791 40.1702 30.6211 38.2644 30.6211 36.3577C30.6211 35.214 31.0106 34.0704 32.1791 34.0703C34.5162 34.07 39.8175 34.0705 39.8175 34.0705C42.8292 34.0705 45.2706 31.6809 45.2706 28.7332Z"
        fill="var(--revisium-logo-secondary, currentColor)"
      />
      <path
        d="M31.4898 25.8883C31.4898 22.5666 28.797 19.8738 25.4753 19.8738C25.4753 19.8738 16.8798 19.8741 13.4462 19.8738C11.7184 19.8736 10 17.7256 10 15.5776C10 14.2886 10.4296 13.0001 11.7278 13.0001C15.5908 12.9999 25.4753 13.0001 25.4753 13.0001C32.5932 13.0001 38.3635 18.7703 38.3635 25.8883C38.3635 31.7534 34.4454 36.7022 29.0841 38.263L39.632 49.7138C40.6359 50.8036 39.8821 52.5681 38.4006 52.5961L34.5725 52.6685C33.5915 52.6871 32.6494 52.2855 31.9835 51.5649L20.1647 38.7765C20.1647 38.7765 18.1626 38.7764 16.8737 38.7765C15.1553 38.7765 13.4369 36.6289 13.4369 34.4803C13.4369 33.1915 13.8665 31.9028 15.1553 31.9026C17.7329 31.9023 25.4753 31.9028 25.4753 31.9028C28.797 31.9028 31.4898 29.21 31.4898 25.8883Z"
        fill="var(--revisium-logo-primary, currentColor)"
      />
    </svg>
  );
}

export function LanguageIcon() {
  return <HeaderNavIcon name="regions" size={26} />;
}

export function HeaderMenuIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="26"
      style={{ height: 26, width: 26 }}
      viewBox="0 0 24 24"
      width="26"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

export function HeaderCloseIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="30"
      style={{ height: 30, width: 30 }}
      viewBox="0 0 24 24"
      width="30"
    >
      <path
        d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.1"
      />
    </svg>
  );
}

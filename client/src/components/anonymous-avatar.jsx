import React from 'react';

export default function AnonymousAvatar({ className = "w-full h-full" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <rect width="24" height="24" fill="#E2E8F0" />
      <circle cx="12" cy="8" r="4" fill="#94A3B8" />
      <path 
        d="M4 20.5C4 16.9 7.6 14 12 14C16.4 14 20 16.9 20 20.5V22H4V20.5Z" 
        fill="#94A3B8" 
      />
    </svg>
  );
}
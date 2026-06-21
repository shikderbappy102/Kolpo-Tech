export function KolpoLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.5)" strokeWidth="1" />
      <line x1="11" y1="10" x2="11" y2="30" stroke="#6366f1" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="11" y1="20" x2="30" y2="10" stroke="#22d3ee" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="11" y1="20" x2="30" y2="30" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="11" cy="10" r="2.6" fill="#22d3ee" />
      <circle cx="11" cy="30" r="2.6" fill="#f59e0b" />
      <circle cx="30" cy="10" r="2.6" fill="#22d3ee" />
      <circle cx="30" cy="30" r="2.6" fill="#f59e0b" />
      <circle cx="11" cy="20" r="3.2" fill="#6366f1" />
      <line x1="15" y1="20" x2="23" y2="20" stroke="rgba(99,102,241,0.45)" strokeWidth="1.4" strokeDasharray="2 2" />
    </svg>
  );
}

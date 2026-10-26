export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function StarMark() {
  return (
    <svg
      className="star-mark"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 0 24 14 36 4 26 17 40 20 26 24 36 36 23 26 20 40 16 26 4 36 14 23 0 20 14 16 4 4 17 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

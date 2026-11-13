/**
 * Two opposite bounding-box corners, the framing device the logo is built
 * from. The parent must be position: relative. Decorative only.
 */
export function Bounds() {
  return (
    <span className="bounds" aria-hidden="true">
      <i />
      <i />
    </span>
  );
}

import Image from "next/image";
export function Logo() {
  return (
    <span className="brand">
      <Image className="brand-logo" src="/luxengine-logo.png" alt="LuxEngine logo" width={42} height={48} />
      <span>
        starbounded<span className="brand-studio">STUDIO</span>
      </span>
    </span>
  );
}

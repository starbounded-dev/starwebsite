const WIDTH = 1440;
const HEIGHT = 760;
const COUNT = 90;

// A fixed seed keeps the sky identical on the server, the client, and every visit.
function createStars() {
  let seed = 20230107;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: COUNT }, () => {
    const depth = next();
    return {
      x: Math.round(next() * WIDTH * 10) / 10,
      y: Math.round(next() ** 1.35 * HEIGHT * 10) / 10,
      r: Math.round((0.5 + depth * depth * 1.1) * 100) / 100,
      o: Math.round((0.14 + depth * 0.5) * 100) / 100,
    };
  });
}

const stars = createStars();

/** The hero's canvas: a sparse, static field of stars that thins toward the fold. */
export function StarField() {
  return (
    <svg
      className="starfield"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      {stars.map((star, index) => (
        <circle
          key={index}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="currentColor"
          opacity={star.o}
        />
      ))}
    </svg>
  );
}

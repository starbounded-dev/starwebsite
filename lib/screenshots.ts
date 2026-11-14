export type EngineScreenshot = {
  src: string;
  title: string;
  scene: string;
  alt: string;
  caption: string;
};

export const screenshots = [
  {
    src: "/images/lux-dist-renderer.webp",
    title: "Scenes & editor",
    scene: "Sponza",
    alt: "LuxEngine editor, release build, with the Sponza scene, scene hierarchy, renderer settings, and content browser",
    caption:
      "Sponza in the release build of the editor, with the scene hierarchy, renderer settings, and content browser beside the viewport.",
  },
  {
    src: "/images/lux-render-features.webp",
    title: "Lighting & rendering",
    scene: "RenderFeatures",
    alt: "LuxEngine rendering test with reflective surfaces, colored lights, and glowing emissive materials",
    caption:
      "The RenderFeatures test scene: area lights, reflections and emissive materials. It was made alongside the render features work, to check each phase as it landed.",
  },
  {
    src: "/images/lux-material-editor.webp",
    title: "Material editor",
    scene: "RF_Emit_Cool",
    alt: "LuxEngine material editor showing surface, emission, and texture settings with an emissive sphere preview",
    caption:
      "The material editor, with a live preview next to the surface, emission and texture settings.",
  },
  {
    src: "/images/lux-sponza-vaults.webp",
    title: "Sponza in play",
    scene: "Benchmark",
    alt: "LuxEngine game view of the Sponza courtyard vaults, lit by warm sunlight, with red and green banners in the foreground",
    caption:
      "The Sponza courtyard seen through the game camera while the benchmark scene plays.",
  },
  {
    src: "/images/lux-material-field.webp",
    title: "Material field",
    scene: "Benchmark",
    alt: "LuxEngine game view of a dense field of textured boxes, spheres, and cylinders under an evening sky",
    caption:
      "A stress area in the benchmark scene: 6,000 meshes sharing 128 materials, drawn while the camera flies past.",
  },
  {
    src: "/images/lux-benchmark-plaza.webp",
    title: "Material plaza",
    scene: "Benchmark",
    alt: "LuxEngine editor with a ring of textured and metallic spheres around a mirrored pedestal, lit by coloured point lights",
    caption:
      "The benchmark plaza in the editor: textured and metallic spheres around a mirrored pedestal, with coloured point lights overhead.",
  },
  {
    src: "/images/lux-physics-yard.webp",
    title: "Physics yard",
    scene: "Benchmark",
    alt: "LuxEngine game view of hundreds of capsules and spheres scattered across a ramp and floor",
    caption:
      "The physics yard while the benchmark plays: hundreds of bodies tumbling off a ramp under Jolt.",
  },
  {
    src: "/images/lux-brick-walls.webp",
    title: "Lit brickwork",
    scene: "Benchmark",
    alt: "LuxEngine game view of two brick walls meeting at a corner, one dark and one lit by a warm point light",
    caption:
      "Two brick walls at a corner, one in shadow and one lit by a point light, from the benchmark camera path.",
  },
  {
    src: "/images/lux-many-lights.webp",
    title: "Many lights",
    scene: "ManyLights",
    alt: "LuxEngine game view of a grid of dark cubes on a floor covered in pools of coloured light",
    caption:
      "The many-lights test: a grid of cubes under hundreds of small coloured point lights.",
  },
  {
    src: "/images/lux-light-complexity.webp",
    title: "Light complexity",
    scene: "Benchmark",
    alt: "LuxEngine editor with the light complexity debug view tinting the benchmark plaza green and blue",
    caption:
      "The light complexity debug view, which tints the scene by how many lights reach each part of the screen.",
  },
  {
    src: "/images/lux-low-sun.webp",
    title: "Low sun",
    scene: "LowSun",
    alt: "LuxEngine game view of pillars and a glowing sphere casting long shadows across a pale floor",
    caption:
      "A low sun test: long, soft shadows from pillars stretching across the floor toward the camera.",
  },
  {
    src: "/images/lux-material-showcase.webp",
    title: "Material showcase",
    scene: "MaterialShowcase",
    alt: "LuxEngine editor with two rows of spheres in different materials casting shadows on a grey floor",
    caption:
      "The material showcase: one sphere per material feature, from node graphs and triplanar mapping to anisotropy, subsurface, sheen, and clear coat.",
  },
  {
    src: "/images/lux-render-features-play.webp",
    title: "Emissive test",
    scene: "RenderFeatures",
    alt: "LuxEngine game view of glowing light panels, small coloured lights, and spheres reflected in a dark glossy floor",
    caption:
      "The rendering test scene through its own camera, with emissive panels and small lights reflected in a glossy floor.",
  },
  {
    src: "/images/lux-sponza-play.webp",
    title: "Welcome scene",
    scene: "Sponza",
    alt: "LuxEngine game view down the Sponza gallery with floating magenta text reading Welcome to Lux",
    caption:
      "The sample project’s opening scene in play mode, with world-space text floating in the Sponza gallery.",
  },
  {
    src: "/images/lux-dist-profiler.webp",
    title: "Profiler",
    scene: "Sponza",
    alt: "LuxEngine editor, release build, with the Sponza scene, light settings, and the frame profiler",
    caption:
      "The same scene with the light settings and the built-in profiler, which tracks CPU frame time against a 60 fps budget.",
  },
] as const satisfies readonly EngineScreenshot[];

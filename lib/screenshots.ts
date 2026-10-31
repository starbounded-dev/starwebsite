export type EngineScreenshot = {
  src: string;
  title: string;
  scene: string;
  alt: string;
  caption: string;
};

export const screenshots = [
  {
    src: "/images/lux-editor-sponza.webp",
    title: "Scenes & editor",
    scene: "Sponza",
    alt: "LuxEngine editor with the Sponza scene, scene hierarchy, rendering settings, and content browser",
    caption:
      "Sponza running in LuxEngine, with the scene hierarchy, renderer settings, and content browser alongside the viewport.",
  },
  {
    src: "/images/lux-render-features.webp",
    title: "Lighting & rendering",
    scene: "RenderFeatures",
    alt: "LuxEngine rendering test with reflective surfaces, colored lights, and glowing emissive materials",
    caption:
      "A rendering test scene with lights, reflections, and emissive materials. Small tests help us see what works and what needs another look.",
  },
  {
    src: "/images/lux-material-editor.webp",
    title: "Material editor",
    scene: "RF_Emit_Cool",
    alt: "LuxEngine material editor showing surface, emission, and texture settings with an emissive sphere preview",
    caption:
      "The material editor, with a preview beside the surface, emission, and texture settings. This is where we work on how things look.",
  },
] as const satisfies readonly EngineScreenshot[];

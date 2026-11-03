// Mutable render state: GSAP is the clock. No React updates or autonomous animation per frame.
export const world = {
  scene: 0,
  progress: 0,
  rotation: -0.35,
  spread: 0,
  assembly: 0,
  zoom: 0,
  x: 0,
  y: 0,
  mobileY: 0,
  fallbackY: 0,
  tilt: 0.25,
  opacity: 0.65,
  light: 0.4,
};
const listeners = new Set<() => void>();
export function subscribeWorld(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
export function publishWorld() {
  listeners.forEach((callback) => callback());
}
const clamp = (n: number) => Math.max(0, Math.min(1, n));
export function directWorld(scene: number, p: number, notify = true) {
  world.scene = scene;
  world.progress = p;
  world.rotation = scene * 0.9 + p * 1.6 - 0.35;
  world.light = 0.3 + Math.sin(p * Math.PI) * 0.7;
  world.spread = 0;
  world.assembly = scene > 1 ? 1 : 0;
  world.zoom = 0.15;
  world.y = 0;
  world.mobileY = scene === 1 ? -1.25 : scene === 3 ? 1.1 : 0;
  world.fallbackY = scene === 1 ? 18 : scene === 3 ? -7 : 0;
  world.tilt = 0.25 + p * 0.35;
  switch (scene) {
    case 0:
      world.opacity = 0.22 + Math.min(p * 2, 0.78);
      world.zoom = p * 0.8;
      world.x = 0;
      break;
    case 1:
      world.opacity = 0.9;
      world.x = 0.23;
      world.spread = Math.sin(clamp((p - 0.25) / 0.75) * Math.PI);
      world.assembly = clamp((p - 0.75) * 4);
      world.zoom = 0.4 + p * 0.35;
      break;
    case 2:
      world.opacity = 0.3;
      world.x = 0.28 - p * 0.35;
      world.spread = p * 0.5;
      world.zoom = 0.1;
      break;
    case 3:
      world.opacity = 0.7;
      world.x = -0.23;
      world.assembly = 1 + p * 2;
      world.spread = Math.sin(p * Math.PI * 5) * 0.18;
      break;
    case 4:
      world.opacity = 0.06;
      world.x = 0.2;
      world.zoom = 0.8;
      break;
    case 5:
      world.opacity = 0.65;
      world.x = 0.13;
      world.spread = 0.3 + p * 0.4;
      world.zoom = 0.1 + p * 0.7;
      break;
    case 6:
      world.opacity = 0.13;
      world.x = 0.25 - p * 0.5;
      world.zoom = -0.4;
      break;
    case 7:
      world.opacity = Math.max(0, 1 - p * 1.8) * 0.6;
      world.x = 0;
      world.zoom = 0.6 - p * 2;
      world.spread = p;
      break;
  }
  if (notify) publishWorld();
}
// Continue the same world across the natural viewport hand-off, not a scene cut.
export function blendWorld(nextScene: number, progress: number) {
  const previous = { ...world };
  directWorld(nextScene, 0, false);
  const t = clamp(progress);
  const eased = t * t * (3 - 2 * t);
  const keys: (keyof typeof world)[] = [
    "rotation",
    "spread",
    "assembly",
    "zoom",
    "x",
    "y",
    "mobileY",
    "fallbackY",
    "tilt",
    "opacity",
    "light",
  ];
  keys.forEach((key) => {
    world[key] = previous[key] + (world[key] - previous[key]) * eased;
  });
  world.scene = previous.scene;
  world.progress = previous.progress;
  publishWorld();
}
export const chapters = [
  { id: "awakening", title: "The awakening", length: 1.6 },
  { id: "hero", title: "The possibility", length: 2.8 },
  { id: "about", title: "The mind", length: 2.4 },
  { id: "experience", title: "The journey", length: 5.4 },
  { id: "work", title: "Selected work", length: 5.4 },
  { id: "skills", title: "The technical world", length: 3.4 },
  { id: "beyond", title: "Beyond technology", length: 3.4 },
  { id: "contact", title: "The next chapter", length: 2.3 },
];

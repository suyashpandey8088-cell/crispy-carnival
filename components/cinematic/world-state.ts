import { chapters, palette } from "@/lib/art-direction";
export { chapters } from "@/lib/art-direction";
export const world = {
  scene: 0,
  progress: 0,
  rotation: -0.3,
  spread: 0,
  assembly: 0,
  zoom: 0,
  x: 0.3,
  y: -0.2,
  mobileY: -0.6,
  fallbackY: 5,
  tilt: 0.3,
  opacity: 0.35,
  light: 0.6,
  pointerX: 0,
  pointerY: 0,
  bgR: 198,
  bgG: 255,
  bgB: 0,
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
function rgb(hex: string) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}
function background(from: string, to: string, t: number) {
  const a = rgb(from),
    b = rgb(to);
  world.bgR = a[0] + (b[0] - a[0]) * t;
  world.bgG = a[1] + (b[1] - a[1]) * t;
  world.bgB = a[2] + (b[2] - a[2]) * t;
}
export function directWorld(scene: number, p: number, notify = true) {
  world.scene = scene;
  world.progress = p;
  world.rotation = scene * 1.4 + p * 2.1 - 0.3;
  world.light = 0.6 + Math.sin(p * Math.PI) * 0.4;
  world.spread = 0;
  world.assembly = scene;
  world.zoom = 0.2;
  world.y = 0;
  world.mobileY = 0;
  world.fallbackY = 0;
  world.tilt = 0.3 + p * 0.6;
  background(chapters[scene].bg, chapters[scene].bg, 0);
  switch (scene) {
    case 0:
      world.opacity = 0.18 + p * 0.65;
      world.x = 0.29 - p * 0.1;
      world.y = -0.2;
      world.mobileY = -0.8;
      world.zoom = p * 0.8;
      world.spread = Math.sin(p * Math.PI) * 0.7;
      world.assembly = p;
      break;
    case 1:
      world.opacity = 0.6;
      world.x = 0.28 - p * 0.08;
      world.y = 0.3;
      world.mobileY = 0.2;
      world.spread = p * 0.5;
      world.zoom = 0.2 + p * 0.2;
      background(palette.blue, "#713CFF", p * 0.6);
      break;
    case 2:
      world.opacity = 0.65;
      world.x = -0.25;
      world.zoom = 0.2;
      world.assembly = 2 + p * 3;
      world.spread = Math.sin(p * Math.PI * 4) * 0.2;
      world.mobileY = 1;
      break;
    case 3:
      world.opacity = 0;
      world.x = 0.25;
      break;
    case 4:
      world.opacity = 0.7;
      world.x = 0.22;
      world.y = 0.3;
      world.mobileY = 0.1;
      world.spread = 0.35 + p * 0.7;
      world.zoom = p * 0.4;
      background(palette.orange, palette.cyan, clamp((p - 0.72) * 3.5));
      break;
    case 5:
      world.opacity = 0;
      world.x = 0.2;
      background(palette.pink, "#FFB7DD", p * 0.5);
      break;
    case 6:
      world.opacity = 0.45 * (1 - clamp((p - 0.3) * 2));
      world.x = 0.3;
      world.y = 0.1;
      world.zoom = 0.2 + p;
      world.mobileY = -0.3;
      world.spread = p;
      background(palette.orange, palette.lime, clamp((p - 0.22) * 2.4));
      break;
  }
  if (notify) publishWorld();
}
export function blendWorld(nextScene: number, progress: number) {
  const previous = { ...world };
  directWorld(nextScene, 0, false);
  const t = clamp(progress),
    ease = t * t * (3 - 2 * t);
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
    "bgR",
    "bgG",
    "bgB",
  ];
  keys.forEach((key) => {
    world[key] = previous[key] + (world[key] - previous[key]) * ease;
  });
  world.scene = previous.scene;
  world.progress = previous.progress;
  publishWorld();
}

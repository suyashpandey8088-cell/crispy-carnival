import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const ids = [
  "awakening",
  "about",
  "experience",
  "work",
  "skills",
  "beyond",
  "contact",
];
async function scrub(page: Page, id: string, progress: number) {
  const target = await page.locator(`#${id}`).evaluate((el, p) => {
    const root = el as HTMLElement;
    return (
      Number(root.dataset.scrollStart) +
      (Number(root.dataset.scrollEnd) - Number(root.dataset.scrollStart)) * p
    );
  }, progress);
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    target,
  );
  await expect
    .poll(async () =>
      Number(await page.locator(`#${id}`).getAttribute("data-progress")),
    )
    .toBeCloseTo(progress, 2);
}
async function ready(page: Page) {
  await page.goto("/");
  await expect(page.locator(".cinematic-experience")).toHaveAttribute(
    "data-motion",
    /full|reduced/,
  );
  await expect(page.locator(".cinematic-experience")).toHaveAttribute(
    "data-ready",
    "true",
  );
}
test("all seven pinned timelines scrub, reverse, and release without blank gaps", async ({
  page,
}, info) => {
  test.skip(
    info.project.name === "reduced-motion",
    "Reduced motion intentionally has no pins.",
  );
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await ready(page);
  await expect(page.locator(".pin-spacer")).toHaveCount(7);
  for (const id of ids) {
    await scrub(page, id, 0.35);
    const top = await page
      .locator(`#${id}`)
      .evaluate((e) => e.getBoundingClientRect().top);
    expect(Math.abs(top)).toBeLessThan(2);
    await expect(page.locator(`#${id}`)).not.toHaveAttribute("inert");
    await scrub(page, id, 0.7);
    const start = Number(
      await page.locator(`#${id}`).getAttribute("data-scroll-start"),
    );
    const end = Number(
      await page.locator(`#${id}`).getAttribute("data-scroll-end"),
    );
    expect(end - start).toBeGreaterThan(500);
    // During the one-viewport natural hand-off the next frame touches the previous frame.
    const i = ids.indexOf(id);
    if (i < ids.length - 1) {
      await page.evaluate(
        (y) => window.scrollTo({ top: y + 100, behavior: "instant" }),
        end,
      );
      await expect
        .poll(async () =>
          Math.abs(
            await page.evaluate(
              ([a, b]) =>
                document.getElementById(b)!.getBoundingClientRect().top -
                document.getElementById(a)!.getBoundingClientRect().bottom,
              [id, ids[i + 1]],
            ),
          ),
        )
        .toBeLessThan(3);
    }
  }
  await scrub(page, "awakening", 0.2);
  await expect(page.locator(".hud-chapter")).toContainText("MY CANVAS");
  expect(errors).toEqual([]);
});
test("horizontal journey and project replacement expose each entry", async ({
  page,
}, info) => {
  test.skip(info.project.name === "reduced-motion");
  await ready(page);
  const positions: number[] = [];
  for (let i = 0; i < 5; i++) {
    const progress = Math.max(0.005, Math.min(0.995, i / 4));
    await scrub(page, "experience", progress);
    await expect(page.locator("#experience")).toHaveAttribute(
      "data-active-panel",
      String(i),
    );
    const panel = page.locator(".journey-panel").nth(i);
    await expect(panel).not.toHaveAttribute("inert");
    positions.push(
      await page
        .locator(".journey-track")
        .evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m41),
    );
    await scrub(page, "work", progress);
    await expect(page.locator("#work")).toHaveAttribute(
      "data-active-panel",
      String(i),
    );
    await expect(page.locator(".work-panel").nth(i)).toHaveCSS(
      "visibility",
      "visible",
    );
    await expect(
      page
        .locator(".work-panel")
        .nth(i)
        .getByRole("link", { name: "Explore the idea" }),
    ).toBeVisible();
  }
  expect(positions[4]).toBeLessThan(positions[0] - 1000);
});
test("chapter navigation, deep links, refresh, and browser back remain natural", async ({
  page,
}, info) => {
  await page.goto("/#experience");
  await expect(page.locator(".cinematic-experience")).toHaveAttribute(
    "data-motion",
    /full|reduced/,
  );
  await expect(page.locator(".cinematic-experience")).toHaveAttribute(
    "data-ready",
    "true",
  );
  if (info.project.name !== "reduced-motion") {
    await expect(page.locator(".hud-chapter")).toContainText(
      "EXPERIENCE ARCHIVE",
    );
    await expect
      .poll(async () =>
        Number(await page.locator("#experience").getAttribute("data-progress")),
      )
      .toBeLessThan(0.05);
    await page
      .getByRole("link", { name: "Chapter 4: Project multiverse" })
      .click();
    await expect(page).toHaveURL(/#work/);
    await expect(page.locator(".hud-chapter")).toContainText(
      "PROJECT MULTIVERSE",
    );
    await page.reload();
    await expect(page.locator(".hud-chapter")).toContainText(
      "PROJECT MULTIVERSE",
    );
    await page.goBack();
    await expect(page).toHaveURL(/#experience/);
    await expect(page.locator(".hud-chapter")).toContainText(
      "EXPERIENCE ARCHIVE",
    );
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
test("project pages, skill details, contact dialog, and audio work", async ({
  page,
}, info) => {
  await ready(page);
  if (info.project.name !== "reduced-motion") await scrub(page, "skills", 0.01);
  await page.getByRole("button", { name: "Python", exact: false }).click();
  await expect(page.locator(".tech-description")).toContainText(
    "A language for turning ideas",
  );
  if (info.project.name !== "reduced-motion") await scrub(page, "contact", 0.9);
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("not been verified");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  const sound = page.getByRole("button", { name: "Turn ambient sound on" });
  await expect(sound).toHaveAttribute("aria-pressed", "false");
  await sound.click();
  await page.getByRole("button", { name: "Turn ambient sound off" }).click();
  if (info.project.name !== "reduced-motion") await scrub(page, "work", 0.01);
  const explore = page
    .locator(".work-panel")
    .first()
    .getByRole("link", { name: "Explore the idea" });
  await explore.scrollIntoViewIfNeeded();
  await explore.click();
  await expect(page).toHaveURL(/projects\/ai-code-review/);
  await expect(page.locator("h1")).toHaveText(
    "AI Code Review & Bug Detection Assistant",
  );
  await page.getByRole("link", { name: "Back to the explorations" }).click();
  await expect(page).toHaveURL(/#work/);
  for (const slug of [
    "placement-prediction",
    "rag-application",
    "interactive-web",
    "data-explorations",
  ]) {
    expect((await page.goto(`/projects/${slug}`))?.status()).toBe(200);
    await expect(page.locator(".detail-story")).toBeVisible();
  }
  expect((await page.goto("/projects/unknown"))?.status()).toBe(404);
});
test("reduced-motion content and automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".work-panel")).toHaveCount(5);
  await expect(page.locator(".journey-panel")).toHaveCount(5);
  await expect(page.locator(".world-canvas")).toHaveCount(0);
  for (const id of ids)
    await expect(page.locator(`#${id}`)).not.toHaveAttribute("inert");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
test("one demand-rendered 3D world responds to scroll instead of elapsed time", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop", "GPU smoke test runs once.");
  await ready(page);
  await expect(page.locator(".world-canvas canvas")).toHaveCount(1, {
    timeout: 30000,
  });
  await scrub(page, "awakening", 0.1);
  const canvas = page.locator("canvas");
  await expect(canvas).toHaveAttribute("data-camera-z", /\d/);
  const before = await canvas.getAttribute("data-camera-z");
  await scrub(page, "awakening", 0.6);
  await expect(canvas).not.toHaveAttribute("data-camera-z", before!);
  expect(Number(await canvas.getAttribute("data-spread"))).toBeGreaterThan(0.5);
  const pose = await canvas.getAttribute("data-camera-z");
  await page.waitForTimeout(300);
  await expect(canvas).toHaveAttribute("data-camera-z", pose!);
  await scrub(page, "awakening", 0.995);
  expect(Number(await canvas.getAttribute("data-spread"))).toBeLessThan(0.1);
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("wheel or touch input advances and reverses the actual scene clock", async ({
  page,
}, info) => {
  test.skip(info.project.name === "reduced-motion");
  await ready(page);
  const touch =
    info.project.name === "mobile" || info.project.name === "tablet";
  const client = touch ? await page.context().newCDPSession(page) : null;
  const swipe = async (from: number, to: number) => {
    await client!.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 180, y: from }],
    });
    const step = to > from ? 40 : -40;
    for (let y = from + step; step > 0 ? y <= to : y >= to; y += step) {
      await client!.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: 180, y }],
      });
      await page.waitForTimeout(16);
    }
    await client!.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  };
  if (touch) await swipe(620, 180);
  else await page.mouse.wheel(0, 650);
  await expect
    .poll(async () =>
      Number(await page.locator("#awakening").getAttribute("data-progress")),
    )
    .toBeGreaterThan(0.15);
  const forward = Number(
    await page.locator("#awakening").getAttribute("data-progress"),
  );
  if (touch) await swipe(180, 780);
  else await page.mouse.wheel(0, -900);
  await expect
    .poll(async () =>
      Number(await page.locator("#awakening").getAttribute("data-progress")),
    )
    .toBeLessThan(forward - 0.05);
});

test("changing motion preferences tears down and recreates exactly seven pins", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop");
  await ready(page);
  await scrub(page, "awakening", 0.5);
  // Let the actual first WebGL frame finish before asking Chromium to destroy
  // its context. Software renderers can otherwise block media-change delivery.
  await expect(page.locator(".world-canvas canvas")).toHaveAttribute(
    "data-camera-z",
    /\d/,
    { timeout: 30000 },
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".work-panel[inert]")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".pin-spacer")).toHaveCount(7);
  await scrub(page, "awakening", 0.4);
  await expect(page.locator(".hud-chapter")).toContainText("MY CANVAS");
});

test("floating menu supports keyboard, scene jumps and focus return", async ({
  page,
}, info) => {
  await ready(page);
  const menu = page.getByRole("button", { name: "MENU", exact: true });
  await menu.click();
  const dialog = page.getByRole("dialog", { name: "JUMP RIGHT IN" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await dialog.getByRole("link", { name: "04 Projects" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#work/);
  if (info.project.name !== "reduced-motion")
    await expect(page.locator(".hud-chapter")).toContainText(
      "PROJECT MULTIVERSE",
    );
  await menu.click();
  const result = await new AxeBuilder({ page })
    .include(".navigation-dialog")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page
    .getByRole("button", { name: "Close navigation", exact: true })
    .click();
  await expect(menu).toBeFocused();
});

test("chrome sculpture is a real keyboard and touch interaction", async ({
  page,
}) => {
  await ready(page);
  const sculpture = page.locator(".opening-chrome");
  await sculpture.click();
  await expect(sculpture).toHaveAttribute("data-turn", "45");
  await sculpture.focus();
  await page.keyboard.press("Enter");
  await expect(sculpture).toHaveAttribute("data-turn", "90");
});

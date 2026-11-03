import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.startsWith("the opening")) return;
  await page.addInitScript(() =>
    sessionStorage.setItem("exhibition-entered", "true"),
  );
});
test("all exhibition chapters and project archive are navigable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Engineering",
  );
  for (const id of [
    "about",
    "work",
    "experience",
    "skills",
    "beyond",
    "contact",
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  await page.getByRole("button", { name: "View all explorations" }).click();
  await expect(page.locator(".project-card")).toHaveCount(5);
  await page.locator(".project-card").first().click();
  await expect(page).toHaveURL(/projects\/ai-code-review/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A second set of eyes.",
  );
  await expect(page.getByText("Source link pending")).toBeVisible();
  await page.getByRole("link", { name: "Back to the explorations" }).click();
  await expect(page).toHaveURL(/#work/);
  expect(errors).toEqual([]);
});
test("experience accordion, skill details and contact dialog work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /04.*Web Developer Intern/ }).click();
  await expect(page.locator("#experience-3")).toBeVisible();
  await page.getByRole("button", { name: "Python", exact: false }).click();
  await expect(page.locator(".skill-description")).toContainText(
    "A language for turning ideas",
  );
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("not been verified");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("no horizontal overflow and usable navigation on small screens", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  if (await page.getByRole("button", { name: "Open navigation" }).isVisible()) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .locator("#mobile-nav")
      .getByRole("link", { name: "Selected work" })
      .click();
    await expect(page.locator("#mobile-nav")).not.toBeVisible();
    await expect(page).toHaveURL(/#work/);
  }
});
test("each detail page exists and unknown projects have a 404", async ({
  page,
}) => {
  for (const slug of [
    "ai-code-review",
    "placement-prediction",
    "rag-application",
    "interactive-web",
    "data-explorations",
  ]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator(".detail-story")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  const response = await page.goto("/projects/not-a-project");
  expect(response?.status()).toBe(404);
});

test("ambient audio is opt-in and contact is keyboard dismissible", async ({
  page,
}) => {
  await page.goto("/");
  const sound = page.getByRole("button", { name: "Turn ambient sound on" });
  await expect(sound).toHaveAttribute("aria-pressed", "false");
  await sound.click();
  await expect(
    page.getByRole("button", { name: "Turn ambient sound off" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Turn ambient sound off" }).click();
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("WCAG A/AA automated checks pass for the exhibition and a case study", async ({
  page,
}) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  // Stable final styles, not intermediate reveal-animation frames.
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/projects/ai-code-review"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});

test("the opening can be skipped and the live sculpture is optional", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "WebGL smoke test runs once; all viewports share the same lazy-loaded component.",
  );
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  test.setTimeout(90000);
  await test.step("Open a fresh exhibition and skip the introduction", async () => {
    await page.goto("/");
    await page.getByRole("button", { name: /Skip intro/ }).click();
  });
  await expect(page.locator(".opening")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".live-scene canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "EXPLORE THE FORM ↗" }).click();
  await expect(page.locator(".live-scene canvas")).toHaveCount(1);
  await page.getByRole("button", { name: "RETURN TO STILL ↗" }).click();
  await expect(page.locator(".live-scene canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});

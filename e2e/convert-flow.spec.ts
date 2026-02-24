import { test, expect } from "@playwright/test";
import path from "path";

const SAMPLE_GCODE = path.resolve(__dirname, "../../sample.gcode");

test("upload → auto-center → convert → verify no coordinate warnings", async ({ page }) => {
  // Collect console errors
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Upload sample.gcode
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(SAMPLE_GCODE);

  // Wait for parsing to complete — "準備完了" (Ready) text appears
  await expect(page.getByText("準備完了").first()).toBeVisible({ timeout: 30_000 });

  // Switch to the "印刷" (Print) tab to access auto-center
  await page.getByText("印刷").click();
  await page.waitForTimeout(500);

  // Click auto-center button
  const autoCenterBtn = page.getByText("自動センタリング");
  await expect(autoCenterBtn).toBeVisible();
  await autoCenterBtn.click();
  await page.waitForTimeout(500);

  // Verify offset values changed (not both zero)
  const offsetXInput = page.locator("#offset-x");
  const offsetYInput = page.locator("#offset-y");
  const xVal = await offsetXInput.inputValue();
  const yVal = await offsetYInput.inputValue();
  console.log(`Auto-center offsets: X=${xVal}, Y=${yVal}`);
  expect(parseFloat(xVal)).not.toBe(0);
  expect(parseFloat(yVal)).not.toBe(0);

  // Check the position preview shows "fits"
  const fitsIndicator = page.getByText("ビルドボリューム内に収まっています");
  await expect(fitsIndicator).toBeVisible({ timeout: 5_000 });

  // Click convert button — matches Japanese text "Bambu A1 用に変換"
  const convertBtn = page.getByRole("button", { name: /Bambu A1/i });
  await expect(convertBtn).toBeEnabled({ timeout: 5_000 });
  await convertBtn.click();

  // Wait for conversion to complete
  await page.waitForTimeout(5000);

  // Take screenshot for visual verification
  await page.screenshot({ path: "e2e-result.png", fullPage: true });

  // Check for Safety Warnings section — now "安全性の警告" in Japanese
  const warningHeader = page.getByText("安全性の警告");
  const hasWarnings = await warningHeader.isVisible().catch(() => false);

  if (hasWarnings) {
    const pageContent = await page.textContent("body");
    console.log("Page has Safety Warnings section");

    // Check for coordinate out-of-bounds warnings (in any language)
    const hasCoordinateWarnings =
      pageContent?.includes("coordinate out of build volume") ||
      pageContent?.includes("座標") ||
      pageContent?.includes("out_of_bounds");
    console.log("Has coordinate OOB warnings:", hasCoordinateWarnings);

    if (hasCoordinateWarnings) {
      const allAlerts = await page.locator("[role='alert']").allTextContents();
      console.log("Alert contents:", allAlerts);
    }

    // Coordinate warnings should not appear after G91 fix + auto-center
    expect(hasCoordinateWarnings).toBeFalsy();
  } else {
    console.log("No Safety Warnings section — all clear!");
  }

  // Check console for React key collision errors
  const reactErrors = consoleErrors.filter(
    (e) => e.includes("same key") || e.includes("Encountered two children")
  );
  expect(reactErrors).toHaveLength(0);
});

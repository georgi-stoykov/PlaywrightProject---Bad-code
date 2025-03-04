import { test, expect } from "@playwright/test";

test.describe("Home page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
  });

  test("Check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("Validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("Product grid is loaded with 9 items", async ({ page }) => {
    // Check the count of items displayed
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
  });

  test("Check the price of Thor Hammer", async ({ page }) => {
    // Search for Thor Hammer and check the result
    const thorHammerProduct = page.getByTestId(
      "product-01JN9CHG0193AE06SF5P689CMQ"
    );
    await expect(thorHammerProduct.locator(".card-footer")).toHaveText(
      "$11.14"
    );
  });

  test("Visual test of the home page", async ({ page }) => {
    await page.waitForLoadState("networkidle"); // bad practice
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      mask: [page.locator(".col-md-9")],
    });
  });
});

test.describe("Home page as logged in user", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
  });

  test("User can successfully login", async ({ page }) => {
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });

  test("Visual test of the home page", async ({ page }) => {
    await page.waitForLoadState("networkidle"); // bad practice
    await expect(page).toHaveScreenshot("home-page-auth.png", {
      mask: [page.locator(".col-md-9")],
    });
  });
});

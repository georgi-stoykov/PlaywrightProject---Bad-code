import { test, expect } from "@playwright/test";

test.describe("Checkout flow", () => {
  test.use({ storageState: ".auth/customer01.json" });
  const inputDelayInMs = 50;
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
  });

  test("Buy product successfully as logged in customer", async ({ page }) => {
    // Search for claw hammers
    await page
      .getByTestId("search-query")
      .pressSequentially("claw hammer", { delay: inputDelayInMs });
    await page.getByTestId("search-submit").click();

    // Pick the hammer I like
    const productGrid = page.locator(".col-md-9");
    const hammers = await productGrid
      .getByRole("link", { name: "Claw Hammer" })
      .nth(1)
      .click();
    await page.getByTestId("add-to-cart").click();

    // Navigate to the cart
    await page.getByTestId("nav-cart").click();
    expect(page.getByRole("row", { name: "Claw Hammer" })).toBeTruthy();
    const proceedToCheckout = await page.getByRole("button", {
      name: "Proceed to checkout",
      exact: true,
    });
    await proceedToCheckout.click();
    await proceedToCheckout.click();

    // Enter address
    await page.waitForLoadState("networkidle");
    await page
      .getByTestId("state")
      .pressSequentially("Some state", { delay: inputDelayInMs });
    await page
      .getByTestId("postal_code")
      .pressSequentially("9300", { delay: inputDelayInMs });
    await proceedToCheckout.click();

    // Pick payment method
    var paymentDropdown = page.getByRole("combobox");
    await paymentDropdown.selectOption("Cash on Delivery");
    await page.getByRole("button", { name: "Confirm" }).click();

    // Assert
    await expect(page.getByText("Payment was successful")).toBeTruthy();
    await expect(page).toHaveScreenshot("UI/snapshots/checkout-success.png", {
      mask: [page.locator("app-header")],
    });
  });
});

import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";

setup("Authenticate as customer", async ({ page, context }) => {
  const customerEmail = "customer@practicesoftwaretesting.com";
  const customerPass = "welcome01";
  const customerAuthFile = ".auth/customer01.json";

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(customerEmail, customerPass);

  // Assert login success
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

  // Store cookies
  await context.storageState({ path: customerAuthFile });
});

import { test, expect } from "@playwright/test";

test.describe("API tests", () => {
  const baseUrl = "http://localhost:8091";

  test("Products can be retrieved", async ({ request }) => {
    const response = await request.get(`${baseUrl}/products`);

    expect(response.status()).toBe(200);
    var responseData = await response.json();
    expect(responseData).not.toBeNull();
    expect(responseData.data.length).toEqual(9);
  });

  test("User can login", async ({ request }) => {
    const response = await request.post(`${baseUrl}/users/login`, {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });

    expect(response.status()).toBe(200);
    var responseData = await response.json();
    expect(responseData.access_token).toBeTruthy();
  });

  test("Get product hammer I like", async ({ request }) => {
    const result = await request.get(`${baseUrl}/products`);
    const responseData = await result.json();
    const hammer = responseData.data.find((x) => x.name === "Claw Hammer");
    console.log(123);
  });
});

import { test, expect } from "@playwright/test";

// Tests that the app is running and that the correct URL is loaded when the app is started
test("Has correct URL", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");
  await expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2/");
});

// Check that profile avatar is visible and that the correct text is displayed when the avatar is clicked
test("Check profile avatar", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");

  await page.getByRole("button", { name: /User Avatar/i }).click();
  const bodyText = await page.textContent("body");

  expect(bodyText).toContain("My Favourites");
  expect(bodyText).toContain("Dark Mode");
});

// Check that dark mode is toggled when the checkbox is clicked
test("Toggle dark mode", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");

  await page.getByRole("button", { name: /User Avatar/i }).click();

  const checkboxElement = await page.getByRole("checkbox");
  await checkboxElement.check();

  const isChecked = await checkboxElement.isChecked();
  expect(isChecked).toBe(true);
});

// Check the navigation to favourites and back
test("Check navigation to favourites and back", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");

  await page.getByRole("button", { name: /User Avatar/i }).click();

  await page.getByRole("menuitem", { name: /My Favourites/i }).click();

  expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2/favourites");

  await expect(
    page.getByRole("heading", { name: /My Favourite Movies/i }),
  ).toBeVisible();

  await page.getByRole("button", { name: /Home/i }).click();
  await expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2");
});

// Check that genres are visible and that the correct text is displayed when the genres button is clicked
test("Genre filter", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");

  await expect(
    page.getByRole("heading", { name: /Five Nights at Freddy's/i }),
  ).toBeVisible();

  await page.getByRole("button", { name: /Genres/i }).click();

  const dropDownItems = await page.textContent("body");

  expect(dropDownItems).toContain("All Genres");

  await page.getByRole("menuitem", { name: /Action/i }).click();

  await expect(
    page.getByRole("heading", { name: /The Engineer/i }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: /Saw X/i })).toBeHidden();

  await page.getByRole("button", { name: /Action/i }).click();
  await page.getByRole("menuitem", { name: /Music/i }).click();

  await expect(
    page.getByRole("heading", { name: /Trolls Band Together/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /Saw X/i })).toBeHidden();

  await page.getByRole("button", { name: /Music/i }).click();
  await page.getByRole("menuitem", { name: /All Genres/i }).click();

  await expect(
    page.getByRole("heading", { name: /Five Nights at Freddy's/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Trolls Band Together/i }),
  ).toBeHidden();
});

// Tests the sorting button and the different sorting options
test("Sorting button", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");

  await page.getByRole("button", { name: /Order by:/i }).click();

  const sortingOptions = await page.textContent("body");

  expect(sortingOptions).toContain("Popularity");
  expect(sortingOptions).toContain("User Score");
  expect(sortingOptions).toContain("Title (A-Z)");
  expect(sortingOptions).toContain("Title (Z-A)");

  await page.getByRole("menuitem", { name: "Title (A-Z)" }).click();

  await expect(
    page.getByRole("heading", { name: /Five Nights at Freddy's/i }),
  ).toBeHidden();
  await expect(page.getByRole("heading", { name: /#Alive/i })).toBeVisible();

  await page.getByRole("button", { name: /Order by:/i }).click();
  await page.getByRole("menuitem", { name: "User Score" }).click();

  await expect(page.getByRole("heading", { name: /#Alive/i })).toBeHidden();
  await expect(
    page.getByRole("heading", { name: /The Shawshank Redemption/i }),
  ).toBeVisible();
});

// Tests the reset filter button
test("Reset Filter button", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");
  await page.getByRole("button", { name: /Order by:/i }).click();
  await page.getByRole("menuitem", { name: "Title (A-Z)" }).click();
  await page.getByRole("button", { name: /Genres/i }).click();
  await page.getByRole("menuitem", { name: /Action/i }).click();
  await page.getByRole("button", { name: /Reset Filter/i }).click();

  await expect(page.getByRole("button", { name: /Genres/i })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Order By: Popularity/i }),
  ).toBeVisible();
});

// Tests that the search bar works
test("Search bar", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");
  await page.getByRole("textbox", { name: "Search movies..." }).fill("Saw");
  await expect(page.getByRole("heading", { name: /Saw X/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Jigsaw/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Saw IV/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Five Nights At Freddy's/i }),
  ).toBeHidden();
});

// Tests that a modal can ble opened and closed
test("Close movie modal button", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");
  await page
    .getByRole("img", {
      name: /Poster of the movie Five Nights at Freddy's/i,
    })
    .click();

  await expect(page.getByRole("heading", { name: /Cast/i })).toBeVisible();

  await page.getByRole("button", { name: /Close movie details/i }).click();
  await expect(page.getByRole("heading", { name: /Cast/i })).toBeHidden();
});

// Tests that a movie can be added and removed from favourites
test("Add and remove movie from favourites", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");
  await page
    .getByRole("img", {
      name: /Poster of the movie Five Nights at Freddy's/i,
    })
    .click();

  await expect(page.getByRole("heading", { name: /Cast/i })).toBeVisible();

  await page.getByRole("button", { name: /Toggle Favourite/i }).click();
  await expect(page.getByRole("alert")).toBeVisible();

  await page.getByRole("button", { name: /Close movie details/i }).click();
  await page.getByRole("button", { name: /User Avatar/i }).click();
  await page.getByRole("menuitem", { name: /My Favourites/i }).click();
  expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2/favourites");

  await expect(
    page.getByRole("heading", { name: /Five Nights At Freddy's/i }),
  ).toBeVisible();

  await page
    .getByRole("img", {
      name: /Poster of the movie Five Nights at Freddy's/i,
    })
    .click();
  await page.getByRole("button", { name: /Toggle Favourite/i }).click();
});

// Tests that a review can be added and removed
test("Add and remove a review to a movie", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2");
  await page
    .getByRole("img", {
      name: /Poster of the movie Five Nights at Freddy's/i,
    })
    .click();

  await page.fill(
    'input[placeholder="Write your review here..."]',
    "This is a test review",
  );
  await page.click('svg[aria-label="1 star rating"]');

  await page.click(
    `button[aria-label="Submit review for Five Nights at Freddy's"]`,
  );

  const reviewText = await page.textContent(
    'p:has-text("This is a test review")',
  );
  expect(reviewText).toContain("This is a test review");

  const starRating = await page
    .locator('svg[aria-label="1 star rating"]')
    .count();
  expect(starRating).toBe(1);

  const reviewSelector = `text="This is a test review"`;
  await expect(page.locator(reviewSelector)).toBeVisible();

  const deleteButtonSelector = `${reviewSelector} >> xpath=..//button[@aria-label="Delete review"]`;
  await page.click(deleteButtonSelector);

  await expect(page.locator(reviewSelector)).not.toBeVisible();
});

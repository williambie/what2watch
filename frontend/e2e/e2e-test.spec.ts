import { test, expect } from "@playwright/test";

test("Har correct URL", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2/");
});

test("Check profile avatar", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");

  await page.getByRole("button", { name: /User Avatar/i }).click();
  const bodyText = await page.textContent("body");

  expect(bodyText).toContain("My Favourites");
  expect(bodyText).toContain("Dark Mode");
});

test("Toggle dark mode", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");

  await page.getByRole("button", { name: /User Avatar/i }).click();

  const checkboxElement = await page.getByRole("checkbox");
  await checkboxElement.check();

  const isChecked = await checkboxElement.isChecked();
  expect(isChecked).toBe(true);
});

test("Check navigation to favourites and back", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");

  await page.getByRole("button", { name: /User Avatar/i }).click();

  await page.getByRole("menuitem", { name: /My Favourites/i }).click();

  expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2/favourites");

  await expect(
    page.getByRole("heading", { name: /My Favourite Movies/i }),
  ).toBeVisible();

  await page.getByRole("button", { name: /Home/i }).click();
  await expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2");
});

test("Genre filter", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");

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

test("Sorting button", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");

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

test("Reset Filter button", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");
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

test("Search bar", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");
  await page.getByRole("textbox", { name: "Search movies..." }).fill("Saw");
  await expect(page.getByRole("heading", { name: /Saw X/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Jigsaw/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Saw IV/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Five Nights At Freddy's/i }),
  ).toBeHidden();
});

test("Movie modal", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");
  await page
    .getByRole("img", {
      name: /Poster of the movie Five Nights at Freddy's/i,
    })
    .click();
  await expect(page.getByRole("heading", { name: /Cast/i })).toBeVisible();

  await page.getByRole("button", { name: /Add to Favourites/i }).click();
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
  await page.getByRole("button", { name: /Favourited/i }).click();
  await expect(
    page.getByRole("heading", { name: /Five Nights At Freddy's/i }),
  ).toBeHidden();

  await page.getByRole("img", { name: /logo/i }).click();
  expect(page).toHaveURL("http://it2810-45.idi.ntnu.no/project2");

  await page
    .getByRole("img", {
      name: /Poster of the movie Five Nights at Freddy's/i,
    })
    .click();

  await page
    .getByRole("textbox", { name: "Write your review here..." })
    .fill("This is a test review");
  await page.getByLabel("4 star rating").click();
  await page
    .getByRole("button", { name: /Submit review for Five Nights at Freddy's/i })
    .click();

  const review = await page.textContent("body");
  console.log(review);

  expect(review).toContain("This is a test review");
});

test("paging", async ({ page }) => {
  await page.goto("http://it2810-45.idi.ntnu.no/project2/");

  const initialText = "Showing 1 to 20 of 2000";
  const paragraph = page.locator(`p:has-text("${initialText}")`);

  const paragraphExists = await paragraph.isVisible();
  expect(paragraphExists).toBe(true);
});

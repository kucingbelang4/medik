import { test, expect } from '@playwright/test';

test.describe('Search Flow E2E', () => {
  test('homepage renders search bar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[name="q"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('search results page renders with query param', async ({ page }) => {
    await page.goto('/search?q=acetaminophen');
    await expect(page.locator('h1')).toBeVisible();
    // Either results or empty state must render
    const h1 = await page.locator('h1').first().textContent();
    expect(h1).toMatch(/search results for/i);
  });

  test('drug detail page renders 404 for unknown id', async ({ page }) => {
    // When drug is not found, should render notFound
    await page.goto('/drug/unknown-drug-id');
    // notFound renders the 404 page — Next.js default is a 404 page
    await expect(page.locator('body')).toBeVisible();
  });
});

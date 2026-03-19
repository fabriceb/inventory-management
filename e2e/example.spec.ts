import { test, expect } from '@playwright/test';

test.describe('Sidebar Navigation', () => {
  test('has correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Factory Inventory Management System');
  });

  test('sidebar displays all navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('complementary')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Inventory' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Orders' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Finance' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Demand Forecast' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Reports' })).toBeVisible();
  });

  test('Overview page loads with KPI cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
    await expect(page.getByText('Inventory Turnover Rate')).toBeVisible();
    await expect(page.getByText('Orders Fulfilled')).toBeVisible();
    await expect(page.getByText('Order Fill Rate')).toBeVisible();
  });

  test('navigates to Inventory page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Inventory' }).click();
    await expect(page).toHaveURL('/inventory');
    await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).toBeVisible();
    await expect(page.getByText('Stock Levels')).toBeVisible();
  });

  test('navigates to Orders page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Orders' }).click();
    await expect(page).toHaveURL('/orders');
    await expect(page.getByRole('heading', { name: 'Orders', exact: true })).toBeVisible();
    await expect(page.getByText('All Orders')).toBeVisible();
  });

  test('navigates to Finance page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Finance' }).click();
    await expect(page).toHaveURL('/spending');
    await expect(page.getByRole('heading', { name: 'Finance Dashboard' })).toBeVisible();
    await expect(page.getByText('Total Revenue')).toBeVisible();
  });

  test('navigates to Demand Forecast page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Demand Forecast' }).click();
    await expect(page).toHaveURL('/demand');
    await expect(page.getByRole('heading', { name: 'Demand Forecast', exact: true })).toBeVisible();
  });

  test('navigates to Reports page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Reports' }).click();
    await expect(page).toHaveURL('/reports');
    await expect(page.getByRole('heading', { name: 'Performance Reports' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Quarterly Performance' })).toBeVisible();
  });

  test('sidebar collapse toggle works', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('complementary')).toBeVisible();
    await expect(page.getByText('Overview').first()).toBeVisible();

    await page.getByRole('button', { name: /collapse/i }).click();
    await expect(page.getByRole('complementary')).toBeVisible();
  });

  test('filter bar is visible on dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('label').filter({ hasText: 'Time Period' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Location' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Category' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Order Status' })).toBeVisible();
  });
});

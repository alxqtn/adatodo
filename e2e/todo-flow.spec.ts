/**
 * E2E Test - Todo List Flow
 *
 * Tests the complete user journey in the browser:
 * - Viewing the todo list
 * - Adding a new todo
 * - Marking a todo as done
 * - Deleting a todo
 */
import { test, expect } from '@playwright/test'

test.describe('Todo List Flow', () => {
  test('displays the todo list page', async ({ page }) => {
    await page.goto('/')

    // Verify page title
    await expect(page.getByRole('heading', { name: 'Mes Todos' })).toBeVisible()
  })

  test('can add a new todo', async ({ page }) => {
    await page.goto('/')

    // Find the first add input
    const addInput = page.getByTestId('add-todo-input').first()
    await addInput.fill('New test todo')
    await addInput.press('Enter')

    // Wait for the new todo to appear
    await expect(page.getByTestId('todo-title').filter({ hasText: 'New test todo' })).toBeVisible({ timeout: 5000 })
  })

  test('can toggle todo completion', async ({ page }) => {
    await page.goto('/')

    // Find first checkbox
    const checkbox = page.getByTestId('todo-checkbox').first()
    const wasChecked = await checkbox.isChecked()

    // Toggle it
    await checkbox.click()

    // Verify state changed
    await expect(checkbox).toHaveJSProperty('checked', !wasChecked)
  })

  test('can delete a todo', async ({ page }) => {
    await page.goto('/')

    // First add a todo to delete
    const addInput = page.getByTestId('add-todo-input').first()
    await addInput.fill('Todo to delete')
    await addInput.press('Enter')
    await expect(page.getByTestId('todo-title').filter({ hasText: 'Todo to delete' })).toBeVisible({ timeout: 5000 })

    // Find and click the delete button for this todo
    const todoItem = page.getByTestId('todo-item').filter({ has: page.getByTestId('todo-title').filter({ hasText: 'Todo to delete' }) })
    await todoItem.getByTestId('delete-todo-button').click()

    // Verify it's gone
    await expect(page.getByTestId('todo-title').filter({ hasText: 'Todo to delete' })).not.toBeVisible({ timeout: 5000 })
  })

  test('can navigate to a specific list', async ({ page }) => {
    await page.goto('/')

    // Click on a list heading
    const listHeading = page.getByTestId('list-heading').first()
    const listName = await listHeading.textContent()
    await listHeading.click()

    // Verify we're on the list page
    await expect(page.getByRole('heading', { name: listName! })).toBeVisible()
    await expect(page).toHaveURL(/\/lists\/\d+/)
  })
})

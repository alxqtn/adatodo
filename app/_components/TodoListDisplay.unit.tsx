import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoListDisplay from './TodoListDisplay'

// Mock next/navigation (required by child components)
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}))

describe('TodoListDisplay', () => {
  const todoList = {
    id: 1,
    name: 'Test List',
    todos: [
      { id: 1, title: 'Buy milk', done: false, listId: 1 },
      { id: 2, title: 'Walk the dog', done: true, listId: 1 },
    ],
  }

  it('renders all todos from the list', () => {
    render(<TodoListDisplay list={todoList} />)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
  })

  it('renders a checkbox for each todo with correct state', () => {
    render(<TodoListDisplay list={todoList} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(2)
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
  })

  it('renders delete button for each todo', () => {
    render(<TodoListDisplay list={todoList} />)

    const deleteButtons = screen.getAllByRole('button', { name: /delete todo/i })
    expect(deleteButtons).toHaveLength(2)
  })

  it('renders add todo input', () => {
    render(<TodoListDisplay list={todoList} />)

    expect(screen.getByPlaceholderText('Add a task...')).toBeInTheDocument()
  })

  it('renders empty list correctly', () => {
    const emptyList = { id: 2, name: 'Empty List', todos: [] }
    render(<TodoListDisplay list={emptyList} />)

    expect(screen.getByPlaceholderText('Add a task...')).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })
})

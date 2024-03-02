import { vi } from 'vitest'

const ResizeObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}))

window.ResizeObserver = window.ResizeObserver || ResizeObserver

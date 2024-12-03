import { render, screen } from "@testing-library/vue";
import TasksView from "@/views/TasksView.vue";

// Mock the `fetch` function
const mockFetch = vi.fn();

describe("TasksView", () => {
  beforeAll(() => {
    // Replace the global fetch with the mock
    global.fetch = mockFetch as any;
  });

  afterAll(() => {
    // Restore the original fetch
    global.fetch = vi.restoreAllMocks() as any;
  });

  it("should not have list items", async () => {
    const { container } = render(TasksView);

    // Wait for items to appear
    const items = await screen.queryAllByTestId("task");

    expect(container).not.toBeEmptyDOMElement();
    expect(items).toHaveLength(0);
    expect(screen.queryByText(/no tasks/i)).toBeInTheDocument();
  });

  it("renders the fetched tasks data", async () => {
    // Mock fetch API
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => Array(3).fill("Item 1"),
    });

    render(TasksView);

    // Wait for items to appear
    const items = await screen.findAllByTestId("task");
    expect(items).toHaveLength(3);

    // Assert that loading message disappears
    expect(screen.queryByText(/no tasks/i)).not.toBeInTheDocument();
  });
});

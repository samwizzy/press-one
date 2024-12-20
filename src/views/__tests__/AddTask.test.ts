import { render, screen } from "@testing-library/vue";
import AddTaskView from "../AddTaskView.vue";
import userEvent from "@testing-library/user-event";

function createMockPointerEvent(type: string, props: PointerEventInit = {}): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? "mouse",
  });
  return event;
}

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: vi.fn(),
  releasePointerCapture: vi.fn(),
  hasPointerCapture: vi.fn(),
});

describe("first", () => {
  test("should have all components present", async () => {
    render(AddTaskView);

    expect(screen.getByText(/Add Task/)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due Date/i)).toBeInTheDocument();
  });

  test.skip("should have an enabled submit button in the form", async () => {
    render(AddTaskView);

    const title = screen.getByLabelText(/title/i);
    const description = screen.getByLabelText(/description/i);
    const priority = screen.getByRole("combobox");
    const dueDate = screen.getByLabelText(/due Date/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();

    expect(priority).toHaveTextContent(/select a priority/i);

    user.type(title, "Getting started");
    user.type(description, "How to get started with the basic...");
    user.click(priority);
    user.click(dueDate);

    const latestPriorityOption = screen.queryByText(/medium/i);
    user.click(latestPriorityOption!);

    expect(submitBtn).toHaveAttribute("type");
    expect(submitBtn).not.toBeDisabled();
  });
});

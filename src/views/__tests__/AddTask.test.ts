import { render, screen } from "@testing-library/vue";
import AddTaskView from "../AddTaskView.vue";
import userEvent from "@testing-library/user-event";

describe("first", () => {
  test("should have heading", async () => {
    render(AddTaskView);

    expect(screen.getByText(/Add Task/)).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByTestId("priority")).toBeInTheDocument();
    expect(screen.getByTestId("dueDate")).toBeInTheDocument();
  });

	test.skip("should submit the form", async () => {
    render(AddTaskView);

    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const priority = screen.getByTestId("priority");
    const dueDate = screen.getByTestId("dueDate");

		const user = userEvent.setup();

		user.type(title, "Getting started");
		user.type(description, "Why getting strated with the basic...");
		user.selectOptions(priority, "Low");
		user.click(dueDate);
  });
});

import { render, screen } from "@testing-library/vue";
import TaskItem from "../TaskItem.vue";

describe("TaskItem", () => {
  const task = {
    id: "1",
    title: "Design Landing Page",
    description: "Create a responsive design for the product landing page.",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-12-01",
  };

  test("should have the task item title", () => {
    render(TaskItem, {
      props: { task: task },
    });

    expect(screen.getByText(/Design Landing Page/)).toBeInTheDocument();
  });
});

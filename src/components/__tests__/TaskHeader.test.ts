import { render, screen } from "@testing-library/vue";
import TaskHeader from "../TaskHeader.vue";

describe("TaskHeader", () => {
  beforeEach(() => {
    render(TaskHeader);
  });

  test("should have heading", () => {
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  test("should have an add button", () => {
    expect(screen.getByText(/new/i)).toBeInTheDocument();
  });

  test("should have a delete button", () => {
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });
});

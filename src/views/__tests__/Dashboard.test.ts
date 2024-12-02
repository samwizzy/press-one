import { render, screen } from "@testing-library/vue";
import DashboardView from "@/views/DashboardView.vue";

describe("DashboardView", () => {
  it("should have heading", async () => {
    render(DashboardView);

    const heading = await screen.findByText(/dashboard/);

    expect(heading).toBeInTheDocument();
  });
});

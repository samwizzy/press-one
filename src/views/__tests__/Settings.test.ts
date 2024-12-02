import { render, screen } from "@testing-library/vue";
import SettingsView from "@/views/SettingsView.vue";

describe("SettingsView", () => {
  it("should have heading", async () => {
    render(SettingsView);

    const heading = await screen.getByText(/settings/i);

    expect(heading).toBeInTheDocument();
  });
});

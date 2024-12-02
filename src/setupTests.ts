import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock window or global variables if needed
globalThis.fetch = vi.fn();
